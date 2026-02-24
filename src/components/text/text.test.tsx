import { render } from '@testing-library/react';
import { Text } from './text';

describe('Text renders', () => {
  it('It should render', () => {
    const { getByText } = render(<Text as='b'>Hello world</Text>);

    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
