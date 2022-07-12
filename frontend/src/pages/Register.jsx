import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import Spinner from '../components/Spinner';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const navigate = useNavigate();

	const { isSuccess, user, loading, error, register } = useContext(GlobalContext);

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

		if (password !== password2) {
			toast.error('Passwords do not match');
		} else {
			const userData = { name, email, password };

			register(userData);
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<section>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section>
				<form onSubmit={onSubmit}>
					<div>
						<input
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
						<input
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
						<button>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Register;
