import type { UseStyle, UseStyleResult } from '@/types';
import { Styles } from '@/utils';
import { useInsertionEffect, useMemo } from 'react';

export const useStyle = <T extends UseStyle>(
  withStyle: T,
): UseStyleResult<T> => {
  const style = useMemo(() => new Styles(), []);
  const classes = useMemo(() => Object.keys(withStyle), [withStyle]);
  const noGlobalClasses = useMemo(
    () => classes.filter((current) => current.includes('@global') === false),
    [classes],
  );

  useInsertionEffect(
    function apply() {
      for (const className of classes) {
        if (className.includes('@global')) {
          style.apply(withStyle[className]);
        } else {
          style.apply(withStyle[className], className);
        }
      }

      return () => {
        style.delete();
      };
    },
    [classes, style],
  );

  return {
    ...classes.reduce(
      (result, current) => ({ ...result, [current]: current }),
      {},
    ),
    append: (...classes: string[]) => {
      return classes.join(' ');
    },
    appendAll: () => {
      return noGlobalClasses.join(' ');
    },
  } as UseStyleResult<T>;
};
