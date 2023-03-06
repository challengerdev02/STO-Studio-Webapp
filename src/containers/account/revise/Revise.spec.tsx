import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryByPlaceholderText,
  queryByTestId,
  render,
  waitFor,
} from '@testing-library/react';
import { EditAccountContainer } from './index';

const mockHandleUpdateAccountFn = jest.fn();
const mockFindOneAccountFn = jest.fn();
const mockPush = jest.fn();

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'), // use actual for all non-hook parts
  useParams: () => ({
    teamId: 'someTeamId',
    eventId: 'someEventId',
    broadcastId: 'someShowId',
  }),
  useRouter: () => ({
    query: {},
    push: mockPush,
  }),
  useLocation: jest.fn(),
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

import { useAccount } from '@/hooks';

describe('View Edit Account Container', function () {
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
    const { container } = render(<EditAccountContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should fire submit button', async () => {
    // @ts-ignore
    const { container } = render(<EditAccountContainer />);

    await waitFor(() => {
      const btn = queryByTestId(document.body, 'profile-submit-button');
      const input = queryByPlaceholderText(
        document.body,
        "Your username as you'd like it to be displayed on Metacomics."
      );

      if (btn && input) {
        fireEvent.change(input, { target: { value: 'xyz' } });
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockHandleUpdateAccountFn).toHaveBeenCalled();
      expect(mockFindOneAccountFn).toHaveBeenCalled();
    });
    expect(container).toMatchSnapshot();
  });

  it('should fire preview button', async () => {
    // @ts-ignore
    render(<EditAccountContainer />);

    await waitFor(() => {
      const btn = queryByTestId(document.body, 'preview-button');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire same Username', async () => {
    // @ts-ignore
    render(<EditAccountContainer />);

    await waitFor(() => {
      const input = queryByPlaceholderText(
        document.body,
        "Your username as you'd like it to be displayed on Metacomics."
      );

      if (input) {
        fireEvent.change(input, { target: { value: 'mike' } });
      }
    });

    await waitFor(() => {
      expect(mockHandleUpdateAccountFn).toHaveBeenCalled();
      expect(mockFindOneAccountFn).toHaveBeenCalled();
    });
  });

  it('should fire upload Avatar Image', async () => {
    // @ts-ignore
    render(<EditAccountContainer />);

    await waitFor(() => {
      const inputFile = queryAllByAttribute('type', document.body, 'file')[0];
      const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
      });
      fireEvent.change(inputFile, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockHandleUpdateAccountFn).toHaveBeenCalled();
    });
  });

  it('should fire upload Cover Image', async () => {
    // @ts-ignore
    render(<EditAccountContainer />);

    await waitFor(() => {
      const inputFile = queryAllByAttribute('type', document.body, 'file')[1];
      const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
      });
      fireEvent.change(inputFile, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockHandleUpdateAccountFn).toHaveBeenCalled();
    });
  });

  it('should match with snapshot No WallatAddress ', () => {
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
    const { container } = render(<EditAccountContainer />);
    expect(container).toMatchSnapshot();
  });
});
