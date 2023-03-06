import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MobileBook } from './index';

describe('MobileBook component', function () {
  afterEach(cleanup);
  let props = {
    title: 'This is a test title',
    author: 'Cosmas',
    description: 'Meta NFT',
    imageUrl: '/assets/mobile-book-img.svg',
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(
      <MobileBook simulateMobile {...props} {...extraProps} />
    );
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

  it('should test the MobileBook component has an image displayed', () => {
    const { getByTestId } = setup();
    expect(getByTestId('img')).toBeInTheDocument();
  });

  it('should test the MobileBook component has the necessary texts been displayed ', () => {
    const { getByTestId, getByRole } = setup();
    const button = getByRole('button', { name: /sell/i });
    expect(getByTestId('author')).toBeInTheDocument();
    expect(getByTestId('mobile-book-title')).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(getByTestId('author').textContent).toBe('by @Cosmas');
    expect(getByTestId('mobile-book-title').textContent).toBe(
      'This is a test title'
    );
  });

  it('should match with snapshot', () => {
    // @ts-ignore
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
