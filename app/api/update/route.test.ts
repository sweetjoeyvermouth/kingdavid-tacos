import { isValidToken } from './route';

describe('isValidToken', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, ADMIN_TOKEN: 'secret123' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns true for a matching token', () => {
    expect(isValidToken('secret123')).toBe(true);
  });

  it('returns false for a wrong token', () => {
    expect(isValidToken('wrongtoken')).toBe(false);
  });

  it('returns false for an empty token', () => {
    expect(isValidToken('')).toBe(false);
  });
});
