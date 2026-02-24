import { render } from '@testing-library/react';
import { it, describe } from 'vitest';

describe('Media Renders: ', () => {
  it('It should render', async () => {
    const { Media } = await import('./media');

    const { queryByText } = render(
      <Media query='(min-width: 1px)'>
        <h1>Hello</h1>
      </Media>,
    );

    expect(queryByText('Hello')).toBeInTheDocument();
  });

  it('It should not be in document', async () => {
    const { Media } = await import('./media');

    const { queryByText } = render(
      <Media
        query='(min-width: 1px)'
        removeFromHtml
      >
        <h1>Hello</h1>
      </Media>,
    );

    expect(queryByText('Hello')).not.toBeInTheDocument();
  });
});
