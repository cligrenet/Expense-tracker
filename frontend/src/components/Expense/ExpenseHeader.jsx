import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { calcExpenseTotal } from '../../utils/calculate';
import { numberWithCommas } from '../../utils/format';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function ExpenseHeader() {
	const { transactions } = useContext(GlobalContext);

	const expenseTotal = calcExpenseTotal(transactions);
	return (
		<section>
			<Link to="/" className="flex flex-nowrap items-center my-5 text-purple hover:text-yellow">
				<IoIosArrowBack className="mr-1" /> <span>Back</span>
			</Link>
			<div className="rounded-lg px-8 py-4 mb-5 bg-purple">
				<h2 className="font-sans text-2xl text-center text-slate-300">Expense</h2>
				<p className="text-center text-red">€ {numberWithCommas(expenseTotal)}</p>
			</div>
		</section>
	);
}

export default ExpenseHeader;
