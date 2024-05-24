import { ListItem, ListItemButton, ListItemIcon, ListItemText, Link, List } from "@mui/material";
import TokenIcon from '@mui/icons-material/Token';
import { drawerItemType } from "../../types/GenericTypes";

interface navDrawerProps {
    drawerItems?: drawerItemType[]
}


function NavDrawer(props: navDrawerProps) {

    const drawerWidth = 240;

    const { drawerItems } = props;

    const drawerItemsList: React.ReactNode = drawerItems?.map((drawerItem: drawerItemType) => {
        return (
            <ListItem disablePadding key={drawerItem.value}>
                <Link
                    color={'inherit'}
                    sx={{ display: 'flex', minWidth: drawerWidth - 10, margin: "0 5px" }}
                    underline="none"
                    rel='noreferrer'
                    href={drawerItem.value}
                >
                    <ListItemButton>
                        <ListItemIcon sx={{ minWidth: "30px" }}>
                            {drawerItem.icon ? drawerItem.icon : <TokenIcon />}
                        </ListItemIcon>
                        <ListItemText primary={drawerItem.label} />
                    </ListItemButton>
                </Link>
            </ListItem>
        )
    });
    return (
        <List sx={{ width: "240px", borderRight: "1px solid grey" }}>
            {drawerItemsList}
        </List>
    )
}

export default NavDrawer;