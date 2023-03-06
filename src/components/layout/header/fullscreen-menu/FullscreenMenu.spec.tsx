import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryAllByText,
  queryByAttribute,
  queryByRole,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FullscreenMenu } from './index';

jest.mock(
  'next/link',
  () =>
    ({ children }: any) =>
      children
);

describe('FullscreenMenu COmponent', function () {
  afterEach(cleanup);
  let props = {
    visibility: true,
    // onFinish : jest.fn(),
    // onConnectWallet: jest.fn(),
    onVisibilityChange: jest.fn(),
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<FullscreenMenu {...props} {...extraProps} />);
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

  it('should display the menu-header', async () => {
    // @ts-ignore
    setup();
    expect(queryByRole(document.body, 'menu-header')).toBeInTheDocument();
  });

  it('should display the header Connect Wallet', async () => {
    // @ts-ignore
    setup();
    expect(queryByText(document.body, 'Connect Wallet')).toBeInTheDocument();
  });

  it('should display the header Create', async () => {
    // @ts-ignore
    setup();
    expect(queryByText(document.body, 'Create')).toBeInTheDocument();
  });
  it('should not display the header Connect Wallet', async () => {
    // @ts-ignore
    setup({ walletAddress: 'xxxxxx' });
    expect(
      queryByText(document.body, 'Connect Wallet')
    ).not.toBeInTheDocument();
  });

  it('should display the header link', async () => {
    // @ts-ignore
    setup();
    expect(queryAllByText(document.body, 'Resources').length).toBe(1);
    expect(queryAllByText(document.body, 'Token').length).toBe(1);
  });

  it('should Create', async () => {
    // @ts-ignore
    setup();
    const logoutButton = queryAllByText(document.body, 'Create')[0];
    fireEvent.click(logoutButton);
    expect(props.onVisibilityChange).toHaveBeenCalled();
  });

  it('should logout', async () => {
    // @ts-ignore
    setup();
    const logoutButton = queryAllByText(document.body, 'Connect Wallet')[0];
    fireEvent.click(logoutButton);
    expect(props.onVisibilityChange).toHaveBeenCalled();
  });

  it('should fire onCancel callback when modal is closed', async () => {
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

  it('should click twitter button', async () => {
    // @ts-ignore
    setup();
    const twitter = queryAllByAttribute(
      'href',
      document.body,
      'https://twitter.com/metacomics'
    )[0];
    fireEvent.click(twitter);
    expect(props.onVisibilityChange).toHaveBeenCalled();
  });

  it('should click tttt button', async () => {
    // @ts-ignore
    setup();
    const btn = queryAllByAttribute(
      'href',
      document.body,
      'https://t.me/metacomics'
    )[0];
    fireEvent.click(btn);
    expect(props.onVisibilityChange).toHaveBeenCalled();
  });

  it('should click Instagram button', async () => {
    // @ts-ignore
    setup();
    const btn = queryAllByAttribute(
      'href',
      document.body,
      'https://instagram.com/metacomics'
    )[0];
    fireEvent.click(btn);
    expect(props.onVisibilityChange).toHaveBeenCalled();
  });

  it('should click Telegram button', async () => {
    // @ts-ignore
    setup();
    const btn = queryAllByAttribute(
      'href',
      document.body,
      'https://t.me/metacomics'
    )[1];
    fireEvent.click(btn);
    expect(props.onVisibilityChange).toHaveBeenCalled();
  });

  it('should click youtube button', async () => {
    // @ts-ignore
    setup();
    const btn = queryAllByAttribute(
      'href',
      document.body,
      'https://youtube.com/metacomics'
    )[0];
    fireEvent.click(btn);
    expect(props.onVisibilityChange).toHaveBeenCalled();
  });

  it('should click toggle-menu button', async () => {
    // @ts-ignore
    setup();
    const btn = queryAllByAttribute(
      'class',
      document.body,
      'ant-btn ant-btn-circle ant-btn-default ant-btn-sm ant-btn-icon-only toggle-menu'
    )[0];
    fireEvent.click(btn);
    expect(props.onVisibilityChange).toHaveBeenCalled();
  });

  it('should click toggle-menu button', async () => {
    // @ts-ignore
    setup();
    const btn = queryAllByText(document.body, 'Resources')[0];
    fireEvent.click(btn);
    expect(props.onVisibilityChange).toHaveBeenCalled();
  });
});
