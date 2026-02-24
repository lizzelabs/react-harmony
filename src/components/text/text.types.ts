import type { TextTag } from '@/types';
import type { PieceProperties } from '../piece';

export type TextProperties<
  Theme extends object | undefined,
  Element extends TextTag,
  Component extends HTMLElement = HTMLElementTagNameMap[Element],
> = {} & PieceProperties<Theme, Element, Component>;
