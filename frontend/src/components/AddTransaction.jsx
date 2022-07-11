import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
	const [text, setText] = useState('');
	const [amount, setAmount] = useState(0);

	const { addTransaction } = useContext(GlobalContext);

	const handleAddTransaction = (e) => {
		e.preventDefault();

		const newTransaction = {
			id: Math.floor(Math.random() * 100000000),
			text: text,
			amount: +amount,
		};

		addTransaction(newTransaction);
	};

	return (
		<>
			<h3 className="text-l text-purple mb-3">Add new transaction</h3>
			<form onSubmit={handleAddTransaction}>
				<div className="flex flex-col mb-2">
					<label className="pr-3 text-muted-darkblue" htmlFor="text">
						Text
					</label>
					<input
						className="form-input rounded-lg bg-slate-300 focus:bg-slate-100"
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter text..."
					/>
				</div>

				<div className="flex flex-col mb-2">
					<label className="pr-3 text-muted-darkblue" htmlFor="amount">
						Amount ( - : expense, + : income )
					</label>
					<input
						className="form-input rounded-lg bg-slate-300 focus:bg-slate-100"
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Enter amount..."
					/>
				</div>
				<div className="form-control">
					<button className="btn-delete hover:bg-yellow">Add</button>
				</div>
			</form>
		</>
	);
};

export default AddTransaction;
