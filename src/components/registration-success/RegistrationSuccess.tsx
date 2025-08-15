import { FC } from "react";
import { Box, Typography, Button, ThemeProvider, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const RegistrationSuccess: FC = () => {
    const navigate = useNavigate();

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
                    sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1, mb: 1, textAlign: "center" }}
                >
                    Registration Complete!
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ color: "text.secondary", mb: 2, fontStyle: "italic", textAlign: "center" }}
                >
                    Congratulations, you’re officially part of the Hacksaw universe.<br />
                    Your account is ready, your password is (hopefully) unforgettable,<br />
                    and your inbox is probably already jealous.
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", textAlign: "center", mb: 2 }}
                >
                    Now go ahead and log in. We promise not to judge your password choices.<br />
                    (Unless it’s “password123”. Then we might.)
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        fontWeight: 600,
                        letterSpacing: 1,
                        boxShadow: "0 2px 8px 0 rgba(38,198,218,0.15)",
                    }}
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </Button>
            </Box>
        </ThemeProvider>
    );
};

export default RegistrationSuccess;