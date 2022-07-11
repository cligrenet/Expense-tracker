import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const IncomeExpenses = () => {
	const { transactions } = useContext(GlobalContext);

	const amounts = transactions.map((transaction) => transaction.amount);

	const incomeTotal = amounts
		.filter((amount) => +amount > 0)
		.reduce((acc, amount) => (acc += +amount), 0)
		.toFixed(2);

	const expenseTotal = (
		amounts.filter((amount) => +amount < 0).reduce((acc, amount) => (acc += +amount), 0) * -1
	).toFixed(2);

	return (
		<div className="flex flex-nowrap justify-center text-slate-300 my-3">
			<div className="mx-3 text-center">
				<div className="flex items-center" style={{ color: '#252F6E' }}>
					<FaPlusCircle className="mr-1" /> Income
				</div>
				<p style={{ color: '#01cb87' }}>€ {numberWithCommas(incomeTotal)}</p>
			</div>
			<div className="mx-3 text-center">
				<div className="flex items-center" style={{ color: '#252F6E' }}>
					<FaMinusCircle className="mr-1" /> Expense
				</div>
				<p style={{ color: '#ff2e62' }}>€ {numberWithCommas(expenseTotal)}</p>
			</div>
		</div>
	);
};

export default IncomeExpenses;
