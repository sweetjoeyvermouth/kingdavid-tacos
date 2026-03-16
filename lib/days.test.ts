import { daysSince } from './days';

describe('daysSince', () => {
  it('returns 0 when the date is today', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(daysSince(today)).toBe(0);
  });

  it('returns 1 when the date was yesterday', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    expect(daysSince(yesterday)).toBe(1);
  });

  it('returns 7 for a date 7 days ago', () => {
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    expect(daysSince(weekAgo)).toBe(7);
  });
});
