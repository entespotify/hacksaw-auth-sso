import {
	HashRouter,
	Routes,
	Route,
	Navigate
} from "react-router-dom";

import './App.css';
import { PublicLayout } from "./layouts/PublicLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import CreateAccountPage from "./pages/createAccount";
import RegistrationSuccessPage from "./pages/registrationSuccess";

function App() {
	return (
		<div className="App">
			<HashRouter>
				<Routes>
					<Route path="/" element={<PublicLayout />}>
						<Route path="login" element={<LoginPage />} />
						<Route path="register" element={<PublicLayout />}>
							<Route index element={<CreateAccountPage />}/>
							<Route path="success" element={<RegistrationSuccessPage />}/>
						</Route>
					</Route>
					<Route path="/" element={<ProtectedLayout />}>
						<Route path="home" element={<Home />} />
					</Route>
					<Route index element={<Navigate to={"/home"} />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
