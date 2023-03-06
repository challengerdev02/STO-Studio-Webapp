import { cleanup, queryByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AccountSupport } from './index';
describe('Edit Profile component', function () {
  afterEach(cleanup);

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<AccountSupport {...extraProps} />);
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

  it('should test the AccountSupport Settings component paints on screen ', () => {
    const {} = setup({ visible: true });
    expect(queryByText(document.body, 'Account Support')).toBeInTheDocument();
    expect(
      queryByText(
        document.body,
        'if you need help related to your account, we can help you'
      )
    ).toBeInTheDocument();
  });

  it('should test the AccountSupport Settings component paints of details ', () => {
    const {} = setup({ visible: true });
    expect(
      queryByText(document.body, 'Visit our help center')
    ).toBeInTheDocument();
  });
});
