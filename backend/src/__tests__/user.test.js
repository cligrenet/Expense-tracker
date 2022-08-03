const supertest = require('supertest');
const { PrismaClient } = require('@prisma/client');
const createServer = require('../utils/server');

const app = createServer();

const prisma = new PrismaClient();

const user1 = {
	name: 'user2',
	email: 'user2@email.com',
	password: '123',
};

beforeAll(async () => {
	// await prisma.users.create({ data: user1 });
});

afterAll(async () => {
	await prisma.users.deleteMany({});
});

describe('User', () => {
	describe('register a user', () => {
		it('should register a user', async () => {
			await supertest(app)
				.post('/api/v1/users')
				.send({
					name: user1.name,
					email: user1.email,
					password: user1.password,
				})
				.expect(201);
		});
	});
});
