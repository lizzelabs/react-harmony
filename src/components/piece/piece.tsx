import { memo } from 'react';
import { usePiece } from './piece.hook';
import type { ReactNode } from 'react';
import type { HtmlTag } from '@/types';
import type { PieceProperties } from './piece.types';
import isEqual from 'lodash/isEqual';

function InternalPiece<
  const Theme extends object | undefined = object,
  const Element extends HtmlTag = 'div',
  const Component extends HTMLElement = HTMLElementTagNameMap[Element],
>(props: PieceProperties<Theme, Element, Component>): ReactNode {
  return usePiece<Theme, Element, Component>(props).element;
}

export const Piece = memo(InternalPiece, isEqual) as typeof InternalPiece;
