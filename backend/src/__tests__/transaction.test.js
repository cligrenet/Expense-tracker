const supertest = require('supertest');
const { PrismaClient } = require('@prisma/client');
const createServer = require('../utils/server');
const bcrypt = require('bcryptjs');

const app = createServer();

const prisma = new PrismaClient();

const user1 = {
	name: 'user1',
	email: 'user1@email.com',
	password: '123',
};

const transaction1 = {
	text: 'test',
	amount: '100',
	category: 'Business',
};

let token = null;
let transactionId = null;
let userId = null;

beforeAll(async () => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(user1.password, salt);

	await prisma.users.create({
		data: {
			name: user1.name,
			email: user1.email,
			password: hashedPassword,
		},
	});

	const res = await supertest(app)
		.post('/api/v1/users/login')
		.send(user1)
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.expect(200);

	token = await res.body.token;

	userId = await res.body.user_id;
});

afterAll(async () => {
	await prisma.users.deleteMany({});
});

describe('Transaction', () => {
	describe('get empty transactions', () => {
		it('should get empty transaction', async () => {
			const res = await supertest(app)
				.get('/api/v1/transactions')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);

			const transactions = await res.body.data;
			expect(transactions).toEqual([]);
		});
	});

	describe('add a transaction', () => {
		it('should create transaction', async () => {
			const res = await supertest(app)
				.post('/api/v1/transactions')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({
					user_id: userId,
					text: transaction1.text,
					amount: transaction1.amount,
					category: transaction1.category,
				})
				.expect(201);

			transactionId = await res.body.data.transaction_id;
		});
	});

	describe('get all transactions', () => {
		it('should fetch all transactions', async () => {
			await supertest(app)
				.get('/api/v1/transactions')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
	});

	describe('delete a transaction', () => {
		it('should delete the transaction by id', async () => {
			await supertest(app)
				.delete('/api/v1/transactions/' + transactionId)
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});

		it('should get empty transactions', async () => {
			const res = await supertest(app)
				.get('/api/v1/transactions')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);

			const transactions = await res.body.data;
			expect(transactions).toEqual([]);
		});
	});
});
