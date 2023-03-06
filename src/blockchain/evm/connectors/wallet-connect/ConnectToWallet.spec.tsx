import { cleanup } from '@testing-library/react';
import ConnectToWalletConnect from './index';

const enableObject = jest
  .fn()
  .mockImplementation(() => Promise.resolve('enable'));
const resolvedObject = {
  enable: enableObject,
};

describe('ConnectToWalletConnect', () => {
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
  // it('should test async ConnectToWalletConnect "Fail"', async () => {

  //     await waitFor(() => {
  //       expect(
  //         ConnectToWalletConnect({}, {})
  //         ).rejects.toThrow('WalletConnectProvider is not a constructor');
  //     });
  // });

  it('should test async ConnectToWalletConnect "Failed" ', async () => {
    await expect(
      ConnectToWalletConnect(
        function (params) {
          return {};
        },
        { network: 'mainnet', bridge: '' }
      )
    ).rejects.toThrow('provider.enable is not a function');
  });

  it('should test async ConnectToWalletConnect "No 1" ', async () => {
    await expect(
      ConnectToWalletConnect(
        function (params) {
          return resolvedObject;
        },
        { bridge: '' }
      )
    ).resolves.toBe(resolvedObject);
  });

  it('should test async ConnectToWalletConnect "No 2" ', async () => {
    await expect(
      ConnectToWalletConnect(
        function (params) {
          return resolvedObject;
        },
        { network: 'mainnet', bridge: '' }
      )
    ).resolves.toBe(resolvedObject);
  });

  it('should test async ConnectToWalletConnect "No 3" ', async () => {
    await expect(
      ConnectToWalletConnect(function (params) {
        return resolvedObject;
      }, undefined)
    ).resolves.toBe(resolvedObject);
  });

  it('should test async ConnectToWalletConnect "No 3" ', async () => {
    await expect(
      ConnectToWalletConnect(
        function (params) {
          return resolvedObject;
        },
        { network: 'mainnet', bridge: '', qrcode: true }
      )
    ).resolves.toBe(resolvedObject);
  });
});
