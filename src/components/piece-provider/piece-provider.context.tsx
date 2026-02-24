/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from 'react';
import type { PieceContext, PieceProviderData } from './piece-provider.types';

export const PieceProviderContext = createContext<PieceProviderData<any>>({
  getContext: (_) => ({}) as PieceContext<any, any, any>,
  theme: {} as any,
  updateTheme: (_: any) => {},
} satisfies PieceProviderData<any>);
