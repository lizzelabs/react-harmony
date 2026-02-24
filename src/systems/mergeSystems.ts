/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const mergeSystems = (
  system: ProviderPattern<any, any, any>[],
  ...patterns: ProviderPattern<any, any, any>[]
): ProviderPattern<any, any, any>[] => {
  return [...system, ...patterns];
};
