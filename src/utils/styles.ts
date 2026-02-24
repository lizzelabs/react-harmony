/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CssClass, WithStyle } from '@/types';
import type { CSSProperties } from 'react';
import { excludeProperties } from './excludeProperties';
import { compile, serialize, middleware, prefixer, stringify } from 'stylis';

export class Styles {
  public static PSEUDO_KEY = '&';
  public static MEDIA_KEY = '@';

  private _sheet?: CSSStyleSheet;
  private css: string[] = [];

  constructor() {
    this._sheet = Styles.initialize();
  }

  private static initialize(): CSSStyleSheet {
    const style = document.createElement('style');
    document.head.appendChild(style);

    if (!style.sheet) {
      throw new Error('It could not get sheet!');
    }

    return style.sheet;
  }

  translateObjecToCss(selector: string, styles?: CSSProperties): string {
    if (!styles) {
      return '';
    }

    return `${selector}{${Object.entries(styles)
      .map(([key, value]) =>
        value !== undefined
          ? `${key.replace(/[A-Z]/g, (r) => '-' + r.toLowerCase())}:${value}; `
          : ``,
      )
      .join('')}}`;
  }

  translateAnimationToCss(style: WithStyle): string {
    return Object.keys(style)
      .map(
        (keyframe) =>
          `${keyframe} { ${Object.entries(style[keyframe])
            .map(
              ([step, stepValue]) =>
                `${step} { ${Object.entries(stepValue as any)
                  .map(([prop, value]) => `${prop}:${value};`)
                  .join('')} } `,
            )
            .join('')} }`,
      )
      .join('');
  }

  splitRootAndPseudo(
    obj: WithStyle,
    className?: string,
    media?: string,
  ): CssClass[] {
    if (!className) {
      throw new Error('You need to have a className to execute it!');
    }

    const keys = Object.keys(obj);
    const pseudoClasses = keys.filter(
      (key) => key.indexOf(Styles.PSEUDO_KEY) === 0,
    );

    const pseudoCss = pseudoClasses.map(
      (key) =>
        ({
          selector: `.${className}${key.replace(Styles.PSEUDO_KEY, '')}`,
          styles: obj[key] as CSSProperties,
          media,
        }) satisfies CssClass,
    );

    const root = excludeProperties(obj, [
      ...(pseudoClasses as keyof WithStyle),
    ]);

    return Object.keys(root).length > 0
      ? [{ selector: `.${className}`, styles: root, media }, ...pseudoCss]
      : pseudoCss;
  }

  splitWithIntoCssClasses(styles: WithStyle, className?: string) {
    const { root, media, globals, animations } = Object.keys(styles).reduce(
      (result, key) => {
        if (
          key.indexOf(Styles.MEDIA_KEY) === -1 &&
          key.indexOf(Styles.PSEUDO_KEY) === -1 &&
          typeof styles[key] === 'object'
        ) {
          return {
            ...result,
            globals: [
              ...result.globals,
              {
                selector: key,
                styles: styles[key],
              },
            ],
          };
        } else if (
          key.indexOf(Styles.MEDIA_KEY) === 0 &&
          key.toLowerCase().includes('keyframes')
        ) {
          return {
            ...result,
            animations: {
              ...result.animations,
              [key]: styles[key],
            },
          };
        } else if (key.indexOf(Styles.MEDIA_KEY) === 0) {
          return {
            ...result,
            media: {
              ...result.media,
              [key]: [
                ...(result.media[key] || []),
                ...this.splitRootAndPseudo(
                  styles[key] as WithStyle,
                  className,
                  key,
                ),
              ],
            },
          };
        } else {
          return {
            ...result,
            root: {
              ...result.root,
              [key]: styles[key],
            },
          };
        }
      },
      {
        root: {},
        animations: {},
        media: {} as { [key: string]: CssClass[] },
        globals: [] as CssClass[],
      },
    );

    return {
      globals,
      root:
        Object.keys(root).length > 0
          ? this.splitRootAndPseudo(root, className)
          : [],
      media,
      animations,
    };
  }

  apply(styles: WithStyle, className?: string): void {
    const { root, media, globals, animations } = this.splitWithIntoCssClasses(
      styles,
      className,
    );

    const globalCss = globals
      .map((global) => this.translateObjecToCss(global.selector, global.styles))
      .join(' ');

    const mediaCss = Object.keys(media)
      .map(
        (key) =>
          `${key} { ${media[key]
            .map((rule) => this.translateObjecToCss(rule.selector, rule.styles))
            .join('')
            .trim()} }`,
      )
      .join(' ');

    const animationCss = this.translateAnimationToCss(animations);

    const rootCss = root
      .map((rule) => this.translateObjecToCss(rule.selector, rule.styles))
      .join('')
      .trim();

    const sanitizedCss = serialize(
      compile(`@media all { ${globalCss} ${rootCss} ${animationCss} }`),
      middleware([prefixer, stringify]),
    );

    const sanitizedMedia = serialize(
      compile(`@media all { ${mediaCss}  }`),
      middleware([prefixer, stringify]),
    );

    const id = `${sanitizedCss}${sanitizedMedia}`;

    if (this.itsAlreadyInserted(id)) {
      return;
    }

    this.css.push(id);
    this.insert(sanitizedCss);
    this.insert(sanitizedMedia);
  }

  insert(css?: string): void {
    if (!css) {
      return;
    }

    if (!this._sheet) {
      this._sheet = Styles.initialize();
    }

    this._sheet.insertRule(css, this._sheet.cssRules.length);
  }

  itsAlreadyInserted(css: string): boolean {
    return this.css.includes(css);
  }

  delete(): void {
    this.css = [];

    if (this._sheet) {
      this._sheet?.ownerNode?.remove();
      this._sheet = undefined;
    }
  }
}
