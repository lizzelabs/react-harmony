import type { CSSProperties } from 'react';

export type CssClass = {
  selector: string;
  styles: CSSProperties;
  media?: string;
};
