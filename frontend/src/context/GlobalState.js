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
const initialState = {
	transactions: [],
	error: null,
	loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions => make calls to the reducer
	async function getTransactions() {
		try {
			const res = await axios.get('/api/v1/transactions');
			// console.log(res.data.data);

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

	async function deleteTransaction(id) {
		try {
			await axios.delete(`/api/v1/transactions/${id}`);
			dispatch({ type: 'DELETE_TRANSACTION', payload: id });
		} catch (err) {
			console.log(err);
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err.response.data.error,
			});
		}
	}

	async function addTransaction(transaction) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/v1/transactions', transaction, config);
			// console.log(res.data);
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
				getTransactions,
				deleteTransaction,
				addTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
