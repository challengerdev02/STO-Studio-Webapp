import { cleanup, queryByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Notifications } from './index';
describe('Edit Profile component', function () {
  afterEach(cleanup);

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<Notifications {...extraProps} />);
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

  it('should test the Notification Settings component paints on screen ', () => {
    const {} = setup({ visible: true });
    expect(
      queryByText(document.body, 'Notification Settings')
    ).toBeInTheDocument();
    expect(
      queryByText(
        document.body,
        'Select notification you would like to recieved'
      )
    ).toBeInTheDocument();
  });

  it('should test the Notification Settings component paints of details ', () => {
    const {} = setup({ visible: true });
    expect(queryByText(document.body, 'Item Sold')).toBeInTheDocument();
    expect(
      queryByText(document.body, 'When some purchases on one your items')
    ).toBeInTheDocument();
  });
});
