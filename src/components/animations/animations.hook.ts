import { useInsertionEffect, useMemo } from 'react';
import type { AnimationsProperties } from './animations.types';
import { Styles } from '@/utils';
import { usePieceProvider } from '../piece-provider';
import type { WithStyle } from '@/types';

export const useAnimations = <Theme extends object | undefined>(
  props: AnimationsProperties<Theme>,
) => {
  const { theme } = usePieceProvider<Theme>();
  const styles = useMemo(() => new Styles(), []);

  useInsertionEffect(() => {
    styles.apply(
      Array.isArray(props.value)
        ? props.value.reduce(
            (css, current) => ({
              ...css,
              ...(typeof current === 'function'
                ? current(theme).animation
                : current.animation),
            }),
            {} as WithStyle,
          )
        : typeof props.value === 'function'
          ? props.value(theme).animation
          : props.value.animation,
    );

    return () => {
      styles.delete();
    };
  }, [props.value, theme]);

  return {};
};
