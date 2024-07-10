// app.test.js
import app from '../app';
import supertest from 'supertest'

const request = supertest(app);

describe('Testing API endpoints', () => {
  it('should respond with 200 for GET /', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('should return error if city name empty ',async()=>{
    const response=await request.get('/weather').send();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "City name is required" });
  })
  
});

