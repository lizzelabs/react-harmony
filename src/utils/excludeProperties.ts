export const excludeProperties = <T>(obj: T, keys: (keyof T)[]) => {
  const copy = { ...obj } satisfies T;

  for (const key of keys) {
    delete copy[key];
  }

  return copy;
};
