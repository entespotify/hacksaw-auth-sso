import { FC, useRef } from "react";
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

    const handleLogin = async () => {
        let user = userInput.current?.value;
        let pwd = pwdInput.current?.value;
        try {
            const userData = await loginCall({ username: user, password: pwd }).unwrap();
            if (userData) {
                dispatch(login(userData));
                navigate(redirectPath ? redirectPath.path : '/home', { replace: true });
            }
        } catch (error) {
            console.error("Error:", error);
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
                    minWidth: "50vh",
                    mx: "auto",
                    p: 3,
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
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    autoComplete="username"
                    InputLabelProps={{ style: { color: "#b2dfdb" } }}
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
                />
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
