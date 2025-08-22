import {
	HashRouter,
	Routes,
	Route,
} from "react-router-dom";

import './App.css';
import { PublicLayout } from "./layouts/PublicLayout";
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
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
