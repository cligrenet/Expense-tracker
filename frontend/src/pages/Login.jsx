import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Spinner from '../components/Spinner';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();

	const { user, isAuthError, isAuthSuccess, isAuthLoading, authMessage, login } = useContext(GlobalContext);

	useEffect(() => {
		if (isAuthError) {
			toast.error(authMessage);
		}

		// Redirect when logged in
		if (isAuthSuccess || user) {
			navigate('/');
		}

		// TODO Reset
	}, [isAuthError, authMessage, user, isAuthSuccess, navigate]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = { email, password };

		login(userData);
	};

	// if (isAuthLoading) {
	// 	return <Spinner />;
	// }

	return (
		<div className="container mx-auto px-5 max-w-md pt-5">
			<section className="mb-4">
				<h1 className="text-2xl text-purple mb-3">Login</h1>
				<p className="text-slate-300">Please log in to your expense tracker</p>
			</section>
			<section>
				<form onSubmit={onSubmit}>
					<div>
						<input
							className="form-input block w-full rounded-lg bg-slate-300 focus:bg-slate-100 mb-2"
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={onChange}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div>
						<input
							className="form-input block w-full rounded-lg bg-slate-300 focus:bg-slate-100 mb-2"
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={onChange}
							placeholder="Enter your password"
							required
						/>
					</div>

					<div>
						<button className="btn-delete ease-in-out duration-300 hover:bg-yellow">Submit</button>
					</div>
				</form>
			</section>
			<Link to="/register" className="flex items-center justify-center text-slate-300  hover:text-yellow">
				<FaUser className="mr-2" /> Register
			</Link>
		</div>
	);
}

export default Login;
