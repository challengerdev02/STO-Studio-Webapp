import { cleanup, queryByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SellTab } from './index';
import React from 'react';

describe('MyBooksWrapper component', function () {
  afterEach(cleanup);

  const setup = (
    { visible, ...props }: { visible: boolean } = { visible: true }
  ) => {
    const utils = render(<SellTab {...props} />);
    return {
      ...utils,
    };
  };

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should match with snapshot', () => {
    // @ts-ignore
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('should test the my-book-preview-wrapper component paints on screen ', () => {
    const { getByTestId } = setup();
    expect(queryByText(document.body, 'SELL')).toBeInTheDocument();
  });
});
