import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Balance = () => {
	const { transactions } = useContext(GlobalContext);

	const balance = transactions.reduce((balance, transaction) => (balance += transaction.amount), 0).toFixed(2);

	return (
		<>
			<h4>Balance</h4>
			<h1>€{balance}</h1>
		</>
	);
};

export default Balance;
