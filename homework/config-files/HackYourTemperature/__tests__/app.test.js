// app.test.js
import app from '../app';
import supertest from 'supertest'

const request = supertest(app);

describe('Testing API endpoints', () => {
  it('should respond with 200 for GET /', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('should respond with 404 for non-existent route', async () => {
    const response = await request.get('/nonexistentroute');
    expect(response.status).toBe(404);
  });

  it('should respond with 400 for POST without body', async () => {
    const response = await request.post('/your-endpoint').send({});
    expect(response.status).toBe(400);
  });

  // Add more tests for different scenarios
});

