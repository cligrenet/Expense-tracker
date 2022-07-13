import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const navigate = useNavigate();

	const { user, isAuthError, isAuthSuccess, authMessage, register } = useContext(GlobalContext);

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

		if (password !== password2) {
			toast.error('Passwords do not match');
		} else {
			const userData = { name, email, password };

			register(userData);
		}
	};

	return (
		<div className="container mx-auto px-5 max-w-md pt-5">
			<section className="mb-4">
				<h1 className="text-2xl text-purple mb-3">Register</h1>
				<p className="text-slate-300">Please create an account</p>
			</section>
			<section>
				<form onSubmit={onSubmit}>
					<div>
						<input
							className="form-input block w-full rounded-lg bg-slate-300 focus:bg-slate-100 mb-2"
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={onChange}
							placeholder="Enter your name"
							required
						/>
					</div>
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
						<input
							className="form-input block w-full rounded-lg bg-slate-300 focus:bg-slate-100 mb-2"
							type="password"
							id="password2"
							name="password2"
							value={password2}
							onChange={onChange}
							placeholder="Confirm your password"
							required
						/>
					</div>
					<div>
						<button className="btn-delete ease-in-out duration-300 hover:bg-yellow">Submit</button>
					</div>
				</form>
			</section>
			<Link to="/login" className="flex items-center justify-center text-slate-300  hover:text-yellow">
				<FaSignInAlt className="mr-2" /> Login
			</Link>
		</div>
	);
}

export default Register;
