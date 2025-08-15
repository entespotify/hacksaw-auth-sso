import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { useRegisterMutation } from '../../services/api/auth.api';

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#26c6da",
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
    typography: {
        fontFamily: [
            'Inter',
            'Roboto',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
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

const CreateAccountForm: FC = () => {
    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    // Refs for form fields
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);

    const handleCreateAccount = async () => {
        setError(null);
        const username = usernameRef.current?.value?.trim();
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        const firstName = firstNameRef.current?.value?.trim();
        const lastName = lastNameRef.current?.value?.trim();
        const email = emailRef.current?.value?.trim();

        if (!username || !password || !confirmPassword || !firstName || !lastName || !email) {
            setError("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const userData = await register({
                username: username,
                password: password,
                email: email,
                first_name: firstName,
                last_name: lastName
            }).unwrap();
            if (userData) {
                navigate('./success', { replace: true });
            } else {
                setError("Registration failed. Please try again");
            }
        } catch (err) {
            setError("Account creation failed. Please try again.");
            console.error("Registration error:", err);
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
                    Create Your Account
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ color: "text.secondary", mb: 2, fontStyle: "italic", textAlign: "center" }}
                >
                    Welcome! Fill out the form below to join the Hacksaw universe.<br />
                    (Don’t worry, we won’t tell anyone your password. Probably.)
                </Typography>
                <TextField
                    inputRef={usernameRef}
                    label="Username"
                    name="username"
                    type="text"
                    variant="outlined"
                    fullWidth
                    autoComplete="username"
                    InputLabelProps={{ style: { color: "#b2dfdb" } }}
                />
                <TextField
                    inputRef={firstNameRef}
                    label="First Name"
                    name="firstName"
                    type="text"
                    variant="outlined"
                    fullWidth
                    autoComplete="given-name"
                    InputLabelProps={{ style: { color: "#b2dfdb" } }}
                />
                <TextField
                    inputRef={lastNameRef}
                    label="Last Name"
                    name="lastName"
                    type="text"
                    variant="outlined"
                    fullWidth
                    autoComplete="family-name"
                    InputLabelProps={{ style: { color: "#b2dfdb" } }}
                />
                <TextField
                    inputRef={emailRef}
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    autoComplete="email"
                    InputLabelProps={{ style: { color: "#b2dfdb" } }}
                />
                <TextField
                    inputRef={passwordRef}
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    autoComplete="new-password"
                    InputLabelProps={{ style: { color: "#b2dfdb" } }}
                />
                <TextField
                    inputRef={confirmPasswordRef}
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    autoComplete="new-password"
                    InputLabelProps={{ style: { color: "#b2dfdb" } }}
                />
                {error && (
                    <Typography color="error" sx={{ fontSize: 14, mt: -1 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateAccount}
                    fullWidth
                    disabled={isLoading}
                    sx={{
                        mt: 1,
                        fontWeight: 600,
                        letterSpacing: 1,
                        boxShadow: "0 2px 8px 0 rgba(38,198,218,0.15)",
                    }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                </Button>
                <MuiLink
                    component="button"
                    type="button"
                    onClick={() => navigate("/login")}
                    sx={{
                        alignSelf: "center",
                        color: "#26c6da",
                        fontSize: 14,
                        mt: 1,
                        textTransform: "none",
                        '&:hover': { textDecoration: "underline", color: "#00bcd4" }
                    }}
                >
                    Already have an account? Log in
                </MuiLink>
            </Box>
        </ThemeProvider>
    );
};

export default CreateAccountForm;
