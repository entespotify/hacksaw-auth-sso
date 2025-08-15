import { FC } from "react";
import { Box, Typography, Button, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { logout } from "../services/slice/authSlice";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#26c6da" },
        background: { default: "#181c24", paper: "#232936" },
        text: { primary: "#fff", secondary: "#b2dfdb" },
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
});

const Home: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                minHeight="100vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bgcolor="background.default"
                color="text.primary"
                gap={3}
                px={2}
            >
                <Typography variant="h3" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
                    Welcome to Hacksaw Auth!
                </Typography>
                <Typography variant="h5" sx={{ color: "text.secondary", maxWidth: 600, textAlign: "center", mb: 2 }}>
                    The one login to rule them all. Yes, really.
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, textAlign: "center" }}>
                    You’ve landed at the central authentication hub for all things at hacksaw. No more juggling passwords, sticky notes, or that one spreadsheet you swore you’d never lose. 
                    <br /><br />
                    Here, you can authenticate once and access every hacksaw service, whether you’re managing files, exploring the web, or just poking around to see what breaks (please don’t). 
                    <br /><br />
                    We’ve made it as simple as possible, so you can spend less time logging in and more time pretending to work. 
                    <br /><br />
                    If you ever forget your password, don’t worry we’ve all been there. Just hit that “Forgot password?” link and we’ll pretend not to judge.
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 600, textAlign: "center", mt: 2, fontStyle: "italic" }}>
                    Welcome aboard. Your credentials are safe with us. Probably.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 4,
                        fontWeight: 600,
                        letterSpacing: 1,
                        px: 5,
                        py: 1.5,
                        mb: { xs: 6, sm: 0 } // Adds space below button on mobile
                    }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default Home;
