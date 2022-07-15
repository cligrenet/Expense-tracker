import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import { AnimatePresence } from 'framer-motion';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { FaSort, FaFilter, FaListUl } from 'react-icons/fa';

const TransactionList = () => {
	const { user, transactions, transactionsError, isTransactionsError, isTransactionsLoading, getTransactions } =
		useContext(GlobalContext);

	// console.log('user from TransactionList ', user);

	useEffect(() => {
		if (isTransactionsError) {
			toast.error(transactionsError);
		}

		getTransactions(user.token);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isTransactionsError, transactionsError]);

	//TODO Handle transaction list sorting (desc/asc)
	let transactionsSorted = transactions;
	const sortTransactions = () => {
		console.log('sort');
		transactionsSorted = transactions
			.sort((a, b) => {
				return new Date(a.created_date) - new Date(b.created_date);
			})
			.reverse();
		return transactionsSorted;
	};

	//TODO Handle transaction list filtering (by week, by month, by year, all or by category)
	const filterTransactions = () => {
		console.log('filter');
	};

	// TODO Render all transactions
	const showAllTransactions = () => {
		console.log('showAll');
	};

	if (isTransactionsLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div className="flex flex-wrap justify-between items-center">
				<h3 className="text-l text-purple mb-3">Transactions</h3>
				<div className="flex flex-wrap">
					<div
						className="flex flex-nowrap items-center text-slate-300 text-xs hover:text-yellow cursor-pointer mr-3"
						onClick={showAllTransactions}
					>
						<FaListUl className="mr-0.5" /> All
					</div>
					<div
						className="flex flex-nowrap items-center text-slate-300 text-xs hover:text-yellow cursor-pointer mr-3"
						onClick={filterTransactions}
					>
						<FaFilter className="mr-0.5 text-[8px]" /> Filter
					</div>
					<div
						className="flex flex-nowrap items-center text-slate-300 text-xs hover:text-yellow cursor-pointer"
						onClick={sortTransactions}
					>
						<FaSort /> Sort
					</div>
				</div>
			</div>

			{/* Show All */}
			{(!transactions || !transactions.length) && <p className="text-slate-300">Please add a transaction</p>}
			{transactions && (
				<ul className="list">
					<AnimatePresence>
						{transactions.map((transaction) => (
							<Transaction key={transaction.transaction_id} transaction={transaction} />
						))}
					</AnimatePresence>
				</ul>
			)}
		</>
	);
};

export default TransactionList;
