import ExpenseHeader from '../components/Expense/ExpenseHeader';
import ExpenseChart from '../components/Expense/ExpenseChart';
import TransactionList from '../components/TransactionList';

function Expense() {
	return (
		<div className="container mx-auto px-5 max-w-md my-5">
			<ExpenseHeader />
			<ExpenseChart />
			<TransactionList />
		</div>
	);
}

export default Expense;
