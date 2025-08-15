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
				>
					<Typography variant="h3" sx={{ fontWeight: 700, color: "primary.main" }}>
						Oh look, you made it!
					</Typography>
					<Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 400, textAlign: "center" }}>
						Welcome to your dashboard. Try not to break anything. Here you can manage your files and explore the web section—assuming you know what you're doing.
					</Typography>
					<Button
						variant="contained"
						color="primary"
						sx={{ mt: 2, fontWeight: 600, letterSpacing: 1 }}
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Box>
		</ThemeProvider>
	);
};

export default Home;
