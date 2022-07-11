import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { motion } from 'framer-motion';
import { FaRegTrashAlt } from 'react-icons/fa';

const Transaction = ({ transaction }) => {
	const { deleteTransaction } = useContext(GlobalContext);

	const sign = transaction.amount > 0 ? '+' : '-';
	const listItem =
		'flex flex-wrap justify-between items-center py-2 px-3 rounded-lg my-2 bg-muted-darkblue hover:bg-yellow text-slate-300 hover:text-darkblue-1 hover:border-yellow border-l-4 ';
	const plus = 'border-l-4 border-green';
	const minus = 'border-l-4 border-red';

	return (
		<motion.li
			className={transaction.amount > 0 ? listItem + plus : listItem + minus}
			transaction={transaction}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<span className="flex flex-wrap flex-col">
				<span>{transaction.text}</span>
				<span className="text-xs">{transaction.created_at.split('T')[0]}</span>
			</span>

			<span>
				<span>
					{sign} €{numberWithCommas(Math.abs(transaction.amount))}
				</span>
				<button className="pl-3 hover:text-red" onClick={() => deleteTransaction(transaction.transaction_id)}>
					<FaRegTrashAlt />
				</button>
			</span>
		</motion.li>
	);
};

export default Transaction;
