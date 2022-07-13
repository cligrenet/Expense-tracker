import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import { AnimatePresence } from 'framer-motion';
import Spinner from '../components/Spinner';

const TransactionList = () => {
	const {
		user,
		isAuthError,
		isAuthSuccess,
		isAuthLoading,
		authMessage,
		transactions,
		transactionsError,
		isTransactionsError,
		isTransactionsLoading,
		isTransactionsSuccess,
		register,
		login,
		logout,
		getTransactions,
		deleteTransaction,
		addTransaction,
	} = useContext(GlobalContext);

	// console.log('user from TransactionList ', user);

	useEffect(() => {
		getTransactions(user.token);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// if (isTransactionsLoading) {
	// 	return <Spinner />;
	// }

	return (
		<>
			<h3 className="text-l text-purple mb-3">Transactions</h3>

			<ul className="list">
				<AnimatePresence>
					{transactions.map((transaction) => (
						<Transaction key={transaction.transaction_id} transaction={transaction} />
					))}
				</AnimatePresence>
			</ul>
		</>
	);
};

export default TransactionList;
