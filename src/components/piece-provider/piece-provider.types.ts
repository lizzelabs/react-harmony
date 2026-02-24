/* eslint-disable @typescript-eslint/no-explicit-any */

import type { HtmlTag, PropWithTheme, WithStyle } from '@/types';
import type { ReactNode } from 'react';
import type { PieceProperties } from '../piece/piece.types';

export type ApplyFn = <
  T extends object | undefined,
  Element extends HtmlTag,
  Component extends HTMLElement,
  Piece extends PieceProperties<T, Element, Component>,
>(
  props: Piece,
  theme: T,
) => boolean;

export type ProviderPattern<
  T extends object | undefined,
  Element extends HtmlTag,
  Component extends HTMLElement = HTMLElementTagNameMap[Element],
> = {
  applyOn: HtmlTag | 'all' | ApplyFn;
  defaults?: PropWithTheme<PieceProperties<T, Element, Component>, T>;
  style?: PropWithTheme<WithStyle, T>;
};

export interface PieceProviderProperties<T extends object | undefined> {
  children?: ReactNode;
  patterns: ProviderPattern<T, any, any>[];
  theme?: T;
}

export type PieceContext<
  T extends object | undefined,
  Element extends HtmlTag,
  Component extends HTMLElement,
> = {
  className: string;
  style: WithStyle;
  defaults: PieceProperties<T, Element, Component>;
};

export interface PieceProviderData<Theme extends object | undefined> {
  getContext: <
    Element extends HtmlTag,
    Component extends HTMLElement,
    Piece extends PieceProperties<Theme, Element, Component>,
  >(
    properties: Piece,
  ) => PieceContext<Theme, Element, Component>;
  theme: Theme | undefined;
  updateTheme: (theme: Theme) => void;
}
