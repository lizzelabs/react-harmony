import { memo } from 'react';
import { useScreen } from './screen.hook';
import { Piece } from '../piece';
import isEqual from 'lodash/isEqual';
import type { ScreenProperties } from './screen.types';

const InternalScreen = <Theme extends object | undefined>(
  props: ScreenProperties<Theme>,
) => {
  const { id } = useScreen(props);

  return (
    <Piece
      id={id}
      as='main'
      kind='screen'
    >
      {props.children}
    </Piece>
  );
};

export const Screen = memo(InternalScreen, isEqual) as typeof InternalScreen;
