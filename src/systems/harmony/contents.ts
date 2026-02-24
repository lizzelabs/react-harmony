/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const CONTENTS: ProviderPattern<any, any> = {
  applyOn: (props) => props.kind === 'contents',
  style: {
    display: 'contents',
    background: 'transparent',
    position: 'relative',
  },
};
