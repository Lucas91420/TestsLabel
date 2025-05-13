import request from 'supertest';
import { app } from '../src/server';
import { resetStore, setUsers } from '../src/usersStore';
import * as fixtures from './fixtures';
import * as externalApi from '../src/externalApi';

describe('API Users – tests avancés', () => {
  // Avant chaque test, on initialise le store avec nos fixtures
  beforeEach(() => {
    resetStore();
    setUsers(fixtures.initialUsers); // ✅ nouvelle ligne
  });

  /**
   * Paramétrage : GET /users/:id pour plusieurs cas
   */
  describe('GET /users/:id', () => {
    const cases = [
      { id: 1, expected: fixtures.alice, status: 200 },
      { id: 2, expected: fixtures.bob, status: 200 },
      { id: 3, expected: { error: 'User not found' }, status: 404 }
    ] as const;

    test.each(cases)('id=$id → $status', async ({ id, expected, status }) => {
      jest.spyOn(externalApi, 'fetchUserData').mockResolvedValue({ extra: 'info' });
      const res = await request(app).get(`/users/${id}`);
      expect(res.status).toBe(status);
      expect(res.body).toEqual(expected);
    });
  });

  /**
   * Tester PUT /users/:id
   */
  it('PUT /users/1 sans body.name → 400', async () => {
    const res = await request(app).put('/users/1').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'name is required' });
  });

  it('PUT /users/99 non existant → 404', async () => {
    const res = await request(app).put('/users/99').send({ name: 'New' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });

  it('PUT /users/2 avec name → 200 & user mis à jour', async () => {
    const res = await request(app).put('/users/2').send({ name: 'Bobby' });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 2, name: 'Bobby' });
  });
});
