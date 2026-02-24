/* eslint-disable @typescript-eslint/no-explicit-any */
import { excludeProperties } from './excludeProperties';

describe('excludeProperties Tests', () => {
  it.each([
    [
      ['keys', 'current'],
      { value: 1, keys: [], current: {}, other: undefined },
      { value: 1, other: undefined },
    ],
    [['keys'], { value: 1, keys: undefined }, { value: 1 }],
    [['current'], { value: 1 }, { value: 1 }],
  ])(
    'Should remove %s from %s and gets %s ',
    (keys: string[], obj: any, expected: any) => {
      expect(JSON.stringify(excludeProperties(obj, keys))).toBe(
        JSON.stringify(expected),
      );
    },
  );
});
