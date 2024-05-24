import { ReactNode } from "react";
import { drawerItemType } from "../../types/GenericTypes";
import NavBar from "../nav-bar/NavBar";
import NavDrawer from "../nav-drawer/NavDrawer";

export interface AppViewProps {
    children: ReactNode,
    drawerItems?: drawerItemType[]
}

function AppView({ children, drawerItems }: AppViewProps) {
    return (
        <>
            <NavBar />
            <div style={{ display: "flex", height: "93.3vh" }}>
                {drawerItems && <NavDrawer drawerItems={drawerItems} />}
                <div style={{width: "100%"}}>
                    {children}
                </div>
            </div>
        </>
    )

}

export default AppView;
