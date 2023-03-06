import { cleanup, queryByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  CustomCardColoredStyledBox,
  CustomStyledBox,
  MarketplaceCardContainer,
  SpacedFlexContainer,
} from './index';

describe('Container', function () {
  afterEach(cleanup);
  let props = {
    width: '256px',
    height: '256px',

    hoverable: true,
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(
      <CustomStyledBox {...props} {...extraProps}>
        A content
      </CustomStyledBox>
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

  it('should match with snapshot', () => {
    // @ts-ignore
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should have Content "This is a test for Content"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByText(document.body, 'A content')).toBeInTheDocument();
  });

  it('should match with snapshot: SpacedFlexContainer', () => {
    // @ts-ignore
    const { container } = render(<SpacedFlexContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot: CustomCardColoredStyledBox', () => {
    // @ts-ignore
    const { container } = render(<CustomCardColoredStyledBox position={20} />);
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot: CustomCardColoredStyledBox No Position', () => {
    // @ts-ignore
    const { container } = render(<CustomCardColoredStyledBox />);
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot: MarketplaceCardContainer', () => {
    // @ts-ignore
    const { container } = render(
      <MarketplaceCardContainer
        {...{
          coverImg:
            'https://robohash.org/a8cd9c187bb33c8a8f6e2774d71308fb?set=set4&bgset=&size=400x400',
          countDown: '01:52:09 left 🔥',
          startDate: new Date(2022, 0, 1, 12, 30, 20, 0).toDateString(),
          menuItems: ['Option A', 'Option B', 'Option c'],
          endDate: new Date(2021, 11, 16, 12, 30, 7, 999).toDateString(),
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot: MarketplaceCardContainer With Cover', () => {
    // @ts-ignore
    const { container } = render(
      <MarketplaceCardContainer
        {...{
          coverImg:
            'https://robohash.org/a8cd9c187bb33c8a8f6e2774d71308fb?set=set4&bgset=&size=400x400',
          countDown: '01:52:09 left 🔥',
          startDate: new Date(2022, 0, 1, 12, 30, 20, 0).toDateString(),
          menuItems: ['Option A', 'Option B', 'Option c'],
          cover: <div>Hello</div>,
          endDate: new Date(2021, 11, 16, 12, 30, 7, 999).toDateString(),
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot: MarketplaceCardContainer Without menuItems', () => {
    // @ts-ignore
    const { container } = render(
      <MarketplaceCardContainer
        {...{
          coverImg:
            'https://robohash.org/a8cd9c187bb33c8a8f6e2774d71308fb?set=set4&bgset=&size=400x400',
          countDown: '01:52:09 left 🔥',
          startDate: new Date(2022, 0, 1, 12, 30, 20, 0).toDateString(),
          cover: <div>Hello</div>,
          endDate: new Date(2021, 11, 16, 12, 30, 7, 999).toDateString(),
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
