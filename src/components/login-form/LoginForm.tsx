import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
    ThemeProvider,
    createTheme,
    Link as MuiLink
} from "@mui/material";

import { useLoginMutation } from '../../services/api/auth.api';
import { login } from "../../services/slice/authSlice";

interface CustomLocationState {
    path: string
}

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#26c6da", // teal accent
        },
        background: {
            default: "#181c24",
            paper: "#232936",
        },
        text: {
            primary: "#fff",
            secondary: "#b2dfdb",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: "#232936",
                    borderRadius: 6,
                },
            },
        },
    },
});

const LoginForm: FC = () => {
    const [loginCall, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state as CustomLocationState;

    const userInput = useRef<HTMLInputElement>(null);
    const pwdInput = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);
        let user = userInput.current?.value?.trim();
        let pwd = pwdInput.current?.value;

        if (!user || !pwd) {
            setError("Please enter both username and password.");
            return;
        }
        // Username validation: at least 3 chars, alphanumeric/underscore
        if (!/^[a-zA-Z0-9_]{3,}$/.test(user)) {
            setError("Please enter a valid username (at least 3 characters, letters, numbers, or underscores).");
            return;
        }

        try {
            const userData = await loginCall({ username: user, password: pwd }).unwrap();
            if (userData) {
                dispatch(login(userData));
                navigate(redirectPath ? redirectPath.path : '/home', { replace: true });
            } else {
                setError("Login failed. Please try again");
            }
        } catch (error) {
            setError("Invalid credentials. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="50vh"
                gap={2}
                sx={{
                    width: { xs: "80%", sm: 500 },
                    mx: "auto",
                    p: { xs: 2, sm: 3 },
                    boxShadow: 6,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "1px solid #263043",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1, mb: 1 }}
                >
                    Welcome Back, Stranger!
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ color: "text.secondary", mb: 2, fontStyle: "italic" }}
                >
                    Please log in. Or don’t. I’m just a form, what do I know?
                </Typography>
                <TextField
                    inputRef={userInput}
                    label="Username"
                    name="username"
                    type="text"
                    variant="outlined"
                    fullWidth
                    autoComplete="username"
                    InputLabelProps={{ style: { color: "#b2dfdb" } }}
                    error={!!error && !userInput.current?.value}
                />
                <TextField
                    inputRef={pwdInput}
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    autoComplete="current-password"
                    InputLabelProps={{ style: { color: "#b2dfdb" } }}
                    error={!!error && !pwdInput.current?.value}
                />
                {error && (
                    <Typography color="error" sx={{ fontSize: 14, mt: -1 }}>
                        {error}
                    </Typography>
                )}
                <MuiLink
                    component="button"
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    sx={{
                        alignSelf: "flex-end",
                        color: "#26c6da",
                        fontSize: 14,
                        mb: 1,
                        textTransform: "none",
                        '&:hover': { textDecoration: "underline", color: "#00bcd4" }
                    }}
                >
                    Forgot password?
                </MuiLink>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                    disabled={isLoading}
                    sx={{
                        mt: 1,
                        fontWeight: 600,
                        letterSpacing: 1,
                        boxShadow: "0 2px 8px 0 rgba(38,198,218,0.15)",
                    }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{
                        mt: 1,
                        fontWeight: 600,
                        letterSpacing: 1,
                        borderColor: "#26c6da",
                        color: "#26c6da",
                        '&:hover': {
                            borderColor: "#00bcd4",
                            backgroundColor: "rgba(38,198,218,0.08)",
                        },
                    }}
                    onClick={() => navigate("/register")}
                >
                    Create Account
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default LoginForm;
