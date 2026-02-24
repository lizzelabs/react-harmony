import { render } from '@testing-library/react';
import { describe } from 'vitest';
import { Animations } from './animations';

describe('Animations Render', () => {
  it('Should render animation in the document', () => {
    render(
      <Animations
        value={{
          name: 'fade',
          animation: {
            '@keyframes fade': {
              from: {
                opacity: 0,
              },
              to: {
                opacity: 1,
              },
            },
          },
        }}
      >
        <div></div>
      </Animations>,
    );

    expect(
      Array.from(document.styleSheets).some((sheet) =>
        Array.from(sheet.cssRules).some((rule) =>
          rule.cssText.includes('fade'),
        ),
      ),
    ).toBeTruthy();
  });
});
