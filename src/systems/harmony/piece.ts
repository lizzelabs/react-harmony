/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const PIECE: ProviderPattern<any, any> = {
  applyOn: (props) => props.kind === 'piece',
  style: {
    display: 'flex',
    flex: '1 1 auto',
    userSelect: 'none',
  },
};
