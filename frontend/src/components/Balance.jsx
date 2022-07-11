import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const Balance = () => {
	const { transactions } = useContext(GlobalContext);

	const balance = transactions.reduce((balance, transaction) => (balance += +transaction.amount), 0).toFixed(2);

	return (
		<>
			<h3 className="white-font">Balance</h3>
			<h1 className="white-font">€{numberWithCommas(balance)}</h1>
		</>
	);
};

export default Balance;
