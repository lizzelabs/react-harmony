/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const SCROLLABLE: ProviderPattern<any, any> = {
  applyOn: (props) => props.kind === 'scrollable',
  defaults: {
    primary: 'var(--color)',
    highlight: 'var(--highlight)',
    size: 'thin',
    behavior: 'instant',
  },
  style: {
    '--color': 'rgb(220, 220, 220)',
    '--highlight': 'rgba(25, 25, 25, 0.1)',
  },
};
