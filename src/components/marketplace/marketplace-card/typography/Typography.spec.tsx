import { cleanup, queryByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CustomStyledText } from './index';

describe('Container', function () {
  afterEach(cleanup);
  let props = {};

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(
      <CustomStyledText {...props} {...extraProps}>
        ABC
      </CustomStyledText>
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

  it('should have CustomStyledText "This is a test CustomStyledText"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByText(document.body, 'ABC')).toBeInTheDocument();
  });

  it('should have CustomStyledText "muted= true"', () => {
    // @ts-ignore
    const { container } = setup({ muted: true });
    expect(queryByText(document.body, 'ABC')).toBeInTheDocument();
  });
});
