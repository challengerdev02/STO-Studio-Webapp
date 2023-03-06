import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LiveAuctionCard } from './index';

describe('Live Auction Card component', function () {
  afterEach(cleanup);
  let props = {
    itemCoverImage: '/zachary-kadolph-unsplash.svg',
    itemName: 'Crypto Bull Society',
    bestOffer: '0.51',
    lastOffer: '0.42',
    likes: '1.7 k',
    onClick: () => {},
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<LiveAuctionCard {...props} {...extraProps} />);
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
  it('should test the LiveAuctionCard component displays ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('live-auction-card')).toBeInTheDocument();
  });

  it('should test the source attribute of LiveAuctionCard component cover image has a value ', () => {
    const { getAllByRole } = setup();
    const cardImage = getAllByRole('img');
    expect(cardImage[0]).toHaveAttribute(
      'src',
      '/zachary-kadolph-unsplash.svg'
    );
    expect(cardImage[0]).toHaveAttribute('alt', '');
  });

  it('should test the live auction card received an item name props', () => {
    const { getByTestId } = setup();
    const itemName = getByTestId('item-name');
    expect(itemName).toBeInTheDocument();
    expect(itemName).toHaveTextContent(/Crypto Bull Society/i);
  });

  it('should test the live auction card received a best offer props', () => {
    const { getByTestId } = setup();
    const bestoffer = getByTestId('best-offer');
    expect(bestoffer).toBeInTheDocument();
    expect(bestoffer).toHaveTextContent(/0.51/i);
  });

  it('should test the live auction card received a last offer props', () => {
    const { getByTestId } = setup();
    const lastOffer = getByTestId('last-offer');
    expect(lastOffer).toBeInTheDocument();
    expect(lastOffer).toHaveTextContent(/0.42/i);
  });

  it('should test the live auction card received a likes props', () => {
    const { getByTestId } = setup();
    const likes = getByTestId('likes');
    expect(likes).toBeInTheDocument();
    expect(likes).toHaveTextContent(/1.7 k/i);
  });

  it('should test the live auction card has an options widget', () => {
    const { getByTestId } = setup();
    const optionsWidget = getByTestId('options-widget');
    expect(optionsWidget).toBeInTheDocument();
  });
});
