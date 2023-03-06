import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LiveAuctionCard } from './index';

describe('LiveAuctionCard component', function () {
  afterEach(cleanup);
  let props = {
    GENRE_OPTIONS: 'Science Fiction',
    language: 'Japanese',
    ageRating: '13 and above',
    characters: ['Spiderman', 'Magnito'],
    imageSrc: '/live-auction-card-cover.svg',
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
  it('should test the LiveAuctionCard component has a display image ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('display-image')).toBeInTheDocument();
  });

  it('should test the source attribute of LiveAuctionCard component display image has a value ', () => {
    const { getByRole } = setup();
    const displayImage = getByRole('img');
    expect(displayImage).toHaveAttribute('src', '/live-auction-card-cover.svg');
    expect(displayImage).toHaveAttribute('alt', '');
  });

  it('should test the Attribute section of the LiveAuctionCard component has a header ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('attribute-header')).toBeInTheDocument();
  });

  it('should test the Characters section of the LiveAuctionCard component has a header', () => {
    const { getByTestId } = setup();
    expect(getByTestId('characters-header')).toBeInTheDocument();
  });
  it('should test the LiveAuctionCard component has a GENRE_OPTIONS displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('GENRE_OPTIONS')).toBeInTheDocument();
  });

  it('should test the LiveAuctionCard component has a language type displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('language-type')).toBeInTheDocument();
  });

  it('should test the LiveAuctionCard component has an age rating displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('age-rating')).toBeInTheDocument();
  });

  it('should test the LiveAuctionCard component has characters displayed ', () => {
    const { getAllByTestId } = setup();
    const first_character = getAllByTestId('characters')[0];
    expect(first_character).toHaveTextContent(/spiderman/i);

    const second_character = getAllByTestId('characters')[1];
    expect(second_character).toHaveTextContent(/magnito/i);
  });
});
