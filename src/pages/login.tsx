import { FC } from "react";
import Backdrop from "../components/backdrop/BackDrop";
import LoginForm from "../components/login-form/LoginForm";


const LoginPage: FC = () => {
	return (
		<>
			<Backdrop>
				<LoginForm/>
			</Backdrop>
		</>
	);
};

export default LoginPage;
