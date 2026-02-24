/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useMemo, useState } from 'react';
import { PieceProviderContext } from './piece-provider.context';
import type { HtmlTag, WithStyle } from '@/types';
import type {
  PieceContext,
  PieceProviderData,
  PieceProviderProperties,
} from './piece-provider.types';
import type { PieceProperties } from '../piece/piece.types';
import isEqual from 'lodash/isEqual';

const InternalPieceProvider = <Theme extends object>(
  props: PieceProviderProperties<Theme>,
) => {
  const [theme, setTheme] = useState<Theme>(props.theme || ({} as Theme));

  const updateTheme = useCallback((current: Theme) => {
    setTheme((prev) => (isEqual(prev, current) ? prev : current));
  }, []);

  const getContext = useCallback(
    <
      Element extends HtmlTag,
      Component extends HTMLElement,
      Piece extends PieceProperties<Theme, Element, Component>,
    >(
      properties: Piece,
    ): PieceContext<Theme, Element, Component> => {
      const patterns = props.patterns.filter((pattern) =>
        typeof pattern.applyOn === 'function'
          ? pattern.applyOn(properties as any, theme)
          : pattern.applyOn === properties.as || pattern.applyOn === 'all',
      );

      const defaults = patterns.reduce(
        (result, pattern) => ({
          ...result,
          ...(typeof pattern.defaults === 'function'
            ? pattern.defaults(theme)
            : pattern.defaults || {}),
        }),
        {} as PieceProperties<Theme, Element, Component>,
      );

      const style = patterns.reduce(
        (css, pattern) => ({
          ...css,
          ...(typeof pattern.style === 'function'
            ? pattern.style(theme)
            : pattern.style),
        }),
        {} as WithStyle,
      );

      return {
        className: `${properties.kind}-${properties.id}-context`,
        defaults,
        style,
      } satisfies PieceContext<Theme, Element, Component>;
    },
    [props.patterns, theme],
  );

  const value = useMemo(
    () =>
      ({
        theme,
        updateTheme,
        getContext,
      }) satisfies PieceProviderData<Theme>,
    [theme, getContext, updateTheme],
  );

  return (
    <PieceProviderContext.Provider value={value}>
      {props.children}
    </PieceProviderContext.Provider>
  );
};

export const PieceProvider = memo(
  InternalPieceProvider,
  isEqual,
) as typeof InternalPieceProvider;
