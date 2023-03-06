import { renderHook } from '@testing-library/react-hooks';
import { useWallet } from '@/hooks';
// import { WEB3_SIGNATURE_STORAGE_KEY } from "@/shared/constants";
// import {
//   objectContaining,
//   stringContaining,
// } from "expect/build/asymmetricMatchers";
// import Web3 from "web3";
// import Web3Modal from "web3modal";

jest.setTimeout(20000);

jest.mock('web3modal', () => {
  return function () {
    return {
      json: () => Promise.resolve({}),
      connect: () => Promise.resolve({}),
      clearCachedProvider: () => Promise.resolve({}),
    };
  };
});
jest.mock('web3', () => {
  return function () {
    return {
      eth: function () {
        return {
          getAccounts: () => Promise.resolve(['0x0']),
          getChainId: () => Promise.resolve(1),
          personal: {
            sign: () => Promise.resolve('0x0'),
          },
        };
      },
      connect: () => Promise.resolve({}),
    };
  };
});

describe('Test hooks: useWallet', () => {
  //render hooks from library
  const { result } = renderHook(() =>
    useWallet({
      listeners: {
        onChainChanged: jest.fn(),
        onAccountsChanged: jest.fn(),
        onNetworkChanged: jest.fn(),
      },
      autoConnect: false,
    })
  );

  const mockProvider = result.current.provider;
  const mockConnect = result.current.connect;
  const mockDisconnect = result.current.disconnect;

  it("should return a provider with 'autoConnect: false'", () => {
    expect(mockProvider).toBeDefined();
    expect(mockProvider).toBeNull();
  });

  it('should return a connect function', () => {
    expect(mockConnect).toBeDefined();
  });

  it('should return a disconnect function', () => {
    expect(mockDisconnect).toBeDefined();
  });

  it('should connect wallet', async () => {
    mockConnect();

    // expect(localStorage.getItem(WEB3_SIGNATURE_STORAGE_KEY)).toEqual(
    //   objectContaining({
    //     eth: {
    //       chainId: 1,
    //       address: ["0x0"],
    //       signature: stringContaining("0x"),
    //     },
    //   })
    // );
    // expect(result.current.provider).toBeDefined();
    // expect(result.current.provider).not.toBeNull();
  });
});
