/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const MEDIA: ProviderPattern<any, any> = {
  applyOn: (props) => props.kind === 'media',
  style: {
    display: 'flex',
    flex: 1,
    userSelect: 'none',
  },
};
