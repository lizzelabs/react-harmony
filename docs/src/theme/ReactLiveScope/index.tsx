import React from 'react';
import {
  Piece,
  PieceProvider,
  Animations,
  Scrollable,
  Text,
  Media,
} from '@lizzelabs/react-harmony';

const ReactLiveScope: unknown = {
  React,
  ...React,
  Piece,
  PieceProvider,
  Animations,
  Scrollable,
  Text,
  Media,
};

export default ReactLiveScope;
