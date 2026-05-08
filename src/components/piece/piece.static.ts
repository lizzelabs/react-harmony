/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PieceProperties } from './piece.types';

export const PIECE_STYLES_PROPERTIES = [
  'flex',
  'atColumn',
  'atRow',
  'contentColumns',
  'contentRows',
  'gridColumn',
  'gridRow',
  'height',
  'width',
  'display',
  'flexDirection',
  'alignContent',
  'justifyContent',
  'alignItems',
  'justifyItems',
  'fontSize',
  'gap',
  'color',
  'background',
  'backgroundColor',
  'margin',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'cursor',
  'containerType',
  'containerName',
  'all',
  'position',
  'transform',
  'top',
  'bottom',
  'left',
  'right',
  'fontWeight',
  'textTransform',
  'textDecoration',
  'justifySelf',
  'alignSelf',
  'touchAction',
  'transition',
  'borderRadius',
  'borderTopLeftRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTopRightRadius',
  'outline',
  'border',
  'borderLeft',
  'borderRight',
  'borderBottom',
  'borderTop',
  'textColor',
  'direction',
  'textShadow',
];

export const PieceInvalidProps = [
  'as',
  'kind',
  'aria',
  'withStyle',
  'additionalProperties',
  ...PIECE_STYLES_PROPERTIES,
] as (keyof PieceProperties<any, any, any>)[];

export const TRANSLATOR_PIECE_STYLE_PROPERTIES_MAP = {
  atColumn: 'gridColumn',
  atRow: 'gridRow',
  contentColumns: 'gridTemplateColumns',
  contentRows: 'gridTemplateRows',
  direction: 'flexDirection',
  textColor: 'color',
  radius: 'borderRadius',
  bottomLeftRadius: 'borderBottomLeftRadius',
  bottomRightRadius: 'borderBottomRightRadius',
  topLeftRadius: 'borderTopLeftRadius',
  topRightRadius: 'borderTopRightRadius',
};

export const LOADER_PIECE_STYLE_PROPERTIES_MAP = {
  contentColumns: <Theme, T>(_: Theme, value: T) =>
    typeof value === 'number' ? `repeat(${value}, 1fr)` : value,
  contentRows: <Theme, T>(_: Theme, value: T) =>
    typeof value === 'number' ? `repeat(${value}, 1fr)` : value,
  atColumn: <Theme, T>(_: Theme, value: T) =>
    typeof value === 'number' ? `${value} / ${value + 1}` : value,
  atRow: <Theme, T>(_: Theme, value: T) =>
    typeof value === 'number' ? `${value} / ${value + 1}` : value,
  all: <T, V>(theme: T, value: V) =>
    typeof value === 'function' ? value(theme) : value,
  undefined: <T, V>(theme: T, value: V) =>
    typeof value === 'function' ? value(theme) : value,
};
