import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Transaction = ({ transaction }) => {
	const { deleteTransaction } = useContext(GlobalContext);

	const sign = transaction.amount > 0 ? '+' : '-';

	return (
		<li className={transaction.amount > 0 ? 'plus' : 'minus'}>
			{transaction.text}{' '}
			<span>
				{sign}€{Math.abs(transaction.amount).toFixed(2)}
			</span>
			<button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>
				x
			</button>
		</li>
	);
};

export default Transaction;
