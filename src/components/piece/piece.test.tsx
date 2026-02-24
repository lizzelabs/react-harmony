/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Piece } from './piece';
import { PieceProvider } from '../piece-provider';

describe('Piece Renders', () => {
  it.each([['a'], ['div'], ['p'], ['main'], ['input']])(
    'Should render %s',
    (as) => {
      const { container } = render(
        <Piece
          id='12345'
          as={as as any}
        />,
      );

      expect(container.firstElementChild?.tagName.toLowerCase()).toBe(as);
    },
  );

  it(`Should render inline css properties correctly`, () => {
    const { container } = render(
      <Piece
        kind='test'
        id='1'
        margin='10px'
        padding='12px'
        textColor='#FFF'
        background='#333'
        backgroundColor='#333'
        fontSize='20px'
        gap='5px'
        direction='column'
        alignContent='center'
        justifyContent='center'
        alignItems='center'
        justifyItems='center'
        height='30px'
        width='30px'
        display='block'
        contentColumns='1fr 1fr'
        contentRows='1fr 1fr 1fr'
        atColumn='1 / 2'
        atRow='1 / 2'
        flex='1 0 auto'
      />,
    );

    expect(
      container.firstElementChild?.classList.contains('test-1'),
    ).toBeTruthy();

    const componentStyle = window.getComputedStyle(
      container.firstElementChild as Element,
    );

    expect(componentStyle.margin).toBe('10px');
    expect(componentStyle.padding).toBe('12px');
    expect(componentStyle.color).toBe('#FFF');
    expect(componentStyle.background).toBe('#333');
    expect(componentStyle.backgroundColor).toBe('#333');
    expect(componentStyle.fontSize).toBe('20px');
    expect(componentStyle.gap).toBe('5px');
    expect(componentStyle.flexDirection).toBe('column');
    expect(componentStyle.alignContent).toBe('center');
    expect(componentStyle.justifyContent).toBe('center');
    expect(componentStyle.alignItems).toBe('center');
    expect(componentStyle.justifyItems).toBe('center');
    expect(componentStyle.height).toBe('30px');
    expect(componentStyle.width).toBe('30px');
    expect(componentStyle.display).toBe('block');
    expect(componentStyle.gridTemplateColumns).toBe('1fr 1fr');
    expect(componentStyle.gridTemplateRows).toBe('1fr 1fr 1fr');
    expect(componentStyle.gridColumn).toBe('1/2');
    expect(componentStyle.gridRow).toBe('1/2');
    expect(componentStyle.flex).toBe('1 0 auto');
  });

  it('It should be able to receive template columns or rows as a number', () => {
    const { container } = render(
      <Piece
        contentColumns={4}
        contentRows={3}
      />,
    );

    const styles = window.getComputedStyle(
      container.firstElementChild as Element,
    );

    expect(styles.gridTemplateColumns).toBe('repeat(4, 1fr)');
    expect(styles.gridTemplateRows).toBe('repeat(3, 1fr)');
  });

  it('It should be able to specify the current column or row as a number', () => {
    const { container } = render(
      <Piece
        atColumn={5}
        atRow={7}
      />,
    );

    const styles = window.getComputedStyle(
      container.firstElementChild as Element,
    );

    expect(styles.gridColumn).toBe('5/6');
    expect(styles.gridRow).toBe('7/8');
  });

  it('It should fill the context properties', () => {
    render(
      <PieceProvider
        patterns={[
          {
            applyOn: (props: any) => props.kind === 'test',
            defaults: {
              aria: {
                'aria-autocomplete': 'none',
              },
            },
          },
        ]}
      >
        <Piece
          id='1'
          kind='test'
        ></Piece>
      </PieceProvider>,
    );

    const element = document.getElementById('1') as Element;
    expect(element).toHaveAttribute('aria-autocomplete', 'none');
  });

  it('It should fill the context style', () => {
    render(
      <PieceProvider
        patterns={[
          {
            applyOn: (props: any) => props.kind === 'test',
            style: {
              background: 'blue',
            },
          },
        ]}
      >
        <Piece
          id='1'
          kind='test'
        ></Piece>
      </PieceProvider>,
    );

    const styles = window.getComputedStyle(
      document.getElementById('1') as Element,
    );
    expect(styles.background).toBe('blue');
  });

  it('Even with context the priority should be always of itself', () => {
    render(
      <PieceProvider
        patterns={[
          {
            applyOn: (props: any) => props.kind === 'test',
            defaults: {
              aria: {
                'aria-autocomplete': 'inline',
              },
            },
            style: {
              background: 'blue',
            },
          },
        ]}
      >
        <Piece
          id='1'
          kind='test'
          background='black'
          aria={{
            'aria-autocomplete': 'none',
          }}
        ></Piece>
      </PieceProvider>,
    );

    const element = document.getElementById('1') as Element;
    const styles = window.getComputedStyle(element);
    expect(element).toHaveAttribute('aria-autocomplete', 'none');
    expect(styles.background).toBe('black');
  });
});
