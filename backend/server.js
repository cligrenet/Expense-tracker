const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const morgan = require('morgan');
const pool = require('./config/db');

const transactions = require('./routes/transactions');

const app = express();

app.use(express.json()); // Use body parser

app.use('/api/v1/transactions', transactions);

const PORT = process.env.SERVER_PORT || 8080;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port htllp:localhost:${PORT}`.yellow.bold),
);
