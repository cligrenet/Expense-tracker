const pool = require('../config/db');

// @desc Get all transactions
// @route GET /api/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
	try {
		const transactions = await pool.query(`SELECT * FROM transactions`);

		return res.status(200).json({
			success: true,
			count: transactions.rows.length,
			data: transactions.rows,
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			success: false,
			error: 'Server error',
		});
	}
};

// @desc Add a transaction
// @route POST /api/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
	try {
		const { text, amount } = req.body;

		// if (!text || !amount) {
		// 	res.status(400);
		// 	throw new Error('ValidationError');
		// }

		const transaction = await pool.query(`INSERT INTO transactions(text, amount) VALUES ($1, $2) RETURNING *`, [
			text,
			amount,
		]);

		return res.status(201).json({ success: true, data: transaction.rows });
	} catch (err) {
		// console.error(err);

		// if (Error === 'ValidationError') {
		// 	const messages = Object.values(err.errors).map((val) => val.message);

		// 	return res.status(400).json({
		// 		success: false,
		// 		error: messages,
		// 	});
		// } else {
		return res.status(500).json({
			success: false,
			error: err.detail,
		});
		// }
	}
};

// @desc Delete transaction
// @route GET /api/transactions/:id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
	try {
		const transaction = await pool.query(`SELECT * FROM transactions WHERE transaction_id=${req.params.id}`);
		const wantedTransaction = transaction.rows[0];

		if (!wantedTransaction) {
			return res.status(404).json({
				success: false,
				error: 'No transaction found',
			});
		}

		await pool.query(`DELETE FROM transactions WHERE transaction_id=${req.params.id}`);

		return res.status(200).json({
			success: true,
			data: {},
		});
	} catch (err) {
		// console.log(err);
		return res.status(500).json({
			success: false,
			error: 'Server error',
		});
	}
};
