import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MediaProperties, UseMedia } from './media.types';
import type { WithStyle } from '@/types';
import { usePieceProvider } from '../piece-provider';

export const useMedia = <Theme extends object | undefined>({
  keyframes,
  withStyle,
  animateAs,
  query,
  removeFromHtml,
  onActivate,
}: MediaProperties<Theme>): UseMedia => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, refresh] = useState(false);
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

  const onMediaChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (event.matches && onActivate) {
        refresh((prev) => !prev);
        onActivate();
      }
    },
    [onActivate],
  );

  const shouldRemoveComponent =
    window.matchMedia(`(${typeof query === 'function' ? query(theme) : query})`)
      .matches === false
      ? removeFromHtml || false
      : false;

  useEffect(
    function onRender() {
      const screen = window.matchMedia(
        `(${typeof query === 'function' ? query(theme) : query})`,
      );

      screen.addEventListener('change', onMediaChange);

      return () => {
        screen.removeEventListener('change', onMediaChange);
      };
    },
    [onMediaChange, theme, query],
  );

  return {
    style,
    shouldRemoveComponent,
  };
};
