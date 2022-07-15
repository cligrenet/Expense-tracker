import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Modal from 'react-modal';
import Select from 'react-select';

// React Modal
const customStyles = {
	content: {
		width: '600px',
		height: '60%',
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

function FiltersModal({ modalIsOpen, closeModal }) {
	const options = [
		{ value: 'Bills', label: 'Bills' },
		{ value: 'Business', label: 'Business' },
		{ value: 'Bank Fees', label: 'Bank Fee' },
		{ value: 'Car', label: 'Car' },
		{ value: 'Education/Training', label: 'Education/Training' },
		{ value: 'Entertainment', label: 'Entertainment' },
		{ value: 'Food/Grocery', label: 'Food/Grocery' },
		{ value: 'Gifts', label: 'Gifts' },
		{ value: 'House', label: 'House' },
		{ value: 'Investments', label: 'Investments' },
		{ value: 'Interest', label: 'Interest' },
		{ value: 'Insurance', label: 'Insurance' },
		{ value: 'Kid', label: 'Kid' },
		{ value: 'Legal Fees', label: 'Legal Fees' },
		{ value: 'Medical', label: 'Medical' },
		{ value: 'Online Services', label: 'Online Services' },
		{ value: 'Other', label: 'Other' },
		{ value: 'Pet', label: 'Pet' },
		{ value: 'Phone/Internet', label: 'Phone/Internet' },
		{ value: 'Post/Shipping', label: 'Post/Shipping' },
		{ value: 'Rental', label: 'Rental' },
		{ value: 'Repairs/Maintenance', label: 'Repairs/Maintenance' },
		{ value: 'Restaurant', label: 'Restaurant' },
		{ value: 'Salary', label: 'Salary' },
		{ value: 'Saving', label: 'Saving' },
		{ value: 'Software', label: 'Software' },
		{ value: 'Shopping', label: 'Shopping' },
		{ value: 'Subscriptions/Memberships', label: 'Subscriptions/Memberships' },
		{ value: 'Taxes', label: 'Taxes' },
		{ value: 'Transport', label: 'Transport' },
		{ value: 'Travel', label: 'Travel' },
	];

	const { transactionsSelectedCategories, handleTransactionsSelectedCategories } = useContext(GlobalContext);

	const handleCategorySelect = (e) => {
		handleTransactionsSelectedCategories(Array.isArray(e) ? e.map((x) => x.value) : []);
	};

	return (
		<>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Add New Transaction"
			>
				<div className="flex flexwrap justify-between items-start">
					<h2 className="text-xl text-purple mb-3">Filters</h2>

					<button className="text-slate-200 pr-4 hover:text-yellow" onClick={closeModal}>
						x
					</button>
				</div>
				<div>
					<h3 className="text-slate-300">By Category</h3>

					<Select
						isMulti
						name="colors"
						options={options}
						className="basic-multi-select"
						classNamePrefix="select"
						onChange={handleCategorySelect}
						value={options.filter((obj) => transactionsSelectedCategories.includes(obj.value))}
					/>
				</div>
			</Modal>
		</>
	);
}

export default FiltersModal;
