import {
  cleanup,
  queryAllByAltText,
  queryAllByAttribute,
  queryByRole,
  queryByText,
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MarketplaceCard } from './index';

describe('MarketplaceCard', function () {
  afterEach(cleanup);
  let props = {
    coverInfo: {
      countDown: '01:52:09 left 🔥',
      startDate: new Date(2022, 0, 1, 12, 30, 20, 0).toDateString(),
      endDate: new Date(2021, 11, 16, 12, 30, 7, 999).toDateString(),
      coverImg:
        'https://robohash.org/a8cd9c187bb33c8a8f6e2774d71308fb?set=set4&bgset=&size=400x400',
      menuItems: ['Option A', 'Option B', 'Option c'],
    },
    cardData: {
      title: 'Burney #282',
      iconURL:
        'https://robohash.org/0f0383b8d198fb15c0ab7fc729a73028?set=set4&bgset=&size=400x400',
      itemPrice: '3.01 BTC',
      rates: '1/1',
      count: '17k',
      inWishlist: false,
      urlList: [
        'https://robohash.org/962440efdb9e25e8ff4360a7037acfb4?set=set4&bgset=&size=400x400',
        'https://robohash.org/887f430666b7d04d90b82a4b988df961?set=set4&bgset=&size=400x400',
        'https://robohash.org/15b76d2ec3afc53e3af6c4a316090c94?set=set4&bgset=&size=400x400',
      ],
    },
    style: {
      width: '256px',
    },
    hoverable: true,
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<MarketplaceCard {...props} {...extraProps} />);
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

  it('should display the card', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryByRole(document.body, 'MarketplaceCardContainer')
    ).toBeInTheDocument();
  });

  it('should display the card coverImage', () => {
    // @ts-ignore
    const { container } = setup({ cover: 'This is test cover' });
    expect(
      queryAllByAttribute('class', document.body, 'ant-card-cover')[0]
    ).toBeInTheDocument();
    expect(
      queryAllByAttribute('class', document.body, 'ant-card-cover')[0]
    ).toHaveStyle(
      'background-image: url(https://robohash.org/a8cd9c187bb33c8a8f6e2774d71308fb?set=set4&bgset=&size=400x400);'
    );
  });

  it('should have countDown "This is a test for countDown"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByRole(document.body, 'count-down-text')).toBeInTheDocument();
  });

  it('should have dropdown menu "This is a test dropdown menu"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryAllByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-default ant-btn-icon-only ant-dropdown-trigger'
      )[0]
    ).toBeInTheDocument();
    // expect(queryByText(document.body, "Option B")).toHaveClass(
    //     "ant-dropdown-menu-title-content"
    //   );
  });

  it('should have Title "This is a test Title"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByText(document.body, 'Burney #282')).toBeInTheDocument();
    expect(queryByText(document.body, 'Burney #282')).toHaveClass(
      'ant-typography'
    );
  });

  it('should have StackedImages "This is a test StackImages"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryAllByAltText(document.body, 'stack-image')[0]
    ).toBeInTheDocument();
    expect(queryAllByAltText(document.body, 'stack-image')[0]).toHaveStyle(
      'width: 100%;'
    );
  });

  it('This is a test for Not in wishlist', () => {
    // @ts-ignore
    const { container } = setup({
      cardData: {
        inWishlist: false,
      },
    });
    expect(queryByRole(document.body, 'NotInWishlist')).toBeInTheDocument();
    expect(queryByRole(document.body, 'NotInWishlist')).toHaveClass(
      'anticon-heart'
    );
  });

  it('This is a test for in wishlist', () => {
    // @ts-ignore
    const { container } = setup({
      cardData: {
        inWishlist: true,
      },
    });
    expect(queryByRole(document.body, 'InWishlist')).toBeInTheDocument();
    expect(queryByRole(document.body, 'InWishlist')).toHaveClass(
      'anticon-heart'
    );
  });
});
