import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

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
		<div className="inc-exp-container">
			<div>
				<h4>Income</h4>
				<p className="money plus">€ {numberWithCommas(incomeTotal)}</p>
			</div>
			<div>
				<h4>Expense</h4>
				<p className="money minus">€ {numberWithCommas(expenseTotal)}</p>
			</div>
		</div>
	);
};

export default IncomeExpenses;
