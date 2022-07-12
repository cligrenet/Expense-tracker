import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: user ? user : null,
	transactions: [],
	error: null,
	loading: true,
	isSuccess: false,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions => make calls to the reducer
	// Register user
	async function register(userData) {
		const response = await axios.post('/api/v1/users', userData);

		if (response.data) {
			localStorage.setItem('user', JSON.stringify(response.data));
		}
		return response.data;
	}

	// Login user
	async function login(userData) {
		const response = await axios.post('/api/v1/users/login', userData);

		if (response.data) {
			localStorage.setItem('user', JSON.stringify(response.data));
		}
		return response.data;
	}

	// Logout user
	function logout() {
		localStorage.removeItem('user');
	}

	// Fetch transactions
	async function getTransactions(token) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			const res = await axios.get('/api/v1/transactions', config);
			console.log('GlobalState fetch transactions', res.data.data);

			dispatch({
				type: 'GET_TRANSACTIONS',
				payload: res.data.data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	// Delete transaction
	async function deleteTransaction(id, token) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			await axios.delete(`/api/v1/transactions/${id}`, config);
			dispatch({ type: 'DELETE_TRANSACTION', payload: id });
		} catch (err) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	// Create transaction
	async function addTransaction(transaction, token) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/v1/transactions', transaction, config);
			console.log('GlobalState create transaction', res.data);

			dispatch({
				type: 'ADD_TRANSACTION',
				payload: res.data.data[0],
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				user: state.user,
				isSuccess: state.isSuccess,
				getTransactions,
				deleteTransaction,
				addTransaction,
				register,
				login,
				logout,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
