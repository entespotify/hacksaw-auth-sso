import { FC } from "react";
import AppView from "../components/app-view/AppView";
import { drawerItemType } from "../types/GenericTypes";
import AllApps from "../components/all-apps/AllApps";

const drawerItems: drawerItemType[] = [
	{
		label: "Files",
		value: "#/home"
	},
	{
		label: "Web",
		value: "#/web"
	}
]

const Web: FC = () => {
	return (
		<>
			<AppView drawerItems={drawerItems}>
				<AllApps/>
			</AppView>
		</>
	);
};

export default Web;
