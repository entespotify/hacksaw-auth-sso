import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../services/authSlice';
import { NAV_PORTION_OF_VH } from '../../services/constants';


function NavBar() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        dispatch(logout());
        navigate('/login', { replace: true });
    }

    const globalConfigsList: React.ReactNode =
        <MenuItem key="xx" sx={{ padding: "8px" }}>
            <Link color={'inherit'} sx={{ display: 'flex' }} underline="none" onClick={handleLogOut}>
                <LogoutIcon />
                Log out
            </Link>
        </MenuItem>

    return (
        <Box sx={{ flexGrow: 1, zIndex: 100, position: 'relative', minHeight: `${NAV_PORTION_OF_VH}vh` }}>
            <AppBar position="static" color='secondary' sx={{ minHeight: `${NAV_PORTION_OF_VH}vh` }}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, textAlign: "start" }}>
                        My Files
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {globalConfigsList}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default NavBar;