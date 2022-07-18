import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { incomeCategories, expenseCategories, resetCategories } from '../utils/categoriesData';

function useTransactions(type) {
	resetCategories();
	const { transactions } = useContext(GlobalContext);

	transactions.map((t) => (t.type = t.amount > 0 ? 'income' : 'expense'));

	const wantedTransactions = transactions.filter((t) => t.type === type);

	const categories = type === 'income' ? incomeCategories : expenseCategories;

	wantedTransactions.forEach((t) => {
		const category = categories.find((c) => c.type === t.category);

		if (category) {
			category.amount += Math.abs(t.amount);
		}
	});

	const filteredCategories = categories.filter((c) => Math.abs(c.amount) > 0);

	const chartData = {
		labels: filteredCategories.map((c) => c.type),
		datasets: [
			{
				data: filteredCategories.map((c) => c.amount),
				backgroundColor: filteredCategories.map((c) => c.color),
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
	return {
		filteredCategories,
		chartData,
	};
}

export default useTransactions;
