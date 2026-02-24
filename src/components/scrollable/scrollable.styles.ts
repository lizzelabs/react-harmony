/* eslint-disable @typescript-eslint/no-explicit-any */
import type { WithStyle } from '@/types';

export const ScrollbarRoot = (
  size: any,
  behavior: any,
  color: string,
  highlight: string,
  horizontal: boolean,
  vertical: boolean,
  scrollSnap: any,
) =>
  ({
    scrollBehavior: behavior,
    overflowX: horizontal ? 'auto' : 'hidden',
    overflowY: vertical ? 'auto' : 'hidden',
    flexDirection: vertical ? 'column' : 'row',
    ...(scrollSnap ? { scrollSnapType: scrollSnap } : {}),
    minHeight: 0,
    boxSizing: 'content-box',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    flex: '1 1 100%',
    scrollbarWidth: size,
    scrollbarColor: `${highlight} ${color}`,
    [`@supports not (scrollbar-width: ${size})`]: {
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: color,
        border: `1px solid ${color}`,
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: `inset 0 0 0 ${size}px ${highlight}`,
        backgroundColor: highlight,
      },
    },
  }) satisfies WithStyle;
