import { useId, useInsertionEffect, useMemo } from 'react';
import { Styles } from '@/utils';
import { usePieceProvider } from '../piece-provider';
import type { ScreenProperties } from './screen.types';
import type { WithStyle } from '@/types';

export const useScreen = <Theme extends object | undefined>(
  props: ScreenProperties<Theme>,
) => {
  const { theme } = usePieceProvider<Theme>();
  const { id, fontSize, fontFamily, containerId } = props;
  const styles = useMemo(() => new Styles(), []);
  const reactId = useId();

  useInsertionEffect(() => {
    styles.apply({
      'html,body': {
        margin: 0,
        padding: 0,
        border: 0,
        fontSize: fontSize,
        fontWeight: 400,
        fontStyle: 'normal',
        fontFamily: fontFamily,
        fontOpticalSizing: 'auto',
        overflow: props.overflow ? 'auto' : 'hidden',
      },
      [`html,body,#${containerId}`]: {
        height: '100dvh',
        width: '100dvw',
      },
      '*::before, *::after': {
        boxSizing: 'border-box',
      },
      ...(Array.isArray(props.globalStyle)
        ? props.globalStyle.reduce(
            (css, global) => ({
              ...css,
              ...(typeof global === 'function' ? global(theme) : global),
            }),
            {} as WithStyle,
          )
        : typeof props.globalStyle === 'function'
          ? props.globalStyle(theme)
          : props.globalStyle),
    });

    return () => {
      styles.delete();
    };
  }, [styles, theme]);

  return {
    id: id || reactId,
  };
};
