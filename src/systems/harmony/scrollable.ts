/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern, ScrollableProperties } from '@/components';

export const SCROLLABLE: ProviderPattern<any, any> = {
  applyOn: (props) => props.kind === 'scrollable',
  order: 0,
  defaults: {
    primary: 'var(--primary)',
    highlight: 'var(--highlight)',
    size: 'thin',
    behavior: 'instant',
  },
  style: ({
    behavior,
    horizontal,
    vertical,
    scrollSnap,
    size,
    touchAction,
    highlight,
    primary,
    scrollMode,
    theme,
  }: ScrollableProperties<any, any>) => {
    return {
      '--primary': 'rgb(220, 220, 220)',
      '--highlight': 'rgba(25, 25, 25, 0.1)',
      scrollBehavior: behavior,
      overflowX: horizontal ? scrollMode || 'auto' : 'hidden',
      overflowY: vertical ? scrollMode || 'auto' : 'hidden',
      flexDirection: vertical ? 'column' : 'row',
      ...(scrollSnap ? { scrollSnapType: scrollSnap } : {}),
      minHeight: 0,
      boxSizing: 'content-box',
      transition: 'all 0.3s ease-in-out',
      display: 'flex',
      flex: '1 1 100%',
      scrollbarWidth: size,
      WebkitOverflowScrolling: 'touch',
      touchAction: touchAction ? touchAction : vertical ? 'pan-y' : 'pan-x',
      scrollbarColor: `${typeof highlight === 'function' ? highlight(theme) : highlight} ${typeof primary === 'function' ? primary(theme) : primary}`,
      [`@supports not (scrollbar-width: ${size})`]: {
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor:
            typeof primary === 'function' ? primary(theme) : primary,
          border: `1px solid ${typeof primary === 'function' ? primary(theme) : primary}`,
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: `inset 0 0 0 ${size}px ${typeof highlight === 'function' ? highlight(theme) : highlight}`,
          backgroundColor:
            typeof highlight === 'function' ? highlight(theme) : highlight,
        },
      },
    };
  },
};
