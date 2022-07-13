import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const IncomeExpenses = () => {
	const { transactions } = useContext(GlobalContext);

	const incomeTotal = transactions
		? transactions
				.map((transaction) => transaction.amount)
				.filter((amount) => +amount > 0)
				.reduce((acc, amount) => (acc += +amount), 0)
				.toFixed(2)
		: 0;

	const expenseTotal = transactions
		? transactions
				.map((transaction) => transaction.amount)
				.filter((amount) => +amount < 0)
				.reduce((acc, amount) => (acc += +amount), 0)
				.toFixed(2)
		: 0;

	return (
		<div className="flex flex-wrap justify-center text-slate-300 my-3">
			<div className="mx-3 text-center">
				<div className="flex flex-wrap items-center text-darkblue-1">
					<FaPlusCircle className="mr-1" /> Income
				</div>
				<p className="text-green">€ {numberWithCommas(incomeTotal)}</p>
			</div>

			<div className="mx-3 text-center pl-4 border-l-2 border-darkblue-1">
				<div className="flex flex-wrap items-center text-darkblue-1">
					<FaMinusCircle className="mr-1" /> Expense
				</div>
				<p className="text-red">€ {numberWithCommas(expenseTotal)}</p>
			</div>
		</div>
	);
};

export default IncomeExpenses;
