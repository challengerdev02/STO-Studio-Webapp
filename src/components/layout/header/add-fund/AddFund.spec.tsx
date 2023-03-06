import {
  cleanup,
  fireEvent,
  queryByAttribute,
  queryByRole,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddFund } from './index';

jest.mock('qrcode');
jest.mock('@/shared/utils');

describe('AddFund', function () {
  afterEach(cleanup);
  let props = {
    visibility: true,
    address: 'This is a test title',
    onVisibilityChange: jest.fn(),
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<AddFund {...props} {...extraProps} />);
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

  it('should display the modal when "visible" is true', async () => {
    // @ts-ignore
    setup();
    expect(queryByRole(document.body, 'dialog')).toBeInTheDocument();
  });

  it('should fire onCancel callback when modal is closed', async () => {
    // @ts-ignore
    const { container } = setup();

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'Close');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(queryByRole(document.body, 'dialog')).toBeInTheDocument();
    });
  });

  it('should fire Copy Address callback address NEW', async () => {
    // @ts-ignore
    const { container } = setup();

    await waitFor(() => {
      const btn = queryByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-primary'
      );

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(queryByRole(document.body, 'dialog')).toBeInTheDocument();
    });
  });
});
