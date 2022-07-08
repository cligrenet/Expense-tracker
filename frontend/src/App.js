import './App.css';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import Chart from './components/Chart';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';

function App() {
	return (
		<div>
			<Header />
			<div className="container">
				<Balance />
				<IncomeExpenses />
				<Chart />
				<TransactionList />
				<AddTransaction />
			</div>
		</div>
	);
}

export default App;
