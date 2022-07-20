import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Modal from 'react-modal';
import Select from 'react-select';
import { options } from '../utils/categoriesData';

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
						value={options.filter(
							(obj) =>
								transactionsSelectedCategories && transactionsSelectedCategories.includes(obj.value),
						)}
					/>
				</div>
			</Modal>
		</>
	);
}

export default FiltersModal;
