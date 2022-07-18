import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { calcExpenseTotal, calcIncomeTotal } from '../../utils/calculate';
import { numberWithCommas } from '../../utils/format';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function IncomeHeader() {
	const { transactions } = useContext(GlobalContext);
	const location = useLocation();
	const title = location.pathname.substring(1);
	const total = title === 'income' ? calcIncomeTotal(transactions) : calcExpenseTotal(transactions);

	return (
		<section>
			<Link to="/" className="flex flex-nowrap items-center my-5 text-purple hover:text-yellow">
				<IoIosArrowBack className="mr-1" /> <span>Back</span>
			</Link>
			<div className="rounded-lg px-8 py-4 mb-5 bg-purple">
				<h2 className="font-sans text-2xl text-center text-slate-300">
					{title[0].toUpperCase() + title.substring(1)}
				</h2>
				<p className="text-center text-green">€ {numberWithCommas(total)}</p>
			</div>
		</section>
	);
}

export default IncomeHeader;
