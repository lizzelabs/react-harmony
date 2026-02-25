/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const PIECE: ProviderPattern<any, any> = {
  applyOn: (props) => props.kind === 'alignment-container',
  style: {
    display: 'flex',
    flex: '1 1 auto',
  },
};
