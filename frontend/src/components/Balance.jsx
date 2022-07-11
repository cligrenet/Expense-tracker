import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const Balance = () => {
	const { transactions } = useContext(GlobalContext);

	const balance = transactions.reduce((balance, transaction) => (balance += +transaction.amount), 0).toFixed(2);

	return (
		<>
			<h3 className="font-sans text-l text-center " style={{ color: '#252F6E' }}>
				Total Balance
			</h3>
			<h1 className="text-3xl text-slate-300 text-center mb-5">€{numberWithCommas(balance)}</h1>
		</>
	);
};

export default Balance;
