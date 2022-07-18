import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { calcIncomeTotal, calcExpenseTotal } from '../utils/calculate';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComp = () => {
	const { transactions } = useContext(GlobalContext);

	const income = transactions ? calcIncomeTotal(transactions) : 0;
	const expense = transactions ? calcExpenseTotal(transactions) : 0;

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
