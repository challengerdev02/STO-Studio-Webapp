import {
  cleanup,
  fireEvent,
  queryAllByRole,
  queryByAttribute,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BalanceDrawer } from './index';

jest.mock(
  'next/link',
  () =>
    ({ children }: any) =>
      children
);

describe('BalanceDrawer', function () {
  afterEach(cleanup);
  let props = {
    visibility: true,
    balance: 'xxxxxxxxx',
    address: 'yyyyyyyyy',
    onVisibilityChange: jest.fn(),
    onDisconnectWallet: jest.fn(),
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<BalanceDrawer {...props} {...extraProps} />);
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

  it('should display the Title : Your Wallet', async () => {
    // @ts-ignore
    setup();
    expect(queryByText(document.body, 'Your Wallet')).toBeInTheDocument();
  });

  it('should display the copy button', async () => {
    // @ts-ignore
    setup();
    expect(
      queryByAttribute('aria-label', document.body, 'Copy')
    ).toBeInTheDocument();
  });

  it('should display the header Total Balance', async () => {
    // @ts-ignore
    setup();
    expect(queryByText(document.body, 'Total Balance')).toBeInTheDocument();
  });

  it('should display the Add Funds', async () => {
    // @ts-ignore
    setup();
    expect(queryByText(document.body, 'Add Funds')).toBeInTheDocument();
  });

  it('should fire onVisibilityChange callback when modal is closed', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'Close');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onVisibilityChange).toHaveBeenCalled();
    });
  });

  it('should fire Logout callbacks when clicked', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByText(document.body, 'Logout');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onVisibilityChange).toHaveBeenCalled();
      expect(props.onDisconnectWallet).toHaveBeenCalled();
    });
  });

  it('should fire Profile Setting callbacks when clicked', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByText(document.body, 'Profile Settings');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onVisibilityChange).toHaveBeenCalled();
      expect(props.onDisconnectWallet).toHaveBeenCalled();
    });
  });

  it('should fire Profile callbacks when clicked', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByText(document.body, 'Profile');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onVisibilityChange).toHaveBeenCalled();
      expect(props.onDisconnectWallet).toHaveBeenCalled();
    });
  });

  it('should display Lower : links', async () => {
    // @ts-ignore
    setup();
    expect(queryAllByRole(document.body, 'link').length).toBe(3);
    // expect(queryAllByRole(document.body, 'link')[0].getAttribute('href')).toBe('/account');
    // expect(queryAllByRole(document.body, 'link')[1].getAttribute('href')).toBe('/account/settings');
    // expect(queryAllByRole(document.body, 'link')[2].getAttribute('href')).toBeNull();
  });
});
