import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LiveAuctionList } from './index';
import { format } from 'date-fns';

describe('LiveAuctionList component', function () {
  afterEach(cleanup);
  let props = {
    data: [
      {
        cryptoValue: '7.00698',
        cryptoCurrency: 'ETH',
        user: '0x658d22456633334234iF0cC',
        date: format(new Date('2021-11-17T01:00:00'), 'yyyy-MM-dd, HH:mm aaa'),
        userAvatar: '/verified-account-avatar.svg',
      },
      {
        cryptoValue: '7.00698',
        cryptoCurrency: 'ETH',
        user: '0x658d22456633334234iF0cC',
        date: format(new Date('2021-11-17T01:00:00'), 'yyyy-MM-dd, HH:mm aaa'),
        userAvatar: '/verified-account-avatar.svg',
      },
    ],
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<LiveAuctionList {...props} {...extraProps} />);
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

  it('should check that the LiveAuctionList component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('live-auction-list')).toBeInTheDocument();
  });

  it('should test the LiveAuctionList receives a crypto value props', () => {
    const { container } = setup();
    const crypto_value = container.querySelector('.ant-list-item-meta-title');
    expect(crypto_value).toBeInTheDocument();
    expect(crypto_value).toHaveTextContent('7.00698');
  });

  it('should test that the crypto value props the LiveAuctionList receives has a currency type ', () => {
    const { container } = setup();
    const currency_type = container.querySelector('.ant-list-item-meta-title');
    expect(currency_type).toBeInTheDocument();
    expect(currency_type).toHaveTextContent('ETH');
  });

  it('should test the LiveAuctionList receives a user blockchain address props', () => {
    const { container } = setup();

    const user = container.querySelector('.ant-list-item-meta-title');
    expect(user).toBeInTheDocument();
    expect(user).toHaveTextContent('7.00698 ETH by 0x658d22456633334...');
  });

  it('should test the LiveAuctionList receives a bid date props', () => {
    const { container } = setup();

    const date = container.querySelector('.ant-list-item-meta-description');
    expect(date).toBeInTheDocument();
    expect(date).toHaveTextContent('2021-11-17, 01:00 am');
  });
});
