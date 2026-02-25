/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PieceProperties } from './piece.types';
import { PieceInvalidProps } from './piece.static';
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
    const positionMap = [
      {
        enabled: props.flex !== undefined,
        name: 'flex',
        value: props.flex,
      },
      {
        enabled: props.contentColumns !== undefined,
        name: 'gridTemplateColumns',
        value:
          typeof props.contentColumns === 'number'
            ? `repeat(${props.contentColumns}, 1fr)`
            : props.contentColumns,
      },
      {
        enabled: props.contentRows !== undefined,
        name: 'gridTemplateRows',
        value:
          typeof props.contentRows === 'number'
            ? `repeat(${props.contentRows}, 1fr)`
            : props.contentRows,
      },
      {
        enabled: props.atColumn !== undefined,
        name: 'gridColumn',
        value:
          typeof props.atColumn === 'number'
            ? `${props.atColumn} / ${props.atColumn + 1}`
            : props.atColumn,
      },
      {
        enabled: props.atRow !== undefined,
        name: 'gridRow',
        value:
          typeof props.atRow === 'number'
            ? `${props.atRow} / ${props.atRow + 1}`
            : props.atRow,
      },
      {
        enabled: props.height !== undefined,
        name: 'height',
        value: props.height,
      },
      {
        enabled: props.width !== undefined,
        name: 'width',
        value: props.width,
      },
      {
        enabled: props.display !== undefined,
        name: 'display',
        value: props.display,
      },
      {
        enabled: props.direction !== undefined,
        name: 'flexDirection',
        value: props.direction,
      },
      {
        enabled: props.alignContent !== undefined,
        name: 'alignContent',
        value: props.alignContent,
      },
      {
        enabled: props.justifyContent !== undefined,
        name: 'justifyContent',
        value: props.justifyContent,
      },
      {
        enabled: props.alignItems !== undefined,
        name: 'alignItems',
        value: props.alignItems,
      },
      {
        enabled: props.justifyItems !== undefined,
        name: 'justifyItems',
        value: props.justifyItems,
      },
      {
        enabled: props.fontSize !== undefined,
        name: 'fontSize',
        value:
          typeof props.fontSize === 'function'
            ? props.fontSize(theme)
            : props.fontSize,
      },
      {
        enabled: props.gap !== undefined,
        name: 'gap',
        value: props.gap,
      },
      {
        enabled: props.textColor !== undefined,
        name: 'color',
        value:
          typeof props.textColor === 'function'
            ? props.textColor(theme)
            : props.textColor,
      },
      {
        enabled: props.background !== undefined,
        name: 'background',
        value:
          typeof props.background === 'function'
            ? props.background(theme)
            : props.background,
      },
      {
        enabled: props.backgroundColor !== undefined,
        name: 'backgroundColor',
        value:
          typeof props.backgroundColor === 'function'
            ? props.backgroundColor(theme)
            : props.backgroundColor,
      },
      {
        enabled: props.margin !== undefined,
        name: 'margin',
        value:
          typeof props.margin === 'function'
            ? props.margin(theme)
            : props.margin,
      },
      {
        enabled: props.padding !== undefined,
        name: 'padding',
        value:
          typeof props.padding === 'function'
            ? props.padding(theme)
            : props.padding,
      },
      {
        enabled: props.cursor !== undefined,
        name: 'cursor',
        value: props.cursor,
      },
      {
        enabled: props.containerType !== undefined,
        name: 'containerType',
        value: props.containerType,
      },
      {
        enabled: props.containerName !== undefined,
        name: 'containerName',
        value: props.containerName,
      },
    ];

    const hasPosition = positionMap.some((position) => position.enabled);
    const positionCss = positionMap.reduce(
      (css, current) => ({
        ...css,
        ...(current.enabled
          ? {
              [current.name]: current.value,
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
