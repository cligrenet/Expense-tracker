import IncomeHeader from '../components/Income/IncomeHeader';
import IncomeChart from '../components/Income/IncomeChart';
import TransactionList from '../components/TransactionList';

function Income() {
	return (
		<div className="container mx-auto px-5 max-w-md my-5">
			<IncomeHeader />
			<IncomeChart />
			<TransactionList />
		</div>
	);
}

export default Income;
