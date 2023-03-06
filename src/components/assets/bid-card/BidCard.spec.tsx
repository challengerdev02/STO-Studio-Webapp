import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BidCard } from './index';
import React from 'react';

describe('BidCard component', function () {
  afterEach(cleanup);
  let props = {
    user: '0x658d224566...F0cC',
    cryptoValue: '1.46 ETH',
    priceEquivalent: '$2,764.89',
    startDate: '343604800',
    endDate: '604800',
    userAvatar: '../../../public/verified-account-avatar.svg',
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<BidCard {...props} {...extraProps} />);
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

  it('should check that the BidCard component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('bid-card')).toBeInTheDocument();
  });

  it('should test the BidCard component has a user avatar', () => {
    const { getByTestId } = setup();
    const image = getByTestId('user-avatar');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.userAvatar);
  });

  it('should test the BidCard component has the user avatar displayed twice', () => {
    const { getByTestId } = setup();
    const secondImage = getByTestId('user-avatar-2');
    expect(secondImage).toBeInTheDocument();
    expect(secondImage).toHaveAttribute('src', props.userAvatar);
  });

  it('should test the BidCard component has the user blockchain address displayed on it.', () => {
    const { getByTestId } = setup();
    expect(getByTestId('block-chain-address')).toBeInTheDocument();
  });

  it('should test the bid on the BidCard component has a price', () => {
    const { getByTestId } = setup();
    const cryptoValue = getByTestId('crypto-value');
    expect(cryptoValue).toBeInTheDocument();
    expect(cryptoValue).toHaveTextContent(props.cryptoValue);
  });

  it('should test the BidCard component has a price equivalent.', () => {
    const { getByTestId } = setup();
    const priceEquivalent = getByTestId('price-equivalent');
    expect(priceEquivalent).toBeInTheDocument();
    expect(priceEquivalent).toHaveTextContent(props.priceEquivalent);
  });

  it('should test the BidCard component has the TimeBlock components painted on screen', () => {
    const { getByTestId } = setup();
    expect(getByTestId('days-timeblock')).toBeInTheDocument();
    expect(getByTestId('days-timeblock')).toHaveTextContent;

    expect(getByTestId('hours-timeblock')).toBeInTheDocument();
    expect(getByTestId('hours-timeblock')).toHaveTextContent;

    expect(getByTestId('minutes-timeblock')).toBeInTheDocument();
    expect(getByTestId('minutes-timeblock')).toHaveTextContent;

    expect(getByTestId('seconds-timeblock')).toBeInTheDocument();
    expect(getByTestId('seconds-timeblock')).toHaveTextContent;
  });

  it('should test the Place a bid button is painted on screen ', () => {
    const { getByRole } = setup();
    const button = getByRole('button', { name: /place a bid/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
