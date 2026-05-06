/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PieceProperties } from './piece.types';
import {
  PieceInvalidProps,
  PIECE_STYLES_PROPERTIES,
  TRANSLATOR_PIECE_STYLE_PROPERTIES_MAP,
  LOADER_PIECE_STYLE_PROPERTIES_MAP,
} from './piece.static';
import type { HtmlTag, PropWithTheme, WithStyle } from '@/types';

export const PieceUtils = {
  pickComponentProps: <
    Theme extends object | undefined,
    Element extends HtmlTag,
    Component extends HTMLElement,
  >(
    props: PieceProperties<Theme, Element, Component>,
  ): PieceProperties<Theme, Element, Component> => {
    const toDelete = [
      ...PieceInvalidProps,
      ...(props.additionalProperties || []),
    ];

    const sanitized = Object.keys(props).reduce(
      (result, current) =>
        toDelete.includes(current)
          ? result
          : { ...result, [current]: props[current] },
      {} as PieceProperties<Theme, Element, Component>,
    );

    return {
      ...sanitized,
      ...props.aria,
    };
  },
  pickComponentStyle: <Theme extends object | undefined>(
    theme: Theme | undefined,
    style?:
      | PropWithTheme<WithStyle, Theme>[]
      | PropWithTheme<WithStyle[] | WithStyle, Theme>,
  ): WithStyle | undefined => {
    if (!style) {
      return undefined;
    }

    if (typeof style === 'function') {
      return PieceUtils.pickComponentStyle(theme, style(theme));
    }

    return Array.isArray(style)
      ? style.reduce(
          (css, current) => ({
            ...css,
            ...(typeof current === 'function' ? current(theme) : current),
          }),
          {} as any,
        )
      : style;
  },
  loadProperties: <
    Theme extends object | undefined,
    Element extends HtmlTag,
    Component extends HTMLElement,
  >(
    theme: Theme,
    props: PieceProperties<Theme, Element, Component>,
    ...appendTo: any[]
  ): WithStyle | undefined => {
    const styles = PIECE_STYLES_PROPERTIES.reduce(
      (result, current) =>
        props[current] === undefined
          ? result
          : {
              ...result,
              [TRANSLATOR_PIECE_STYLE_PROPERTIES_MAP[current] !== undefined
                ? TRANSLATOR_PIECE_STYLE_PROPERTIES_MAP[current]
                : current]:
                LOADER_PIECE_STYLE_PROPERTIES_MAP[current] !== undefined
                  ? LOADER_PIECE_STYLE_PROPERTIES_MAP[current](
                      theme,
                      props[current],
                    )
                  : LOADER_PIECE_STYLE_PROPERTIES_MAP.all(
                      theme,
                      props[current],
                    ),
            },
      {},
    );

    const withStyle = (appendTo || []).reduce(
      (css, current) => ({
        ...css,
        ...current,
      }),
      {} as WithStyle,
    );

    const objectIsPresent =
      Object.keys(withStyle).length > 0 || Object.keys(styles).length > 0;

    return objectIsPresent
      ? {
          ...withStyle,
          ...styles,
        }
      : undefined;
  },
};
