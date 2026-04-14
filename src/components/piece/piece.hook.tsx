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

  const componentProps = useMemo(
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
      >(componentProps),
    [getContext, componentProps],
  );

  const componentDefaults = useMemo(
    () => fillObjectWithDefaults(componentProps, context.defaults),
    [context.defaults, componentProps],
  );

  const componentStyle = useMemo(
    () =>
      PieceUtils.loadProperties<Theme, Element, Component>(
        theme as Theme,
        componentDefaults,
        context.style,
        PieceUtils.pickComponentStyle(theme, componentDefaults.withStyle),
      ),
    [componentDefaults, context.style, theme],
  );

  const componentStrippedNonHtmlProps = useMemo(
    () => PieceUtils.pickComponentProps(componentDefaults),
    [componentDefaults],
  );

  const Piece = (componentDefaults.as || 'div') as any;

  useInsertionEffect(
    function applyCss() {
      if (componentStyle) {
        styles.apply(componentStyle, componentClassName);
      }

      return () => {
        styles.delete();
      };
    },
    [styles, componentStyle, componentClassName, componentStyle],
  );

  return {
    element: <Piece {...componentStrippedNonHtmlProps} />,
  };
};
