const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');

// @desc Register a new user
// @route POST /api/v1/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Validation
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('🔺 Please make sure all fields are completed correctly.');
	}

	// Find if user already exists
	const foundUser = await pool.query(`SELECT email FROM users WHERE email='${email}'`);
	// console.log(foundUser);

	if (foundUser.rows.length !== 0) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await pool.query(
		'INSERT INTO users(name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
		[name, email, hashedPassword, false],
	);
	const newUser = user.rows[0];

	if (newUser) {
		res.status(201).json({
			user_id: newUser.user_id,
			name: newUser.name,
			email: newUser.email,
			token: generateToken(newUser.user_id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Login a user
// @route POST /api/v1/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await pool.query(`SELECT * FROM users WHERE email='${email}'`);
	const foundUser = user.rows[0];
	// console.log({ foundUser });

	// Check user and passwords match
	if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
		res.status(200).json({
			user_id: foundUser.user_id,
			name: foundUser.name,
			email: foundUser.email,
			token: generateToken(foundUser.user_id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid credentials');
	}
});

// @desc Get current user
// @route /api/v1/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	const user = req.user.rows[0];
	res.status(200).json(user);
});

// Helper function: Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
