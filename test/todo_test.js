const request = require('supertest');
const app = require('../app');
const { sequelize, Todo } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await Todo.destroy({ where: {}, truncate: true });
});

describe('Todo API', () => {
  describe('GET /api/todos', () => {
    it('should list all todos', async () => {
      await Todo.create({ title: 'Test Todo' });
      const res = await request(app).get('/api/todos');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Test Todo');
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should get a todo by id', async () => {
      const todo = await Todo.create({ title: 'Test Todo' });
      const res = await request(app).get(`/api/todos/${todo.id}`);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Todo');
    });

    it('should return 404 if todo not found', async () => {
      const res = await request(app).get('/api/todos/999');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const res = await request(app).post('/api/todos').send({ title: 'New Todo' });
      expect(res.status).toBe(201);
      expect(res.body.title).toBe('New Todo');
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should soft delete a todo', async () => {
      const todo = await Todo.create({ title: 'Test Todo' });
      const res = await request(app).delete(`/api/todos/${todo.id}`);
      expect(res.status).toBe(204);
      const deletedTodo = await Todo.findByPk(todo.id, { paranoid: false });
      expect(deletedTodo.deletedAt).not.toBeNull();
    });

    it('should return 404 if todo not found', async () => {
      const res = await request(app).delete('/api/todos/999');
      expect(res.status).toBe(404);
    });
  });
});
