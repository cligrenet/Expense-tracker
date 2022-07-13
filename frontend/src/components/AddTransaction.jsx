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
	const [category, setCategory] = useState('');

	const { user, addTransaction } = useContext(GlobalContext);

	const handleAddTransaction = (e) => {
		e.preventDefault();

		const newTransaction = {
			text: text,
			amount: +amount,
			category: category,
		};

		addTransaction(newTransaction, user.token);
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
							placeholder="Enter Amount..."
						/>
					</div>

					<div className="flex flex-col mb-2">
						<label className="pr-3 text-slate-400" htmlFor="category">
							Category
						</label>
						<select
							className="form-input rounded-lg bg-slate-300 focus:bg-slate-100"
							name="category"
							id="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<option value="">--Please choose an option--</option>
							<option value="Bills">Bills</option>
							<option value="Business">Business</option>
							<option value="Bank Fees">Bank Fees</option>
							<option value="Car">Car</option>
							<option value="Education/Training">Education/Training</option>
							<option value="Entertainment">Entertainment</option>
							<option value="Food/Grocery">Food/Grocery</option>
							<option value="Gifts">Gifts</option>
							<option value="House">House</option>
							<option value="Investments">Investments</option>
							<option value="Interest">Interest</option>
							<option value="Insurance">Insurance</option>
							<option value="Kid">Kid</option>
							<option value="Legal Fees">Legal Fees</option>
							<option value="Medical">Medical</option>
							<option value="Online Services">Online Services</option>
							<option value="Other">Other</option>
							<option value="Pet">Pet</option>
							<option value="Phone/Internet">Phone/Internet</option>
							<option value="Post/Shipping">Post/Shipping</option>
							<option value="Rental">Rental</option>
							<option value="Repairs/Maintenance">Repairs/Maintenance</option>
							<option value="Restaurant">Restaurant</option>
							<option value="Salary">Salary</option>
							<option value="Saving">Saving</option>
							<option value="Software">Software</option>
							<option value="Shopping">Shopping</option>
							<option value="Subscriptions/Memberships">Subscriptions/Memberships</option>
							<option value="Taxes">Taxes</option>
							<option value="Transport">Transport</option>
							<option value="Travel">Travel</option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
							<option value=""></option>
						</select>
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
