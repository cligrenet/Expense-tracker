import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();

	const { user, loading, isSuccess, error, login } = useContext(GlobalContext);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}

		// Redirect when logged in
		if (isSuccess || user) {
			navigate('/');
		}

		// Reset
	}, [error, user, isSuccess, navigate]);

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

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<section>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please log in to your expense tracker</p>
			</section>
			<section>
				<form onSubmit={onSubmit}>
					<div>
						<input
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
						<button>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Login;
