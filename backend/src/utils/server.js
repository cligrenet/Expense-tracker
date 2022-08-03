const express = require('express');
const path = require('path');
require('dotenv').config();
require('colors'); // Colored console log
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('../middleware/errorMiddleware');

function createServer() {
	const app = express();

	// Middlewares
	const corsOptions = { origin: process.env.FRONTEND_URL, credentials: true };

	app.use(cors(corsOptions));
	app.use(express.json()); // Use body parser

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev')); // Show response code in console
	}

	app.get('/', (req, res) => {
		res.status(200).json({ message: 'Welcome to Expense Tracker!' });
	});

	// Routes
	const transactions = require('../routes/transactions');
	const users = require('../routes/users');

	app.use('/api/v1/transactions', transactions);
	app.use('/api/v1/users', users);

	app.use(errorHandler);

	//TODO Prepare for production
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static('../../frontend/build'));

		app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
	}

	return app;
}

module.exports = createServer;
