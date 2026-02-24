/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const INPUT: ProviderPattern<any, any> = {
  applyOn: (props) => props.kind === 'input',
  style: {
    flex: '1 0 auto',
    width: '100%',
    height: '100%',
    display: 'flex',
    fontSize: '1rem',
    boxShadow: 'none',
    outline: 'none',
    border: '1px solid transparent',
    padding: '10px 0',
    paddingLeft: '10px',
    borderRadius: '5px',
    appearance: 'none',
    '&::-webkit-outer-spin-button': {
      margin: 0,
      appearance: 'none',
    },
    '&::-webkit-inner-spin-button': {
      margin: 0,
      appearance: 'none',
    },
  },
};
