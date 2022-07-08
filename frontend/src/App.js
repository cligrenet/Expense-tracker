import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import Chart from './components/Chart';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
	return (
		<GlobalProvider>
			<Header />
			<div className="container">
				<Balance />
				<IncomeExpenses />
				<Chart />
				<TransactionList />
				<AddTransaction />
			</div>
		</GlobalProvider>
	);
}

export default App;
