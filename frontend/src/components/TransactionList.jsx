import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import { AnimatePresence } from 'framer-motion';

const TransactionList = () => {
	const { transactions, getTransactions } = useContext(GlobalContext);

	useEffect(() => {
		getTransactions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h3 className="white-font">History</h3>

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
