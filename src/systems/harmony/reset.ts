/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const RESET: ProviderPattern<any, any> = {
  applyOn: 'all',
  style: {
    margin: 0,
    padding: 0,
    border: 0,
    fontSize: '100%',
    fontWeight: '400',
    fontStyle: 'normal',
    boxSizing: 'border-box',
    fontOpticalSizing: 'auto',
    listStyle: 'none',
    quotes: 'none',
    userSelect: 'none',
    overflow: 'hidden',
  },
};
