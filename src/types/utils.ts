/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties } from 'react';
import type {
  HtmlTag,
  IntrinsicElement,
  IntrinsicElementFromHTML,
} from './html';

export type PartialRequired<T, Key extends keyof T> = T &
  Required<Pick<T, Key>>;

export type ElementEvents<
  T extends HtmlTag,
  I extends IntrinsicElement = IntrinsicElementFromHTML<T>,
> = Pick<
  React.ComponentPropsWithoutRef<I>,
  {
    [K in keyof React.ComponentPropsWithoutRef<I>]: K extends `on${string}`
      ? K
      : never;
  }[keyof React.ComponentPropsWithoutRef<I>]
>;

export type NoEventsAndAria<T> = Omit<
  T,
  (keyof T & `on${string}`) | `aria${string}`
>;

export type NoAria<T> = Omit<T, keyof T & `aria${string}`>;

export type PropWithTheme<Obj, T extends any | undefined> =
  | Obj
  | ((theme?: T) => Obj);

export type WithStyle =
  | CSSProperties
  | {
      [key in `&${string}`]?: CSSProperties;
    }
  | {
      [key in `@${string}`]?: CSSProperties;
    }
  | {
      [key in string]?: CSSProperties;
    }
  | {
      [key in `@${string}`]?: WithStyle;
    }
  | {
      [key in `--${string}`]?: string | number;
    };
