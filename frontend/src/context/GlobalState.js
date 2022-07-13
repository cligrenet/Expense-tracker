import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Initial state
const initialState = {
	user: user ? user : null,
	isAuthError: false,
	isAuthSuccess: false,
	isAuthLoading: false,
	authMessage: '',

	transactions: [],
	transactionsError: null,
	isTransactionsError: false,
	isTransactionsSuccess: false,
	isTransactionsLoading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// NOTE Actions => make calls to the reducer, make changes to initial state

	// Register user
	async function register(userData) {
		dispatch({
			type: 'REGISTER_LOADING',
		});

		try {
			const response = await axios.post('/api/v1/users', userData);

			if (response.data) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			// return response.data;
			dispatch({
				type: 'REGISTER_SUCCESS',
				payload: response.data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: 'REGISTER_FAILED',
				payload: err.response.data.message,
			});
		}
	}

	// Login user
	async function login(userData) {
		dispatch({
			type: 'LOGIN_LOADING',
		});

		try {
			const response = await axios.post('/api/v1/users/login', userData);

			if (response.data) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			// return response.data;
			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: response.data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: 'LOGIN_FAILED',
				payload: err.response.data.message,
			});
		}
	}

	// Logout user
	function logout() {
		localStorage.removeItem('user');

		dispatch({
			type: 'LOGOUT_SUCCESS',
		});
	}

	// Fetch transactions
	async function getTransactions(token) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const res = await axios.get('/api/v1/transactions', config);
			// console.log('GlobalState fetch transactions', res.data.data);

			dispatch({
				type: 'GET_TRANSACTIONS',
				payload: res.data.data,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.message,
			});
		}
	}

	// Delete transaction
	async function deleteTransaction(transaction_id, token) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			await axios.delete(`/api/v1/transactions/${transaction_id}`, config);
			dispatch({ type: 'DELETE_TRANSACTION', payload: transaction_id });
		} catch (err) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.message,
			});
		}
	}

	// Create transaction
	async function addTransaction(transaction, token) {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			};

			const res = await axios.post('/api/v1/transactions', transaction, config);
			// console.log('GlobalState create transaction', res.data);

			dispatch({
				type: 'ADD_TRANSACTION',
				payload: res.data.data[0],
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.message,
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				user: state.user,
				isAuthError: state.isAuthError,
				isAuthSuccess: state.isAuthSuccess,
				isAuthLoading: state.isAuthLoading,
				authMessage: state.authMessage,
				transactions: state.transactions,
				transactionsError: state.transactionsError,
				isTransactionsError: state.isTransactionsError,
				isTransactionsLoading: state.isTransactionsLoading,
				isTransactionsSuccess: state.isTransactionsSuccess,
				register,
				login,
				logout,
				getTransactions,
				deleteTransaction,
				addTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
