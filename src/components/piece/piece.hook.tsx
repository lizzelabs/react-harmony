/* eslint-disable @typescript-eslint/no-explicit-any */

import type { HtmlTag } from '@/types';
import type { PieceProperties } from './piece.types';
import { useId, useInsertionEffect, useMemo } from 'react';
import { appendClasses, fillObjectWithDefaults, Styles } from '@/utils';
import { usePieceProvider } from '../piece-provider';
import { PieceUtils } from './piece.utils';

export const usePiece = <
  const Theme extends object | undefined = object,
  const Element extends HtmlTag = 'div',
  const Component extends HTMLElement = HTMLElementTagNameMap[Element],
>(
  props: PieceProperties<Theme, Element, Component>,
) => {
  const { getContext, theme } = usePieceProvider<Theme>();
  const styles = useMemo(() => new Styles(), []);
  const reactId = useId();
  const kind = useMemo(() => props.kind || 'piece', [props.kind]);
  const id = useMemo(() => props.id || reactId, [props.id, reactId]);
  const componentClassName = useMemo(() => `${kind}-${id}`, [kind, id]);

  const componentDefaults = useMemo(
    () => ({
      ...props,
      kind,
      id,
      className: appendClasses(props.className, componentClassName),
    }),
    [props, kind, id, componentClassName],
  );

  const context = useMemo(
    () =>
      getContext<
        Element,
        Component,
        PieceProperties<Theme, Element, Component>
      >(componentDefaults),
    [getContext, componentDefaults],
  );

  const componentStyle = useMemo(
    () =>
      PieceUtils.loadPositionProps<Theme, Element, Component>(
        componentDefaults,
        PieceUtils.pickComponentStyle(theme, componentDefaults.withStyle),
        theme as Theme,
      ),
    [componentDefaults, theme],
  );

  const componentWithContext = useMemo(
    () =>
      fillObjectWithDefaults(
        {
          className: `${componentDefaults.className} ${context.className}`,
        } as PieceProperties<Theme, Element, Component>,
        context.defaults,
        componentDefaults,
      ),
    [context.defaults, context.className, componentDefaults],
  );

  const componentStrippedNonHtmlProps = useMemo(
    () => PieceUtils.pickComponentProps(componentWithContext),
    [componentWithContext],
  );

  const Piece = (componentWithContext.as || 'div') as any;

  useInsertionEffect(
    function applyCss() {
      if (context.style) {
        styles.apply(context.style, context.className);
      }

      if (componentStyle) {
        styles.apply(componentStyle, componentClassName);
      }

      return () => {
        styles.delete();
      };
    },
    [
      styles,
      context.style,
      context.className,
      componentStyle,
      componentClassName,
      componentStyle,
    ],
  );

  return {
    element: <Piece {...componentStrippedNonHtmlProps} />,
  };
};
