/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { PieceProvider } from './piece-provider';
import { Piece } from '../piece';

describe('PieceProvider Renders', () => {
  it('It should render', () => {
    render(
      <PieceProvider
        patterns={[]}
        theme={{ color: 'blue' }}
      >
        <Piece
          id='2'
          textColor={(theme: any) => theme.color}
        />
      </PieceProvider>,
    );

    const element = document.getElementById('2') as Element;
    const styles = window.getComputedStyle(element);
    expect(styles.color).toBe('blue');
  });
});
