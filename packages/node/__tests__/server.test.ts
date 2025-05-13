import { app } from '../src/server';
import request from 'supertest';

describe('Server base setup', () => {
  it('should respond to unknown route with 404', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
  });
});
