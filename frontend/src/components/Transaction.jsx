import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { motion } from 'framer-motion';
import { FaRegTrashAlt } from 'react-icons/fa';

const Transaction = ({ transaction }) => {
	const { deleteTransaction } = useContext(GlobalContext);

	const sign = transaction.amount > 0 ? '+' : '-';
	const listItemStyle = 'flex justify-between items-center py-2 px-3 border rounded my-2';
	const plus = '';
	const minus = '';
	// #ff2e62
	// #01cb87

	return (
		<motion.li
			className={transaction.amount > 0 ? listItemStyle + plus : listItemStyle + minus}
			transaction={transaction}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<span className="flex flex-col">
				<span className="text-slate-400">{transaction.text}</span>
				<span className="text-xs " style={{ color: '#262e69' }}>
					{transaction.created_at.split('T')[0]}
				</span>
			</span>

			<span>
				<span className="text-slate-400">
					{sign} €{numberWithCommas(Math.abs(transaction.amount))}
				</span>
				<button className="pl-3 text-slate-400" onClick={() => deleteTransaction(transaction.transaction_id)}>
					<FaRegTrashAlt />
				</button>
			</span>
		</motion.li>
	);
};

export default Transaction;
