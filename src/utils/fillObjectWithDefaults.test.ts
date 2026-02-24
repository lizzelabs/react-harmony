/* eslint-disable @typescript-eslint/no-explicit-any */
import { fillObjectWithDefaults } from './fillObjectWithDefaults';

describe('fillObjectWithDefaults Tests', () => {
  it.each([
    [
      { value: 1, current: undefined },
      { value: 2, current: 5 },
      { value: 1, current: 5 },
    ],
    [
      { value: undefined, current: '500' },
      undefined,
      { value: undefined, current: '500' },
    ],
    [
      undefined,
      { value: 500, current: 'Hello world' },
      { value: 500, current: 'Hello world' },
    ],
  ])(
    'Should fill %s with %s and returns %s',
    (obj: any, defaults: any, expected: any) => {
      expect(JSON.stringify(fillObjectWithDefaults(obj, defaults))).toBe(
        JSON.stringify(expected),
      );
    },
  );
});
