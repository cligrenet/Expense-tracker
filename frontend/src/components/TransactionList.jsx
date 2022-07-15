import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';
import { AnimatePresence } from 'framer-motion';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { FaSort, FaFilter, FaListUl } from 'react-icons/fa';
import FiltersModal from './FiltersModal';

const TransactionList = () => {
	// States from context
	const {
		user,
		transactions,
		transactionsError,
		isTransactionsError,
		isTransactionsLoading,
		getTransactions,
		transactionsSortingDirection,
		toggleTransactionSortDirection,
		transactionsSelectedCategories,
	} = useContext(GlobalContext);

	// console.log('from TransactionList ', transactions, transactionsReverted, user);

	// Modal state
	const [modalIsOpen, setModalIsOpen] = useState(false);

	// Open/close modal
	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	useEffect(() => {
		getTransactions(user.token);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactionsSelectedCategories, transactionsSortingDirection]); // Whenever selected categories change or sorting direction change, update transaction list

	useEffect(() => {
		if (isTransactionsError) {
			toast.error(transactionsError);
		}
	}, [isTransactionsError, transactionsError]);

	// TODO Render all transactions (reset all)
	const showAllTransactions = () => {
		// setTransactionList(transactions);
	};

	// Handle transaction list sorting (desc/asc)
	const toggleSortTransactionsDate = () => {
		toggleTransactionSortDirection();
	};

	// Open filters modal => Handle transaction list filtering (by week, by month, by year or by category)
	const filterTransactions = () => {
		openModal();
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
						onClick={filterTransactions}
					>
						<FaFilter className="mr-0.5 text-[8px]" /> Filters
					</div>
					<div
						className="flex flex-nowrap items-center text-slate-300 text-xs hover:text-yellow cursor-pointer mr-3"
						onClick={toggleSortTransactionsDate}
					>
						<FaSort /> Sort
					</div>
					<div
						className="flex flex-nowrap items-center text-slate-300 text-xs hover:text-yellow cursor-pointer "
						onClick={showAllTransactions}
					>
						<FaListUl className="mr-0.5" /> All
					</div>
				</div>
			</div>

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

			<FiltersModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
		</>
	);
};

export default TransactionList;
