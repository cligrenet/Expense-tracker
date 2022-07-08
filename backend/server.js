const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const colors = require('colors');
const morgan = require('morgan');
const pool = require('./config/db');

const transactions = require('./routes/transactions');

const app = express();

app.use(express.json()); // Use body parser

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev')); // Show response code in console
}

app.use('/api/v1/transactions', transactions);

//TODO Prepare for production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../frontend/build'));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}

const PORT = process.env.SERVER_PORT || 8080;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port htllp:localhost:${PORT}`.yellow.bold),
);
