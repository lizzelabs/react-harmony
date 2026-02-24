import { useScrollable } from './scrollable.hook';
import { memo, type ReactNode } from 'react';
import type { HtmlTag } from '@/types';
import type { ScrollableProperties } from './scrollable.types';
import isEqual from 'lodash/isEqual';

const InternalScrollable = <
  T extends object | undefined,
  Element extends HtmlTag,
  Component extends HTMLElement = HTMLElementTagNameMap[Element],
>(
  props: ScrollableProperties<T, Element, Component>,
): ReactNode => {
  return useScrollable(props).element;
};

export const Scrollable = memo(
  InternalScrollable,
  isEqual,
) as typeof InternalScrollable;
