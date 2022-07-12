import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Balance from '../components/Balance';
import IncomeExpenses from '../components/IncomeExpenses';
import ChartComp from '../components/Chart';
import TransactionList from '../components/TransactionList';
// import AddTransaction from './components/AddTransaction';
import FloatingActionBtn from '../components/FloatingActionBtn';

function Home() {
	const { user, logout } = useContext(GlobalContext);

	const navigate = useNavigate();

	const onLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<>
			<Header />
			{user && (
				<button className="btn" onClick={onLogout}>
					<FaSignOutAlt /> Logout
				</button>
			)}

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
					<FloatingActionBtn />
				</div>
			</div>
		</>
	);
}

export default Home;
