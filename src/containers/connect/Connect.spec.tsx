import { BaseWeb3Context } from '../../blockchain/base';
import { cleanup, render } from '@testing-library/react';
import { ConnectWalletContainer } from './index';

const mockPush = jest.fn();
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

// jest.mock('next/router', () => ({
//     ...jest.requireActual('next/router'), // use actual for all non-hook parts
//     useParams: () => ({
//       teamId: 'someTeamId',
//       eventId: 'someEventId',
//       broadcastId: 'someShowId',
//     }),
//     useRouter: () => ({
//       query: {},
//       push: mockPush,
//     }),
//     useLocation: jest.fn(),
//   }));
//   import { useRouter } from 'next/router';

describe('View Account Connect', function () {
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

  const ProviderEl = ({ iscon = true }) => {
    return (
      <BaseWeb3Context.Provider
        value={{
          isConnected: iscon,
          isConnecting: true,
          provider: true,
        }}
      >
        <ConnectWalletContainer />
      </BaseWeb3Context.Provider>
    );
  };
  it('should match with snapshot', () => {
    // @ts-ignore

    useRouter.mockImplementation(() => ({
      query: {},
      push: mockPush,
    }));
    const { container } = render(<ProviderEl />);
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot', () => {
    // @ts-ignore

    useRouter.mockImplementation(() => ({
      query: {},
      push: mockPush,
    }));
    const { container } = render(<ProviderEl iscon={false} />);
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot With referrer ', () => {
    // @ts-ignore
    useRouter.mockImplementation(() => ({
      query: { referrer: '/s' },
      push: mockPush,
    }));

    const { container } = render(<ProviderEl />);
    expect(container).toMatchSnapshot();
  });
});
