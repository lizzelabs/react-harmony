/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'vitest';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

declare global {
  namespace Vi {
    interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
  }
}

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<
    typeof expect.stringContaining,
    T
  > {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<
    any,
    any
  > {}
}
