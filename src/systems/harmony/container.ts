/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const CONTAINER: ProviderPattern<any, any> = {
  applyOn: (props) => props.kind === 'container',
  order: 0,
  style: {
    display: 'grid',
    flex: '1 1 auto',
    userSelect: 'none',
  },
};
