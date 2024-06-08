import { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useLoginMutation } from '../../services/api/auth.api';
import { login } from "../../services/authSlice";

interface CustomLocationState {
    path: string
}

const LoginForm: FC = () => {

    const [loginCall, { isLoading }] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state as CustomLocationState;

    const userInput = useRef<HTMLInputElement>(null);
    const pwdInput = useRef<HTMLInputElement>(null);

    const handleLogin = async () => {
        let user = userInput.current?.value;
        let pwd = pwdInput.current?.value;
        try {
            const userData = await loginCall({ email:user, password:pwd }).unwrap();
            if (userData) {
                dispatch(login(userData.data));
                navigate(redirectPath ? redirectPath.path : '/home', { replace: true })
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <div>
                <h3>And here we go...</h3>
                <input ref={userInput} type="text" name="email" placeholder="Username" />
                <input ref={pwdInput} type="password" name="password" placeholder="Password" />
                <button onClick={handleLogin}>Login</button>
                { isLoading && 
                    <p>Please wait...</p>
                }
            </div>
        </>
    );
};

export default LoginForm;
