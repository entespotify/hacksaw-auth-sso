import { FC } from "react";
import Backdrop from "../components/backdrop/BackDrop";
import CreateAccountForm from "../components/create-account-form/CreateAccountForm";


const CreateAccountPage: FC = () => {
	return (
		<>
			<Backdrop>
				<CreateAccountForm/>
			</Backdrop>
		</>
	);
};

export default CreateAccountPage;
