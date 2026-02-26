/* eslint-disable @typescript-eslint/no-explicit-any */
import { Piece, type PieceAlignmentAndStyleProperties } from '@/components';
import { splitProps } from '@/utils';
import type { ComponentType, ReactNode, RefObject } from 'react';

export function withPieceAsContainer<
  Props,
  Theme extends object | undefined,
  InjectProps extends boolean,
>(
  Component: ComponentType<
    InjectProps extends true
      ? Props & PieceAlignmentAndStyleProperties<Theme>
      : Props
  >,
  defaultContainerProps: PieceAlignmentAndStyleProperties<Theme> & {
    injectContainerProps?: InjectProps;
  } = {} as PieceAlignmentAndStyleProperties<Theme> & {
    injectContainerProps?: InjectProps;
  },
): ComponentType<
  Props &
    PieceAlignmentAndStyleProperties<Theme> & {
      containerRef?: RefObject<HTMLElement>;
    }
> {
  return function Container(
    properties: Props & PieceAlignmentAndStyleProperties<Theme>,
  ) {
    const knownProperties = [
      'containerRef',
      'direction',
      'alignContent',
      'justifyContent',
      'alignItems',
      'justifytItems',
      'display',
      'contentColumns',
      'contentRows',
      'atColumn',
      'atRow',
      'flex',
      'height',
      'width',
      'margin',
      'padding',
      'cursor',
      'withStyle',
    ];

    const { known: piece, unknown: props } = splitProps(
      properties,
      knownProperties as any,
    );

    const { injectContainerProps, ...otherDefaults } = defaultContainerProps;

    const pieceProperties = {
      ...otherDefaults,
      ...piece,
    };

    return (
      <Piece
        kind='aligment-container'
        display='flex'
        flex={pieceProperties.flex || '1 1 auto'}
        {...(pieceProperties as any)}
      >
        <Component
          {...(props as any)}
          {...(injectContainerProps ? otherDefaults : {})}
        >
          {(props as any)?.children as ReactNode}
        </Component>
      </Piece>
    );
  };
}
