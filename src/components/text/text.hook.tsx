import type { TextTag } from '@/types';
import { usePiece } from '../piece/piece.hook';
import type { TextProperties } from './text.types';
import type { PieceProperties } from '../piece';

export const useText = <
  T extends object | undefined,
  Element extends TextTag,
  Component extends HTMLElement = HTMLElementTagNameMap[Element],
>(
  props: TextProperties<T, Element, Component>,
) => {
  const { as, children, kind, ...piece } = props;

  return usePiece<T, Element, Component>({
    ...piece,
    kind: kind || 'text',
    as,
    children,
  } as PieceProperties<T, Element, Component>);
};
