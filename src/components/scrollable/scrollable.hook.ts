/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HtmlTag } from '@/types';
import type { ScrollableProperties } from './scrollable.types';
import { useMemo, useRef } from 'react';
import { fillObjectWithDefaults } from '@/utils';
import { usePieceProvider } from '../piece-provider';
import { usePiece, type PieceProperties } from '../piece';
import { ScrollbarRoot } from './scrollable.styles';

export const useScrollable = <
  Theme extends object | undefined,
  Element extends HtmlTag,
  Component extends HTMLElement = HTMLElementTagNameMap[Element],
>(
  props: ScrollableProperties<Theme, Element, Component>,
) => {
  const { theme, getContext } = usePieceProvider<Theme>();
  const ref = useRef<HTMLDivElement | null>(null);
  const context = useMemo(() => getContext(props as any), [props, getContext]);

  const {
    scrollSnap,
    primary,
    highlight,
    horizontal,
    vertical,
    behavior,
    withStyle,
    size,
    touchAction,
    ...piece
  } = fillObjectWithDefaults(props, context.defaults);

  const scrollStyle = useMemo(
    () =>
      Array.isArray(withStyle)
        ? withStyle.reduce(
            (css, current) => ({
              ...css,
              ...(typeof current === 'function' ? current(theme) : current),
            }),
            ScrollbarRoot(
              size,
              behavior,
              typeof primary === 'function'
                ? primary(theme)
                : (primary as string),
              typeof highlight === 'function'
                ? highlight(theme)
                : (highlight as string),
              horizontal as boolean,
              vertical as boolean,
              scrollSnap,
              touchAction,
            ),
          )
        : {
            ...(withStyle !== undefined && typeof withStyle === 'function'
              ? withStyle(theme)
              : withStyle),
            ...ScrollbarRoot(
              size,
              behavior,
              typeof primary === 'function'
                ? primary(theme)
                : (primary as string),
              typeof highlight === 'function'
                ? highlight(theme)
                : (highlight as string),
              horizontal as boolean,
              vertical as boolean,
              scrollSnap,
              touchAction,
            ),
          },
    [
      withStyle,
      theme,
      size,
      behavior,
      primary,
      highlight,
      horizontal,
      vertical,
      scrollSnap,
      touchAction,
    ],
  );

  return usePiece<Theme, Element, Component>({
    ...piece,
    ref,
    kind: props.kind || 'scrollable',
    withStyle: scrollStyle,
  } as PieceProperties<Theme, Element, Component>);
};
