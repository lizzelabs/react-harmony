import { memo, type ReactNode } from 'react';
import type { MediaProperties } from './media.types';
import { Piece } from '../piece';
import { useMedia } from './media.hook';
import isEqual from 'lodash/isEqual';

const InternalMedia = <Theme extends object | undefined>(
  props: MediaProperties<Theme>,
): ReactNode => {
  const { style, shouldRemoveComponent } = useMedia(props);

  return shouldRemoveComponent === false ? (
    <Piece
      kind='media'
      as='section'
      withStyle={style}
    >
      {props.children}
    </Piece>
  ) : null;
};

export const Media = memo(InternalMedia, isEqual) as typeof InternalMedia;
