import { render } from '@testing-library/react';
import { Scrollable } from './scrollable';

describe('Scrollable Renders', () => {
  it('Should render a scroll', () => {
    render(
      <div>
        <Scrollable
          id='scroll'
          horizontal
        >
          <div style={{ width: '500px', flex: '0 0 500px' }}></div>
          <div style={{ width: '500px', flex: '0 0 500px' }}></div>
          <div style={{ width: '500px', flex: '0 0 500px' }}></div>
          <div style={{ width: '500px', flex: '0 0 500px' }}></div>
          <div style={{ width: '500px', flex: '0 0 500px' }}></div>
          <div style={{ width: '500px', flex: '0 0 500px' }}></div>
          <div style={{ width: '500px', flex: '0 0 500px' }}></div>
          <div style={{ width: '500px', flex: '0 0 500px' }}></div>
        </Scrollable>
      </div>,
    );

    expect(document.getElementById('scroll') as Element).toBeInTheDocument();
  });
});
