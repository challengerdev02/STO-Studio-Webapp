import { cleanup, render } from '@testing-library/react';
import { MainLayoutContainer, AuthLayoutContainer } from './index';

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
    replace: mockPush,
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

describe('View MainLayoutContainer Container', function () {
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
  it('should match MainLayoutContainer with snapshot', () => {
    // @ts-ignore
    const { container } = render(
      <MainLayoutContainer>
        <h1>Hello</h1>
      </MainLayoutContainer>
    );
    expect(container).toMatchSnapshot();
  });

  it('should match AuthLayoutContainer with snapshot', () => {
    // @ts-ignore
    const { container } = render(
      <AuthLayoutContainer>
        <h1>Hello</h1>
      </AuthLayoutContainer>
    );
    expect(container).toMatchSnapshot();
  });
});
