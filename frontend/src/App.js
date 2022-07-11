import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import ChartComp from './components/Chart';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
	return (
		<GlobalProvider>
			<Header />
			<div className="container mx-auto px-5 max-w-md">
				<div className="rounded-lg px-8 py-4 mb-5 bg-purple">
					<Balance />
					<IncomeExpenses />
				</div>

				<div className="px-20 mb-5">
					<ChartComp />
				</div>

				<div className="mb-5">
					<TransactionList />
				</div>

				<div>
					<AddTransaction />
				</div>
			</div>
		</GlobalProvider>
	);
}

export default App;
