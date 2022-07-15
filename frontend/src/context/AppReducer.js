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
		case 'GET_REVERTED_TRANSACTIONS':
			return {
				...state,
				isTransactionsLoading: false,
				isTransactionsSuccess: true,
				transactionsReverted: action.payload,
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
				transactions: [action.payload, ...state.transactions],
			};
		case 'TRANSACTION_ERROR':
			return {
				...state,
				isTransactionsLoading: false,
				isTransactionsError: true,
				transactionsError: action.payload,
			};
		case 'TRANSACTIONS_SORT':
			return {
				...state,
				transactionsSortingDirection: action.payload,
			};
		case 'TRANSACTIONS_FILTER_BY_CATEGORY':
			return {
				...state,
				transactionsSelectedCategories: action.payload,
			};
		default:
			return state;
	}
};
