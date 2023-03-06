import { createContext, ReactNode, useEffect, useState } from 'react';
import { useWallet } from '@/hooks';
import Web3 from 'web3';

export interface WalletContextValues {
  address?: string;
  chainId?: number;
  onConnect: () => Promise<void>;
  getBalance?: (address: string) => Promise<string | undefined>;
  getMetadata?: (address: string) => Promise<
    | {
        chainId: number;
        walletId: string;
      }
    | undefined
  >;
  onDisconnect: () => Promise<void>;
}

interface WalletContextProps {
  children: ReactNode;
}

export const WalletContext = createContext<WalletContextValues>({
  onConnect: async () => {},
  onDisconnect: async () => {},
});

export const WalletProvider = (props: WalletContextProps) => {
  const { children } = props;
  const { connect, provider, disconnect } = useWallet({
    autoConnect: true,
    listeners: {},
  });
  const [address, setAddress] = useState<string | undefined>(undefined);

  const getBalance = async (address: string) => {
    if (provider) {
      const web3 = new Web3(provider);
      const balance = await web3.eth.getBalance(address);

      // ethBalance is a BigNumber instance
      // https://github.com/indutny/bn.js/
      const ethBalance = web3.utils.fromWei(balance, 'ether');
      return parseFloat(ethBalance).toFixed(4);
    }
  };

  const onConnect = async () => {
    await connect();
  };

  const onDisconnect = async () => {
    await disconnect();
  };

  const getMetadata = async (provider: any) => {
    if (provider) {
      const web3 = new Web3(provider);
      const chainId = await web3.eth.getChainId();
      const accounts = await web3.eth.getAccounts();
      return {
        walletId: accounts[0],
        chainId,
      };
    }
  };

  const values = {
    onConnect,
    onDisconnect,
    getBalance,
    getMetadata,
    address,
  };

  useEffect(() => {
    getMetadata(provider).then((value) => {
      setAddress(value?.walletId);
    });
  }, [provider]);

  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};
