import { appendClasses } from './appendClasses';

describe('appendClasses Tests', () => {
  it('It should return a single string with spaces separating ', () => {
    const result = appendClasses('test', 'other', 'value', undefined);

    expect(result).toBe('test other value');
  });
});
