import useTransactions from '../../hooks/useTransactions';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function IncomeChart() {
	const location = useLocation();
	const type = location.pathname.substring(1);

	const { chartData, options } = useTransactions(type);

	return (
		<section className="px-20 mb-5">
			<Doughnut data={chartData} options={options} />
		</section>
	);
}

export default IncomeChart;
