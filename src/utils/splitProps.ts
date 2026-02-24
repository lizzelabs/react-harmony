/* eslint-disable @typescript-eslint/no-explicit-any */
export const splitProps = <T extends object, K extends keyof T>(
  obj: T,
  knownKeys: K[],
) => {
  return Object.entries(obj).reduce(
    (result, [key, value]) =>
      knownKeys.includes(key as any)
        ? {
            ...result,
            known: {
              ...result.known,
              [key]: value,
            },
          }
        : {
            ...result,
            unknown: {
              ...result.unknown,
              [key]: value,
            },
          },
    { known: {}, unknown: {} },
  );
};
