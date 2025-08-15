import { FC } from "react";
import Backdrop from "../components/backdrop/BackDrop";
import RegistrationSuccess from "../components/registration-success/RegistrationSuccess";


const RegistrationSuccessPage: FC = () => {
    return (
        <>
            <Backdrop>
                <RegistrationSuccess/>
            </Backdrop>
        </>
    );
};

export default RegistrationSuccessPage;
