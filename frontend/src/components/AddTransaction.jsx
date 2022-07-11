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
			<h3 className="white-font">Add new transaction</h3>
			<form onSubmit={handleAddTransaction}>
				<div className="form-control">
					<label className="white-font" htmlFor="text">
						Text
					</label>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter text..."
					/>
				</div>
				<div className="form-control">
					<label className="white-font" htmlFor="amount">
						Amount ( - : expense, + : income )
					</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Enter amount..."
					/>
				</div>
				<div className="form-control">
					<button className="btn">Add</button>
				</div>
			</form>
		</>
	);
};

export default AddTransaction;
