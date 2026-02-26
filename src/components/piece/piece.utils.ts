/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PieceProperties } from './piece.types';
import {
  getPieceAlignmentAndStylePropertiesRaw,
  PieceInvalidProps,
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
    const copy = { ...props };

    for (const prop of PieceInvalidProps) {
      delete copy[prop as keyof typeof copy];
    }

    return {
      ...copy,
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
  loadPositionProps: <
    Theme extends object | undefined,
    Element extends HtmlTag,
    Component extends HTMLElement,
  >(
    props: PieceProperties<Theme, Element, Component>,
    style: WithStyle | undefined,
    theme: Theme,
  ): WithStyle | undefined => {
    const positionMap = getPieceAlignmentAndStylePropertiesRaw(props, theme);
    const hasPosition = positionMap.some((position) => position!.enabled);
    const positionCss = positionMap.reduce(
      (css, current) => ({
        ...css,
        ...(current!.enabled
          ? {
              [current!.name]: current!.value,
            }
          : {}),
      }),
      {} as WithStyle,
    );

    return !style && hasPosition === false
      ? undefined
      : {
          ...style,
          ...positionCss,
        };
  },
};
