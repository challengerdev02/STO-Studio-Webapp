import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AttributesCard } from './index';

describe('AttributesCard', function () {
  afterEach(cleanup);
  let props = {
    icon: <i className="mc-check-fill mc-1x" />,
    title: 'Lorem ipsum lorem',
    bottomText: 'story line',
    backgroundColor: 'voilet',
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<AttributesCard {...props} {...extraProps} />);
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

  it('should test the Attributes Card component paints on screen', () => {
    const { getByTestId } = setup();

    const attributes_card_container = getByTestId('attributes-card-container');
    expect(attributes_card_container).toBeInTheDocument();
  });

  it('should test the Attributes Card component that paints on screen has a title text', () => {
    const { getByTestId } = setup();

    const attributes_card_container_title_text = getByTestId(
      'attributes-card-container-title'
    );
    expect(attributes_card_container_title_text).toBeInTheDocument();
  });

  it('should test the Attributes Card component that paints on screen has a bottom text', () => {
    const { getByTestId } = setup();

    const attributes_card_container_bottom_text = getByTestId(
      'attributes-card-container-bottom-text'
    );
    expect(attributes_card_container_bottom_text).toBeInTheDocument();
  });

  it('should test that every Attributes Card component that paints on screen has an icon', () => {
    const { getByTestId } = setup();

    const card_icon = getByTestId('card-icon');
    expect(card_icon).toBeInTheDocument();
  });
});
