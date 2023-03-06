import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MyBooksWrapper } from './index';
import React from 'react';

describe('MyBooksWrapper component', function () {
  afterEach(cleanup);
  let props = {
    title: 'This is a test title',
    author: 'John Doe',
    description: 'This is metacomic',
    imageUrl: '/book-cover.png',
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<MyBooksWrapper {...props} {...extraProps} />);
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

  it('should test the MyBooksWrapper component paints on screen ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('my-books-wrapper')).toBeInTheDocument();
  });

  it('should test the MyBooksWrapper component has a header displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('component-header')).toBeInTheDocument();
  });
});
