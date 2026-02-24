import { useContext } from 'react';
import { PieceProviderContext } from './piece-provider.context';
import type { PieceProviderData } from './piece-provider.types';

export const usePieceProvider = <T extends object | undefined>() => {
  const context = useContext<PieceProviderData<T>>(PieceProviderContext);

  if (!context) {
    throw new Error('You should initialize a PieceProvider!');
  }

  return context;
};
