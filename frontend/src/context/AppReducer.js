/* eslint-disable */
export default (state, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isAuthSuccess: true,
				isAuthLoading: false,
				user: action.payload,
			};
		case 'LOGIN_FAILED':
			return {
				...state,
				isAuthError: true,
				isAuthLoading: false,
				user: null,
				authMessage: action.payload,
			};
		case 'LOGIN_LOADING':
			return {
				...state,
				isAuthLoading: true,
			};
		case 'REGISTER_SUCCESS':
			return {
				...state,
				isAuthSuccess: true,
				isAuthLoading: false,
				user: action.payload,
			};
		case 'REGISTER_FAILED':
			return {
				...state,
				isAuthError: true,
				isAuthLoading: false,
				user: null,
				authMessage: action.payload,
			};
		case 'REGISTER_LOADING':
			return {
				...state,
				isAuthLoading: true,
			};
		case 'LOGOUT_SUCCESS':
			return {
				user: null,
			};
		case 'GET_TRANSACTIONS':
			return {
				...state,
				isTransactionsLoading: false,
				isTransactionsSuccess: true,
				transactions: action.payload,
			};
		case 'DELETE_TRANSACTION':
			return {
				...state,
				isTransactionsLoading: false,
				isTransactionsSuccess: true,
				transactions: state.transactions.filter((transaction) => transaction.transaction_id !== action.payload),
			};
		case 'ADD_TRANSACTION':
			return {
				...state,
				isTransactionsLoading: false,
				isTransactionsSuccess: true,
				transactions: [...state.transactions, action.payload],
			};
		case 'TRANSACTION_ERROR':
			return {
				...state,
				isTransactionsLoading: false,
				isTransactionsError: true,
				transactionsError: action.payload,
			};
		default:
			return state;
	}
};
