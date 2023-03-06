import { cleanup } from '@testing-library/react';
import ConnectToWalletLink from './index';

const sendObject = {
  send: jest.fn().mockImplementation((x, y) => Promise.resolve('enable')),
};
const resolvedObject = {
  makeWeb3Provider: jest.fn().mockImplementation((x, y) => sendObject),
};

describe('ConnectToWalletLink', () => {
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

  it('should test async ConnectToWalletLink Failed', async () => {
    await expect(
      ConnectToWalletLink(
        function (data) {
          return {};
        },
        { infuraId: 'infuraId' }
      )
    ).rejects.toThrow('walletLink.makeWeb3Provider is not a function');
  });

  it('should test async ConnectToWalletLink', async () => {
    await expect(
      ConnectToWalletLink(
        function (data) {
          return resolvedObject;
        },
        { infuraId: 'infuraId' }
      )
    ).resolves.toBe(sendObject);
  });

  it('should test async ConnectToWalletLink, Undefined Option', async () => {
    await expect(
      ConnectToWalletLink(function (data) {
        return resolvedObject;
      }, undefined)
    ).resolves.toBe(sendObject);
  });
});
