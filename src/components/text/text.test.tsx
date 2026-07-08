import { render } from '@testing-library/react';
import { Text } from './text';
import { describe, it, expect } from 'vitest';

describe('Text renders', () => {
  it('It should render', () => {
    const { getByText } = render(<Text as='b'>Hello world</Text>);

    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
