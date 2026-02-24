export const appendClasses = (
  ...classes: (string | undefined)[]
): string | undefined => {
  return classes.join(' ').trim();
};
