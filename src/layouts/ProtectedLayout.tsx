import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";

export const ProtectedLayout = () => {
	const token = localStorage.getItem("token");
	const location = useLocation();

	if (!token) {
		return <Navigate to="/login" state={{ path: location.pathname }} />;
	} else {

		return (
			<>
				{/* <Header /> */}
				<Outlet />
			</>
		)
	}
}