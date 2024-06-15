import { FC } from "react";
import AppView from "../components/app-view/AppView";
import { drawerItemType } from "../types/GenericTypes";
import AllFiles from "../components/all-files/Allfiles";

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

const Home: FC = () => {
	return (
		<>
			<AppView drawerItems={drawerItems}>
				<AllFiles/>
			</AppView>
		</>
	);
};

export default Home;
