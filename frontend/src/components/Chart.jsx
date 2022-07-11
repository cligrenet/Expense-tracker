import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComp = () => {
	const { transactions } = useContext(GlobalContext);

	const amounts = transactions.map((transaction) => +transaction.amount);
	const income = amounts.filter((amount) => amount > 0).reduce((acc, amount) => (acc += amount), 0);
	const expense = Math.abs(amounts.filter((amount) => amount < 0).reduce((acc, amount) => (acc += amount), 0));

	const chartData = {
		labels: ['Income', 'Expense'],
		datasets: [
			{
				data: [income, expense],
				backgroundColor: ['#01cb87', '#ff2e62'],
				borderColor: '#010a42',
				borderWidth: 4,
			},
		],
		options: {
			legend: {
				labels: {
					Color: '#262e69', //QUESTION
				},
			},
		},
	};

	return (
		<>
			<Doughnut data={chartData} />
		</>
	);
};

export default ChartComp;
