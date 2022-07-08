import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const IncomeExpenses = () => {
	const { transactions } = useContext(GlobalContext);

	const amounts = transactions.map((transaction) => transaction.amount);

	const incomeTotal = amounts.filter((amount) => amount > 0).reduce((acc, amount) => (acc += amount), 0);

	const expenseTotal = amounts.filter((amount) => amount < 0).reduce((acc, amount) => (acc += amount), 0);

	return (
		<div className="inc-exp-container">
			<div>
				<h4>Income</h4>
				<p className="money plus">{incomeTotal.toFixed(2)}</p>
			</div>
			<div>
				<h4>Expense</h4>
				<p className="money minus">{Math.abs(expenseTotal).toFixed(2)}</p>
			</div>
		</div>
	);
};

export default IncomeExpenses;
