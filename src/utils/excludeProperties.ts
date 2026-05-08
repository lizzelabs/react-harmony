export const excludeProperties = <const T>(obj: T, keys: string[]) => {
  const copy = { ...obj } satisfies T;

  for (const key of keys) {
    delete copy[key];
  }

  return copy;
};
