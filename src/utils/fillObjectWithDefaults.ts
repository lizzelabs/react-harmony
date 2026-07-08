/* eslint-disable @typescript-eslint/no-explicit-any */
/* oxlint-disable no-unsafe-member-access */
/* oxlint-disable no-unsafe-assignment */

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
        !Array.isArray(targetValue) &&
        typeof defaultValue === 'object' &&
        !Array.isArray(defaultValue)
      ) {
        copy[key as any] = { ...defaultValue, ...targetValue };
      } else if (targetValue === undefined) {
        copy[key as any] = defaultValue;
      }
    }
  }

  return copy;
};
