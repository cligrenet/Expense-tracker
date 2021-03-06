import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Income from './pages/Income';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
	return (
		<>
			<Router>
				<div>
					<Routes>
						<Route path="/" element={<PrivateRoute />}>
							<Route path="/" element={<Home />} />
						</Route>
						<Route path="/income" element={<PrivateRoute />}>
							<Route path="/income" element={<Income />} />
						</Route>
						<Route path="/expense" element={<PrivateRoute />}>
							<Route path="/expense" element={<Income />} />
						</Route>

						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
