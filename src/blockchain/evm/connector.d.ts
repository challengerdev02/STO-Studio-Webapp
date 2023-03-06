interface EVMWalletConnectorState {
  provider?: any;
  providerName?: string;
  accounts?: string[];
  chainId?: number;
  chainChangeCallback?: () => void;
  signedAddress?: string;
  // [x as string]: any;
}

export interface EVMWalletConnectorExtendedValues {
  verifyEVMChain?: (
    chainId: string,
    rpcURLs: string[],
    chainName: string,
    nativeCurrency?: Record<string, any>,
    blockExplorerUrls?: string[],
    callback?: () => void
  ) => Promise<any>;
}
