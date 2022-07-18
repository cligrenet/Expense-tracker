import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { calcIncomeTotal, calcExpenseTotal } from '../utils/calculate.js';
import { numberWithCommas } from '../utils/format';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const IncomeExpenses = () => {
	const { transactions } = useContext(GlobalContext);

	const incomeTotal = calcIncomeTotal(transactions);
	const expenseTotal = calcExpenseTotal(transactions);

	return (
		<div className="flex flex-wrap justify-center">
			<div className="px-8 py-1 text-center hover:bg-muted-darkblue hover:rounded-lg">
				<Link to={'/income'} className="flex flex-wrap items-center text-darkblue-1 hover:text-slate-400">
					<FaPlusCircle className="mr-1" />
					<span>Income</span>
				</Link>

				<p className="text-green">€ {numberWithCommas(incomeTotal)}</p>
			</div>

			<div className="px-8 py-1 text-center hover:bg-muted-darkblue hover:rounded-lg">
				<Link to={'/expense'} className="flex flex-wrap items-center text-darkblue-1 hover:text-slate-400">
					<FaMinusCircle className="mr-1" />
					<span>Expense</span>
				</Link>

				<p className="text-red">€ {numberWithCommas(expenseTotal)}</p>
			</div>
		</div>
	);
};

export default IncomeExpenses;
