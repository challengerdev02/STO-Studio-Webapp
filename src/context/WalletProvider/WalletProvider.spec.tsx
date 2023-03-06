import { useWallet } from '@/hooks';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { WalletProvider, WalletContext } from './index';

jest.mock('web3modal');
jest.mock('web3', () => {
  return jest.fn().mockImplementation(() => {
    return {
      eth: {
        getChainId: jest.fn().mockImplementation(() => {
          return Promise.resolve('0x1');
        }),
        getBalance: jest.fn().mockImplementation(() => {
          return Promise.resolve('0x1');
        }),
        getAccounts: jest.fn().mockImplementation(() => {
          return Promise.resolve([]);
        }),
      },
      utils: {
        fromWei: jest.fn().mockImplementation(() => {
          return Promise.resolve('0');
        }),
        toWei: jest.fn().mockImplementation(() => {
          return Promise.resolve('0');
        }),
      },
    };
  });
});

const mockWalletConnect = jest.fn();
const mockWalletDisconnect = jest.fn();
const mockProvider = new Proxy(
  {
    chainId: '0x1',
    enable: jest.fn(),
    send: jest.fn(),
    sendAsync: jest.fn(),
    request: jest.fn(),
    isMetaMask: true,
    networkVersion: '1',
    selectedAddress: 'hdj',
    __isProvider: true,
  },
  {}
);

jest.mock('../../hooks/useWallet', () => {
  return {
    useWallet: jest.fn().mockImplementation(() => {
      return {
        connect: mockWalletConnect,
        disconnect: mockWalletDisconnect,
        provider: mockProvider,
      };
    }),
  };
});

describe('WalletProvider', () => {
  afterEach(cleanup);

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(
      <WalletProvider {...extraProps}>
        <WalletContext.Consumer>
          {({ onConnect, onDisconnect }) => {
            return (
              <div data-testid="test-child">
                Hello World{' '}
                <button data-testid={'connect'} onClick={onConnect}>
                  Connect
                </button>
                <button data-testid={'disconnect'} onClick={onDisconnect}>
                  Disconnect
                </button>
              </div>
            );
          }}
        </WalletContext.Consumer>
      </WalletProvider>
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

  it('should render child', () => {
    const { getByTestId } = setup();

    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  it('should call connect when connect button is clicked', async () => {
    await act(() => {
      const { getByTestId } = setup();
      const connectButton = getByTestId('connect');

      fireEvent.click(connectButton);

      expect(mockWalletConnect).toHaveBeenCalled();
    });
  });

  it('should call "useWallet" hook with "connect" and "disconnect" functions', () => {
    setup();

    expect(useWallet).toHaveBeenCalled();
  });
});
