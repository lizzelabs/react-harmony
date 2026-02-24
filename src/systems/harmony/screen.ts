/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const SCREEN: ProviderPattern<any, any> = {
  applyOn: (props) => props.kind === 'screen',
  style: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
};
