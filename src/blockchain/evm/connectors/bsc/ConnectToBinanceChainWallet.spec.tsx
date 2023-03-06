import { cleanup } from '@testing-library/react';
import ConnectToBinanceChainWallet from './index';

const resolveRequest = jest
  .fn()
  .mockImplementation(() => Promise.resolve('0x1'));
const rejectRequest = jest.fn().mockRejectedValue(new Error('User Rejected'));
const resolvedObject = { request: resolveRequest };
const rejectObject = { request: rejectRequest };
describe('ConnectToBinanceChainWallet', () => {
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
  it('should test async ConnectToBinanceChainWallet "Fail"', async () => {
    await expect(ConnectToBinanceChainWallet()).rejects.toThrow(
      'No Binance Chain Wallet found'
    );
  });

  it('should test async ConnectToBinanceChainWallet with BinanceChain ', async () => {
    Object.defineProperty(window, 'BinanceChain', {
      writable: true,
      value: resolvedObject,
    });
    await expect(ConnectToBinanceChainWallet()).resolves.toBe(resolvedObject);
  });

  it('should test async ConnectToBinanceChainWallet Failed with BinanceChain ', async () => {
    Object.defineProperty(window, 'BinanceChain', {
      writable: true,
      value: rejectObject,
    });
    await expect(ConnectToBinanceChainWallet()).rejects.toThrow(
      'User Rejected'
    );
  });
});
