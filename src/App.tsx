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

function App() {
	return (
		<div className="App">
			<HashRouter>
				<Routes>
					<Route path="/" element={<PublicLayout />}>
						<Route path="login" element={<LoginPage />} />
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
