import type { JSX, ReactNode } from 'react';
import type { PropWithTheme, WithStyle } from '@/types';

export interface ProviderArg<Props> {
  Provider: (props: Props) => JSX.Element;
  props: Props;
}

export type ScreenProperties<T extends object | undefined> = {
  id?: string;
  containerId: string;
  fontFamily?: string;
  fontSize: string;
  overflow?: boolean;
  globalStyle?: PropWithTheme<WithStyle, T> | PropWithTheme<WithStyle, T>[];
  children: ReactNode;
};
