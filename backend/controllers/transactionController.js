const { PrismaClient } = require('@prisma/client');
// const pool = require('../config/db');

const prisma = new PrismaClient();

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Private
exports.getTransactions = async (req, res, next) => {
	// Get user using the id in the JWT
	try {
		const wantedUserId = req.user.user_id;
		// console.log({ wantedUserId });

		// const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);
		const user = await prisma.users.findUnique({
			where: {
				user_id: wantedUserId,
			},
		});
		// console.log({ user });

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		// 1, Add sorting logic when query DB
		// 2, Add filtering logic when query DB
		// SELECT * FROM transactions WHERE user_id=3 AND category IN ('Cars', 'Business') ORDER BY created_at ASC
		// let filters = '';
		// if (req.query.filters && req.query.filters.length > 0) {
		// 	filters = `AND category IN (${req.query.filters.map((c) => `'${c}'`).join(',')})`;
		// }

		// const transactions = await pool.query(
		// 	`SELECT * FROM transactions WHERE user_id='${wantedUserId}' ${filters} ORDER BY created_at ${
		// 		req.query.sort_direction === 'desc' ? 'DESC' : 'ASC'
		// 	}`,
		// );
		const transactions = await prisma.transactions.findMany({
			where: {
				user_id: wantedUserId,
				category: {
					in: req.query.filters && req.query.filters.length > 0 && req.query.filters.map((c) => c),
				},
			},
			orderBy: [
				{
					created_at: req.query.sort_direction === 'desc' ? 'desc' : 'asc',
				},
			],
		});

		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions,
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
		const wantedUserId = req.user.user_id;
		// const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);
		const user = await prisma.users.findUnique({
			where: {
				user_id: wantedUserId,
			},
		});

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		// Create transaction
		// const transaction = await pool.query(
		// 	`INSERT INTO transactions(user_id, text, amount, category) VALUES ($1, $2, $3, $4) RETURNING *`,
		// 	[wantedUserId, text, amount, category],
		// );
		const transaction = await prisma.transactions.create({
			data: {
				user_id: wantedUserId,
				text,
				amount,
				category,
			},
		});

		return res.status(201).json({ success: true, data: transaction });
	} catch (err) {
		console.error(err);

		if (err.message === 'ValidationError') {
			return res.status(400).json({
				success: false,
				error: err.message,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: err.message,
			});
		}
	}
};

// @desc Delete transaction
// @route Delete /api/v1/transactions/:id
// @access Private
exports.deleteTransaction = async (req, res, next) => {
	try {
		// Get user using the id in the JWT
		// console.log(req.user.rows[0]);
		const wantedUserId = req.user.user_id;
		// const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);
		const user = await prisma.users.findUnique({
			where: {
				user_id: wantedUserId,
			},
		});
		// console.log({ user });

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		// const transaction = await pool.query(`SELECT * FROM transactions WHERE transaction_id=${req.params.id}`);
		// const wantedTransaction = transaction.rows[0];
		const wantedTransaction = await prisma.transactions.findUnique({
			where: {
				transaction_id: Number(req.params.id),
			},
		});

		// console.log({ wantedTransaction });

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
		// await pool.query(`DELETE FROM transactions WHERE transaction_id=${req.params.id}`);
		await prisma.transactions.delete({
			where: {
				transaction_id: Number(req.params.id),
			},
		});

		return res.status(200).json({
			success: true,
			data: {},
			message: 'Transaction deleted',
		});
	} catch (err) {
		console.log(err);
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
		const wantedUserId = req.user.user_id;

		// const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);
		const user = await prisma.users.findUnique({
			where: {
				user_id: wantedUserId,
			},
		});

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		// SELECT * FROM transactions WHERE user_id=3 AND category IN ('Cars', 'Business') ORDER BY created_at ASC
		// let filters = '';
		// if (req.query.filters && req.query.filters.length > 0) {
		// 	filters = `AND category IN (${req.query.filters.map((c) => `'${c}'`).join(',')})`;
		// }

		// const transactions = await pool.query(
		// 	`SELECT * FROM transactions WHERE user_id='${wantedUserId}' AND amount > 0 ${filters} ORDER BY created_at ${
		// 		req.query.sort_direction === 'desc' ? 'DESC' : 'ASC'
		// 	}`,
		// );
		const transactions = await prisma.transactions.findMany({
			where: {
				user_id: wantedUserId,
				amount: {
					gt: 0,
				},
				category: {
					in: req.query.filters && req.query.filters.length > 0 && req.query.filters.map((c) => c),
				},
			},
			orderBy: [
				{
					created_at: req.query.sort_direction === 'desc' ? 'desc' : 'asc',
				},
			],
		});

		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions,
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
		const wantedUserId = req.user.user_id;

		// const user = await pool.query(`SELECT * FROM users WHERE user_id='${wantedUserId}'`);
		const user = await prisma.users.findUnique({
			where: {
				user_id: wantedUserId,
			},
		});

		if (!user) {
			res.status(401);
			throw new Error('User not found');
		}

		// SELECT * FROM transactions WHERE user_id=3 AND category IN ('Cars', 'Business') ORDER BY created_at ASC
		// let filters = '';
		// if (req.query.filters && req.query.filters.length > 0) {
		// 	filters = `AND category IN (${req.query.filters.map((c) => `'${c}'`).join(',')})`;
		// }

		// const transactions = await pool.query(
		// 	`SELECT * FROM transactions WHERE user_id='${wantedUserId}' AND amount < 0 ${filters} ORDER BY created_at ${
		// 		req.query.sort_direction === 'desc' ? 'DESC' : 'ASC'
		// 	}`,
		// );
		const transactions = await prisma.transactions.findMany({
			where: {
				user_id: wantedUserId,
				amount: {
					lt: 0,
				},
				category: {
					in: req.query.filters && req.query.filters.length > 0 && req.query.filters.map((c) => c),
				},
			},
			orderBy: [
				{
					created_at: req.query.sort_direction === 'desc' ? 'desc' : 'asc',
				},
			],
		});

		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions,
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			success: false,
			error: 'Server error',
		});
	}
};
