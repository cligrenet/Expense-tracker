// const express = require('express');
// const path = require('path');
// require('dotenv').config();
// require('colors'); // Colored console log
// const morgan = require('morgan');
// const cors = require('cors');
// const { errorHandler } = require('./middleware/errorMiddleware');
const createServer = require('./utils/server');

const app = createServer();

const PORT = process.env.SERVER_PORT || 8080;

app.listen(
	PORT,
	console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`.yellow.bold),
);
