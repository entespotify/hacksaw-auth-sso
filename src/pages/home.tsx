import { FC } from "react";
import AllFiles from "../components/all-files/Allfiles";
import AppView from "../components/app-view/AppView";
import { drawerItemType } from "../types/GenericTypes";

const drawerItems: drawerItemType[] = [
	{
		label: "App",
		value: "home"
	},
	{
		label: "Web",
		value: "home"
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
