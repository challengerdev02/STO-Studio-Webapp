import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { Footer } from './index';
import Logo from '../../../../public/assets/logo-dark.svg';

describe('Footer', function () {
  afterEach(cleanup);

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<Footer imgSrc={Logo} {...extraProps} />);
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

  it('should test the footer is rendered with the right texts', function () {
    const { getByText } = setup();
    expect(getByText('For Creators')).toBeInTheDocument();
    expect(getByText('Connect wallet')).toBeInTheDocument();
    expect(getByText('Accept')).toBeInTheDocument();
  });
});
