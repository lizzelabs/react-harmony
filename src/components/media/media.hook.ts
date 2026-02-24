import { useMemo } from 'react';
import type { MediaProperties, UseMedia } from './media.types';
import type { WithStyle } from '@/types';
import { usePieceProvider } from '../piece-provider';

export const useMedia = <Theme extends object | undefined>({
  keyframes,
  withStyle,
  animateAs,
  query,
  removeFromHtml,
}: MediaProperties<Theme>): UseMedia => {
  const { theme } = usePieceProvider<Theme>();
  const style = useMemo(
    () =>
      ({
        ...keyframes?.animation,
        ...(Array.isArray(withStyle)
          ? withStyle.reduce(
              (css, current) => ({
                ...css,
                ...(typeof current === 'function' ? current(theme) : current),
              }),
              {} as WithStyle,
            )
          : typeof withStyle === 'function'
            ? withStyle(theme)
            : withStyle),
        animation: animateAs,
        [`@media not ${typeof query === 'function' ? query(theme) : query}`]: {
          display: 'none',
          pointerEvents: 'none',
        },
      }) satisfies WithStyle,
    [withStyle, theme, query, keyframes, animateAs],
  );

  const shouldRemoveComponent =
    window.matchMedia(`(${typeof query === 'function' ? query(theme) : query})`)
      .matches === false
      ? removeFromHtml || false
      : false;

  return {
    style,
    shouldRemoveComponent,
  };
};
