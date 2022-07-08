import React from 'react';
import Transaction from './Transaction';

const TransactionList = () => {
	return (
		<>
			<h3>History</h3>
			<ul className="list">
				<li className="minus">
					Cash <span>€-400</span>
					<button className="delete-btn">x</button>
				</li>
			</ul>
		</>
	);
};

export default TransactionList;
