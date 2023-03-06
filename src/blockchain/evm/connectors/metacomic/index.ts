import { Web3Provider } from 'ethers/providers';
import { SUPPORTED_NETWORKS } from '../../utils';

type InternalWalletOptions = {
  id: string;
  address: string;
  privateKey: string;
  chainId: number;
};
export const connectToInternalWallet = async (
  options: InternalWalletOptions
) => {
  let provider = null;
  if (typeof window.ethereum !== 'undefined') {
    provider = window.ethereum;
    try {
      await provider.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      throw new Error('User Rejected');
    }
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else {
    provider = new Web3Provider({
      isMetaMask: false,
      host: SUPPORTED_NETWORKS[options.chainId]?.rpcURL,
      path: '',
      sendAsync: (
        _: any,
        callback: (error: any, response: any) => any
      ): any => {
        if (callback) callback(null, null);
        return null;
      },
      send: (_: any, callback: (error: any, response: any) => void): any => {
        if (callback) callback(null, null);
        return null;
      },
    });
  }
  return provider;
};

export default connectToInternalWallet;
