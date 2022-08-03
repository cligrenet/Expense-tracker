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

beforeAll(async () => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(user1.password, salt);

	await prisma.users.create({ data: { name: user1.name, email: user1.email, password: hashedPassword } });

	const res = await supertest(app)
		.post('/api/v1/users/login')
		.send(user1)
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.expect(200);

	token = res.body.token;
});

afterAll(async () => {
	await prisma.users.deleteMany({});
});

describe('Transaction', () => {
	describe('get all transactions', () => {
		test('It should fetch all transactions', async () => {
			await supertest(app)
				.get('/api/v1/transactions')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
	});
});
