const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User } = require('../models');
const userRoutes = require('../routes/user');

const app = express();
app.use(bodyParser.json());
app.use('/api', userRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get a user by ID', async () => {
    const user = await User.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
    });
    const res = await request(app).get(`/api/users/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Jane Doe');
  });
});
