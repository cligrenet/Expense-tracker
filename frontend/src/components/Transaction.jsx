import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const Transaction = ({ transaction }) => {
	const { deleteTransaction } = useContext(GlobalContext);

	const sign = transaction.amount > 0 ? '+' : '-';

	return (
		<li className={transaction.amount > 0 ? 'plus' : 'minus'}>
			{transaction.text}
			<span>
				{sign} €{numberWithCommas(Math.abs(transaction.amount))}
			</span>
			<button className="delete-btn" onClick={() => deleteTransaction(transaction.transaction_id)}>
				x
			</button>
		</li>
	);
};

export default Transaction;
