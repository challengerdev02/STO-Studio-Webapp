import {
  cleanup,
  queryByRole,
  queryByText,
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BodyComponent } from './index';

describe('Container', function () {
  afterEach(cleanup);
  let props = {
    title: 'Main Title',
    placeBid: jest.fn(),
    itemPrice: 'Coin Value',
    rates: '2.0',
    iconURL: 'www.url.com',
    count: '10',
    inWishlist: true,
    urlList: [],
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<BodyComponent {...props} {...extraProps} />);
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

  it('should have Content "This is a test for Content"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByText(document.body, 'Main Title')).toBeInTheDocument();
  });
  it('should have Wishlist', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByRole(document.body, 'InWishlist')).toBeInTheDocument();
    expect(queryByRole(document.body, 'NotInWishlist')).not.toBeInTheDocument();
  });

  it('should Not have Wishlist', () => {
    // @ts-ignore
    const { container } = setup({ inWishlist: false });
    expect(queryByRole(document.body, 'InWishlist')).not.toBeInTheDocument();
    expect(queryByRole(document.body, 'NotInWishlist')).toBeInTheDocument();
  });
});
