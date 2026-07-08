import type { HtmlTag } from '@/types';
import type { ScrollableProperties } from './scrollable.types';
import { useRef } from 'react';
import { usePiece } from '../piece';

export const useScrollable = <
  Theme extends object | undefined,
  Element extends HtmlTag,
  Component extends HTMLElement = HTMLElementTagNameMap[Element],
>(
  props: ScrollableProperties<Theme, Element, Component>,
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return usePiece<Theme, Element, Component>({
    ...props,
    ref,
    kind: props.kind || 'scrollable',
    additionalProperties: [
      'horizontal',
      'vertical',
      'size',
      'behavior',
      'scrollSnap',
      'primary',
      'highlight',
    ],
  });
};
