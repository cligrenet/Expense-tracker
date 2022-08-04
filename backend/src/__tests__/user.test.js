const supertest = require('supertest');
const { PrismaClient } = require('@prisma/client');
const createServer = require('../utils/server');

const app = createServer();

const prisma = new PrismaClient();

const user2 = {
	name: 'user2',
	email: 'user2@email.com',
	password: '123',
};

beforeAll(async () => {
	// await prisma.users.create({ data: user2 });
});

afterAll(async () => {
	await prisma.users.deleteMany({});
});

let token = null;

describe('User', () => {
	describe('register a user', () => {
		it('should throw exception if email empty', async () => {
			await supertest(app)
				.post('/api/v1/users')
				.send({
					name: user2.name,
					password: user2.password,
				})
				.expect(400);
		});

		it('should throw exception if password empty', async () => {
			await supertest(app)
				.post('/api/v1/users')
				.send({
					name: user2.name,
					email: user2.email,
				})
				.expect(400);
		});

		it('should throw exception if no body provided', async () => {
			await supertest(app).post('/api/v1/users').expect(400);
		});

		it('should register a user', async () => {
			await supertest(app)
				.post('/api/v1/users')
				.send({
					name: user2.name,
					email: user2.email,
					password: user2.password,
				})
				.expect(201);
		});
	});

	describe('login a user', () => {
		it('should throw exception if email empty', async () => {
			await supertest(app)
				.post('/api/v1/users/login')
				.send({
					password: user2.password,
				})
				.expect(401);
		});

		it('should throw exception if password empty', async () => {
			await supertest(app)
				.post('/api/v1/users/login')
				.send({
					email: user2.email,
				})
				.expect(401);
		});

		it('should throw exception if no body provided', async () => {
			await supertest(app).post('/api/v1/users/login').expect(401);
		});

		it('should log in a user', async () => {
			const res = await supertest(app)
				.post('/api/v1/users/login')
				.send({
					email: user2.email,
					password: user2.password,
				})
				.expect(200);

			token = res.body.token;
		});
	});

	describe('get current user information', () => {
		it('should fetch current user data', async () => {
			await supertest(app)
				.get('/api/v1/users/me')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200);
		});
	});
});
