import { ReactNode } from "react";
import { drawerItemType } from "../../types/GenericTypes";
import NavBar from "../nav-bar/NavBar";
import NavDrawer from "../nav-drawer/NavDrawer";
import { NAV_PORTION_OF_VH } from "../../services/constants";

export interface AppViewProps {
    children: ReactNode,
    drawerItems?: drawerItemType[]
}

function AppView({ children, drawerItems }: AppViewProps) {
    return (
        <>
            <NavBar />
            <div style={{ display: "flex", height: `${100 - NAV_PORTION_OF_VH}vh` }}>
                {drawerItems && <NavDrawer drawerItems={drawerItems} />}
                <div style={{ width: "100%" }}>
                    {children}
                </div>
            </div>
        </>
    )

}

export default AppView;
