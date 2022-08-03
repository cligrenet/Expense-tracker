// const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// Get token from header
			console.log(req.headers.authorization);
			token = req.headers.authorization.split(' ')[1];
			console.log({ token });

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from token
			// req.user = await pool.query(`SELECT user_id, name, email FROM users WHERE user_id='${decoded.id}'`);
			req.user = await prisma.users.findUnique({
				where: {
					user_id: decoded.id,
				},
				select: {
					user_id: true,
					name: true,
					email: true,
				},
			});

			next();
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error('Not authorized');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized');
	}
});

module.exports = { protect };
