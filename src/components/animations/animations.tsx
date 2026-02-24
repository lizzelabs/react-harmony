import { memo, type ReactNode } from 'react';
import type { AnimationsProperties } from './animations.types';
import { useAnimations } from './animations.hook';
import isEqual from 'lodash/isEqual';

const InternalAnimations = <Theme extends object | undefined>(
  props: AnimationsProperties<Theme>,
): ReactNode => {
  useAnimations(props);

  return props.children;
};

export const Animations = memo(
  InternalAnimations,
  isEqual,
) as typeof InternalAnimations;
