import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { motion } from 'framer-motion';

const Transaction = ({ transaction }) => {
	const { deleteTransaction } = useContext(GlobalContext);

	const sign = transaction.amount > 0 ? '+' : '-';

	return (
		<motion.li
			className={transaction.amount > 0 ? 'plus' : 'minus'}
			transaction={transaction}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{transaction.text}
			<span>
				{sign} €{numberWithCommas(Math.abs(transaction.amount))}
			</span>
			<button className="delete-btn" onClick={() => deleteTransaction(transaction.transaction_id)}>
				x
			</button>
		</motion.li>
	);
};

export default Transaction;
