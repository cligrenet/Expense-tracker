const pool = require('../config/db');

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Private
exports.getTransactions = async (req, res, next) => {
	// Get user using the id in the JWT
	try {
		// console.log(req.user.rows[0]);
		const wantedUserId = req.user.rows[0].user_id;

		const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		// 1, Add sorting logic when query DB
		// 2, Add filtering logic when query DB
		// SELECT * FROM transactions WHERE user_id=3 AND category IN ('Cars', 'Business') ORDER BY created_at ASC
		let filters = '';
		if (req.query.filters && req.query.filters.length > 0) {
			filters = `AND category IN (${req.query.filters.map((c) => `'${c}'`).join(',')})`;
		}

		const transactions = await pool.query(
			`SELECT * FROM transactions WHERE user_id='${wantedUserId}' ${filters} ORDER BY created_at ${
				req.query.sort_direction === 'desc' ? 'DESC' : 'ASC'
			}`,
		);

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
// @route POST /api/v1/transactions
// @access Private
exports.addTransaction = async (req, res, next) => {
	try {
		const { text, amount, category } = req.body;

		if (!text || !amount || !category) {
			res.status(400);
			throw new Error('ValidationError');
		}

		// Get user using the id in the JWT
		const wantedUserId = req.user.rows[0].user_id;
		const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		// Create transaction
		const transaction = await pool.query(
			`INSERT INTO transactions(user_id, text, amount, category) VALUES ($1, $2, $3, $4) RETURNING *`,
			[wantedUserId, text, amount, category],
		);

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
// @route Delete /api/v1/transactions/:id
// @access Private
exports.deleteTransaction = async (req, res, next) => {
	try {
		// Get user using the id in the JWT
		// console.log(req.user.rows[0]);
		const wantedUserId = req.user.rows[0].user_id;
		const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		const transaction = await pool.query(`SELECT * FROM transactions WHERE transaction_id=${req.params.id}`);
		const wantedTransaction = transaction.rows[0];

		if (!wantedTransaction) {
			return res.status(404).json({
				success: false,
				error: 'No transaction found',
			});
		}

		if (wantedTransaction.user_id !== wantedUserId) {
			res.status(401);
			throw new Error('Not authorized');
		}

		// Delete transaction
		await pool.query(`DELETE FROM transactions WHERE transaction_id=${req.params.id}`);

		return res.status(200).json({
			success: true,
			data: {},
			message: 'Transaction deleted',
		});
	} catch (err) {
		// console.log(err);
		return res.status(500).json({
			success: false,
			error: 'Server error',
		});
	}
};

// @desc Get all income transactions
// @route Get /api/v1/transactions/income
// @access Private
exports.getIncomes = async (req, res, next) => {
	try {
		const wantedUserId = req.user.rows[0].user_id;

		const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		// SELECT * FROM transactions WHERE user_id=3 AND category IN ('Cars', 'Business') ORDER BY created_at ASC
		let filters = '';
		if (req.query.filters && req.query.filters.length > 0) {
			filters = `AND category IN (${req.query.filters.map((c) => `'${c}'`).join(',')})`;
		}

		const transactions = await pool.query(
			`SELECT * FROM transactions WHERE user_id='${wantedUserId}' AND amount > 0 ${filters} ORDER BY created_at ${
				req.query.sort_direction === 'desc' ? 'DESC' : 'ASC'
			}`,
		);

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

// @desc Get all expense transactions
// @route Get /api/v1/transactions/expense
// @access Private
exports.getExpenses = async (req, res, next) => {
	try {
		const wantedUserId = req.user.rows[0].user_id;

		const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		// SELECT * FROM transactions WHERE user_id=3 AND category IN ('Cars', 'Business') ORDER BY created_at ASC
		let filters = '';
		if (req.query.filters && req.query.filters.length > 0) {
			filters = `AND category IN (${req.query.filters.map((c) => `'${c}'`).join(',')})`;
		}

		const transactions = await pool.query(
			`SELECT * FROM transactions WHERE user_id='${wantedUserId}' AND amount < 0 ${filters} ORDER BY created_at ${
				req.query.sort_direction === 'desc' ? 'DESC' : 'ASC'
			}`,
		);

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
