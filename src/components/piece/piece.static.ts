/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  PieceAlignmentAndStyleProperties,
  PieceAlignmentAndStylePropertiesRaw,
  PieceProperties,
} from './piece.types';

export const PieceInvalidProps = [
  'as',
  'kind',
  'aria',
  'withStyle',
  'direction',
  'alignContent',
  'justifyContent',
  'justifyItems',
  'alignItems',
  'display',
  'contentColumns',
  'contentRows',
  'atColumn',
  'atRow',
  'fontSize',
  'flex',
  'gap',
  'textColor',
  'backgroundColor',
  'background',
  'margin',
  'padding',
  'containerType',
  'containerName',
  'position',
  'cursor',
  'all',
  'transform',
  'top',
  'left',
  'bottom',
  'right',
  'fontWeight',
  'textTransform',
  'textDecoration',
  'justifySelf',
  'alignSelf',
] as (keyof PieceProperties<any, any, any>)[];

export const getPieceAlignmentAndStylePropertiesRaw = <Theme>(
  properties: PieceAlignmentAndStyleProperties<any>,
  theme: Theme,
): PieceAlignmentAndStylePropertiesRaw => {
  return [
    {
      enabled: properties.flex !== undefined,
      name: 'flex',
      value: properties.flex,
    },
    {
      enabled: properties.contentColumns !== undefined,
      name: 'gridTemplateColumns',
      value:
        typeof properties.contentColumns === 'number'
          ? `repeat(${properties.contentColumns}, 1fr)`
          : properties.contentColumns,
    },
    {
      enabled: properties.contentRows !== undefined,
      name: 'gridTemplateRows',
      value:
        typeof properties.contentRows === 'number'
          ? `repeat(${properties.contentRows}, 1fr)`
          : properties.contentRows,
    },
    {
      enabled: properties.atColumn !== undefined,
      name: 'gridColumn',
      value:
        typeof properties.atColumn === 'number'
          ? `${properties.atColumn} / ${properties.atColumn + 1}`
          : properties.atColumn,
    },
    {
      enabled: properties.atRow !== undefined,
      name: 'gridRow',
      value:
        typeof properties.atRow === 'number'
          ? `${properties.atRow} / ${properties.atRow + 1}`
          : properties.atRow,
    },
    {
      enabled: properties.height !== undefined,
      name: 'height',
      value: properties.height,
    },
    {
      enabled: properties.width !== undefined,
      name: 'width',
      value: properties.width,
    },
    {
      enabled: properties.display !== undefined,
      name: 'display',
      value: properties.display,
    },
    {
      enabled: properties.direction !== undefined,
      name: 'flexDirection',
      value: properties.direction,
    },
    {
      enabled: properties.alignContent !== undefined,
      name: 'alignContent',
      value: properties.alignContent,
    },
    {
      enabled: properties.justifyContent !== undefined,
      name: 'justifyContent',
      value: properties.justifyContent,
    },
    {
      enabled: properties.alignItems !== undefined,
      name: 'alignItems',
      value: properties.alignItems,
    },
    {
      enabled: properties.justifyItems !== undefined,
      name: 'justifyItems',
      value: properties.justifyItems,
    },
    {
      enabled: properties.fontSize !== undefined,
      name: 'fontSize',
      value:
        typeof properties.fontSize === 'function'
          ? properties.fontSize(theme)
          : properties.fontSize,
    },
    {
      enabled: properties.gap !== undefined,
      name: 'gap',
      value: properties.gap,
    },
    {
      enabled: properties.textColor !== undefined,
      name: 'color',
      value:
        typeof properties.textColor === 'function'
          ? properties.textColor(theme)
          : properties.textColor,
    },
    {
      enabled: properties.background !== undefined,
      name: 'background',
      value:
        typeof properties.background === 'function'
          ? properties.background(theme)
          : properties.background,
    },
    {
      enabled: properties.backgroundColor !== undefined,
      name: 'backgroundColor',
      value:
        typeof properties.backgroundColor === 'function'
          ? properties.backgroundColor(theme)
          : properties.backgroundColor,
    },
    {
      enabled: properties.margin !== undefined,
      name: 'margin',
      value:
        typeof properties.margin === 'function'
          ? properties.margin(theme)
          : properties.margin,
    },
    {
      enabled: properties.padding !== undefined,
      name: 'padding',
      value:
        typeof properties.padding === 'function'
          ? properties.padding(theme)
          : properties.padding,
    },
    {
      enabled: properties.cursor !== undefined,
      name: 'cursor',
      value: properties.cursor,
    },
    {
      enabled: properties.containerType !== undefined,
      name: 'containerType',
      value: properties.containerType,
    },
    {
      enabled: properties.containerName !== undefined,
      name: 'containerName',
      value: properties.containerName,
    },
    {
      enabled: properties.all !== undefined,
      name: 'all',
      value: properties.all,
    },
    {
      enabled: properties.position !== undefined,
      name: 'position',
      value: properties.position,
    },
    {
      enabled: properties.transform !== undefined,
      name: 'transform',
      value: properties.transform,
    },
    {
      enabled: properties.top !== undefined,
      name: 'top',
      value: properties.top,
    },
    {
      enabled: properties.bottom !== undefined,
      name: 'bottom',
      value: properties.bottom,
    },
    {
      enabled: properties.left !== undefined,
      name: 'left',
      value: properties.left,
    },
    {
      enabled: properties.right !== undefined,
      name: 'right',
      value: properties.right,
    },
    {
      enabled: properties.fontWeight !== undefined,
      name: 'fontWeight',
      value: properties.fontWeight,
    },
    {
      enabled: properties.textTransform !== undefined,
      name: 'textTransform',
      value: properties.textTransform,
    },
    {
      enabled: properties.textDecoration !== undefined,
      name: 'textDecoration',
      value: properties.textDecoration,
    },
    {
      enabled: properties.justifySelf !== undefined,
      name: 'justifySelf',
      value: properties.justifySelf,
    },
    {
      enabled: properties.alignSelf !== undefined,
      name: 'alignSelf',
      value: properties.alignSelf,
    },
  ];
};
