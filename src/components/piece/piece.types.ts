/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ElementEvents,
  HtmlTag,
  NoEventsAndAria,
  PropWithTheme,
  WithStyle,
} from '@/types';
import type {
  AriaAttributes,
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
  RefObject,
} from 'react';

export type PieceAlignmentAndStyleProperties<Theme extends object | undefined> =
  {
    margin?: PropWithTheme<string, Theme>;
    padding?: PropWithTheme<string, Theme>;
    textColor?: PropWithTheme<string, Theme>;
    background?: PropWithTheme<string, Theme>;
    backgroundColor?: PropWithTheme<string, Theme>;
    fontSize?: PropWithTheme<string, Theme>;
    gap?: CSSProperties['gap'];
    direction?: CSSProperties['flexDirection'];
    alignContent?: CSSProperties['alignContent'];
    justifyContent?: CSSProperties['justifyContent'];
    alignItems?: CSSProperties['alignItems'];
    justifyItems?: CSSProperties['justifyItems'];
    height?: CSSProperties['height'];
    width?: CSSProperties['width'];
    display?: CSSProperties['display'];
    contentColumns?: CSSProperties['gridTemplateColumns'] | number;
    contentRows?: CSSProperties['gridTemplateRows'] | number;
    atColumn?: CSSProperties['gridColumn'] | number;
    atRow?: CSSProperties['gridRow'] | number;
    flex?: CSSProperties['flex'];
    withStyle?:
      | PropWithTheme<WithStyle, Theme>[]
      | PropWithTheme<WithStyle[] | WithStyle, Theme>;
  };

export type PieceProperties<
  Theme extends object | undefined = any,
  Element extends HtmlTag = 'div',
  Component extends HTMLElement = HTMLElementTagNameMap[Element],
> = {
  ref?: RefObject<Component | null>;
  as?: Element;
  kind?: string;
  id?: string;
  children?: ReactNode | ReactNode[];
  aria?: AriaAttributes;
  className?: string | undefined;
} & ElementEvents<Element> &
  NoEventsAndAria<ComponentPropsWithoutRef<Element>> &
  PieceAlignmentAndStyleProperties<Theme>;
