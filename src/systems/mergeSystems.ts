/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProviderPattern } from '@/components';

export const mergeSystems = <Theme extends object | undefined>(
  system: ProviderPattern<Theme, any, any>[],
  ...patterns: ProviderPattern<Theme, any, any>[]
): ProviderPattern<Theme, any, any>[] => {
  return [...system, ...patterns];
};
