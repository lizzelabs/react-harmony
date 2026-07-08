/* eslint-disable @typescript-eslint/no-explicit-any */
import { Styles } from './styles';
import { describe, it, expect, test } from 'vitest';

describe('Styles test', () => {
  it('Should create a new instance', () => {
    expect(new Styles()).toBeTruthy();
  });

  test.each([
    [
      'PSEUDO CSS',
      {
        '&::after': {
          content: '""',
          background: 'rgb(0, 0, 255)',
        },
      },
      'test',
      (): CSSStyleDeclaration => {
        return window.getComputedStyle(
          document.querySelector('.test')!,
          '::after',
        );
      },
      [
        { key: 'content', expected: '""' },
        { key: 'backgroundColor', expected: 'rgb(0, 0, 255)' },
      ],
    ],
  ])(
    `Should insert $type with: $value`,
    (
      _: string,
      value: any,
      className: string,
      getStyleDom: () => CSSStyleDeclaration,
      // oxlint-disable-next-line typescript/prefer-readonly-parameter-types
      expected: { key: string; expected: any }[],
    ) => {
      const style = new Styles();
      const div = document.createElement('div');

      div.className = className;
      document.body.insertAdjacentElement('afterbegin', div);

      style.apply(value, className);

      const elementStyle = getStyleDom();

      for (const toExpect of expected) {
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion, typescript/no-unsafe-member-access
        expect(elementStyle[toExpect.key as any]).toBe(toExpect.expected);
      }

      div.remove();
    },
  );

  it('Should insert a container query', () => {
    const styles = new Styles();
    const container = document.createElement('div');
    const containerClassName = 'container';
    const child = document.createElement('div');
    const childClassName = 'child';
    child.className = childClassName;
    container.appendChild(child);
    container.className = containerClassName;

    styles.apply(
      {
        containerType: 'inline-size',
        containerName: 'card',
        width: '250px',
        height: '250px',
      },
      containerClassName,
    );

    styles.apply(
      {
        '@container card (max-width: 250px)': {
          background: 'blue',
        },
      },
      childClassName,
    );

    document.body.insertAdjacentElement('afterbegin', container);

    const elementContainer = window.getComputedStyle(
      document.querySelector(`.${containerClassName}`)!,
    );
    const elementChild = window.getComputedStyle(
      document.querySelector(`.${childClassName}`)!,
    );

    expect(elementContainer.containerName).toBe('card');
    expect(elementChild.backgroundColor).toBe('rgb(0, 0, 255)');
  });

  it('Should insert a global style', () => {
    const style = new Styles();

    expect(() => {
      style.apply({ 'html, body': { background: 'blue' } });
    }).not.toThrow();
    expect(window.getComputedStyle(document.body).backgroundColor).toBe(
      'rgb(0, 0, 255)',
    );
  });
});
