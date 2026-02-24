/* eslint-disable @typescript-eslint/no-explicit-any */

export const fillObjectWithDefaults = <T extends object, D extends object>(
  obj: T,
  ...defaults: D[]
): T => {
  const copy = { ...obj };

  for (const objDefault of defaults) {
    for (const key in objDefault) {
      const defaultValue = objDefault[key];
      const targetValue = copy[key as any];

      if (
        typeof targetValue === 'object' &&
        Array.isArray(targetValue) === false &&
        typeof defaultValue === 'object' &&
        Array.isArray(defaultValue) === false
      ) {
        copy[key as any] = { ...targetValue, ...defaultValue };
      } else if (targetValue === undefined) {
        copy[key as any] = defaultValue;
      }
    }
  }

  return copy as T;
};
