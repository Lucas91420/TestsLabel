import { fetchUserData } from '../src/externalApi';

describe('externalApi', () => {
  it('should return mocked external data', async () => {
    const res = await fetchUserData(1);
    expect(res).toEqual({ extra: 'données pour user 1' });
  });
});
