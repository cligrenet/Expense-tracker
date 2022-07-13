import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';

// React Modal
const customStyles = {
	content: {
		width: '600px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		position: 'relative',
		borderRadius: '0.5rem',
		backgroundColor: '#010a42',
	},
};

Modal.setAppElement('#root');

const AddTransaction = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

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
		setModalIsOpen(false);
	};

	// Open/close modal
	const openModal = () => {
		setText('');
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<div>
			<div>
				<MdAdd
					className="rounded-full w-10 h-10 text-white bg-purple hover:bg-yellow cursor-pointer"
					onClick={openModal}
				/>
			</div>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Add New Transaction"
			>
				<div className="flex flexwrap justify-between items-start">
					<h2 className="text-xl text-purple mb-3">Add New Transation</h2>
					<button className="text-slate-200 pr-4 hover:text-yellow" onClick={closeModal}>
						x
					</button>
				</div>

				<form onSubmit={handleAddTransaction}>
					<div className="flex flex-col mb-2">
						<label className="pr-3 text-slate-400" htmlFor="text">
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
						<label className="pr-3 text-slate-400" htmlFor="amount">
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
						<button className="btn-delete ease-in-out duration-300 hover:bg-yellow">Add</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default AddTransaction;
