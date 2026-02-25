import { memo } from 'react';
import { useText } from './text.hook';
import type { TextTag } from '@/types';
import type { TextProperties } from './text.types';
import { withPieceAsContainer } from '@/hocs';
import isEqual from 'lodash/isEqual';

export const InternalText = <
  T extends object | undefined,
  Element extends TextTag,
  Component extends HTMLElement = HTMLElementTagNameMap[Element],
>(
  props: TextProperties<T, Element, Component>,
) => {
  return useText<T, Element, Component>(props).element;
};

export const Text = memo(
  withPieceAsContainer(InternalText, {
    withStyle: { display: 'flex', flex: '1 1 auto' },
  }) as typeof InternalText,
  isEqual,
) as typeof InternalText;
