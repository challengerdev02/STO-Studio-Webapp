import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryByTestId,
  render,
  waitFor,
} from '@testing-library/react';
import { ViewAccountContainer } from './index';

const mockHandleUpdateAccountFn = jest.fn();
const mockFindOneAccountFn = jest.fn();
const mockPush = jest.fn();

// jest.mock('date-fns/format', () => jest.fn().mockImplementation((data: any) => "new") );

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'), // use actual for all non-hook parts
  useRouter: () => ({
    query: {},
    push: mockPush,
  }),
}));

jest.mock('@/hooks', () => {
  return {
    ...jest.requireActual('@/hooks'), // use actual for all non-hook parts

    useBook: () => ({
      book: {},
      handleGetBook: jest.fn(),
    }),
    useAccount: jest.fn().mockImplementation(() => ({
      user: {
        username: 'mike',
        walletAddress: '0xrrr',
        url: 'url string',
        emailAccount: {
          email: 'hs@gimal.vom',
        },
        createdAt: '2022-02-18T20:24:19.835Z',
      },
      search: jest.fn(),
      handleUpdateAccount: mockHandleUpdateAccountFn,
      handleFindOneAccount: mockFindOneAccountFn,
    })),
    useUIState: () => ({
      uiLoaders: [],
    }),
  };
});

// import { useAccount } from '@/hooks';

const useAccount = jest.spyOn(require('@/hooks'), 'useAccount');

describe('View Account Container', function () {
  afterEach(cleanup);

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
    const { container } = render(<ViewAccountContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should fire settings-widget', async () => {
    // @ts-ignore
    render(<ViewAccountContainer />);

    await waitFor(() => {
      const btn = queryByTestId(document.body, 'settings-widget');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Delete Cover Imafe', async () => {
    // @ts-ignore
    render(<ViewAccountContainer />);

    await waitFor(() => {
      const btn = queryByTestId(document.body, 'delete-cover-image');
      if (btn) fireEvent.click(btn);
    });

    await waitFor(() => {
      expect(mockHandleUpdateAccountFn).toHaveBeenCalled();
    });
  });

  it('should fire upload Avatar Image', async () => {
    // @ts-ignore
    render(<ViewAccountContainer />);

    await waitFor(() => {
      const inputFile = queryByTestId(document.body, 'photo-uploader');
      const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
        lastModified: new Date().getTime(),
      });
      if (inputFile) fireEvent.change(inputFile, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockHandleUpdateAccountFn).toHaveBeenCalled();
    });
  });

  it('should fire upload Cover Image', async () => {
    // @ts-ignore
    render(<ViewAccountContainer />);

    await waitFor(() => {
      const inputFile = queryAllByAttribute('type', document.body, 'file')[1];
      const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
        lastModified: new Date().getTime(),
      });
      if (inputFile) fireEvent.change(inputFile, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockHandleUpdateAccountFn).toHaveBeenCalled();
    });
  });

  it('should match with snapshot No WalletAddress ', () => {
    // @ts-ignore
    useAccount.mockImplementation(() => ({
      user: {
        username: 'mike',
        walletAddress: '',
        url: 'url string',
        emailAccount: {
          email: 'hs@gimal.vom',
        },
      },
      search: jest.fn(),
      handleUpdateAccount: mockHandleUpdateAccountFn,
      handleFindOneAccount: mockFindOneAccountFn,
    }));
    const { container } = render(<ViewAccountContainer />);
    expect(container).toMatchSnapshot();
  });
});
