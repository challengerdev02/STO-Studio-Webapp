import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LiveAuctionInfo } from './index';

describe('LiveAuctionInfo component', function () {
  afterEach(cleanup);
  let props = {
    imageUrl: '/book-cover.png',
    title: 'Amethyst: Princess of Gemworld',
    auctioneer: 'macauley',
    itemDescription:
      'Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks. But when one goes much too far, her parents ground the young royal. Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks.',
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<LiveAuctionInfo {...props} {...extraProps} />);
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

  it('should test the LiveAuctionInfo component displays ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('live-auction-info')).toBeInTheDocument();
  });

  it('should test the LiveAuctionInfo component has a title displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('bid-title')).toBeInTheDocument();
  });

  it('should test the LiveAuctionInfo component has an auctioneer text displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('bid-auctioneer')).toBeInTheDocument();
  });

  it('should test the LiveAuctionInfo component has a description displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('item-description')).toBeInTheDocument();
  });
});
