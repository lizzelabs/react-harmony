import { render } from '@testing-library/react';
import { Screen } from './screen';

describe('Screen Renders', () => {
  it('It should render', () => {
    render(
      <Screen
        containerId='#root'
        fontSize='15px'
      >
        <div></div>
      </Screen>,
    );

    const elements = document.getElementsByTagName('main');

    expect(elements.length).toBe(1);
  });
});
