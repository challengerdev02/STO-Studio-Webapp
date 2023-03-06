export interface AuthereumConnectorOptions {
  networkName: string;
  apiKey: string;
  rpcUri: string;
  webUri: string;
  xsUri: string;
  blockedPopupRedirect: boolean;
  forceRedirect: boolean;
  disableNotifications: boolean;
  disableGoogleAnalytics: boolean;
  network?: string;
}

const ConnectToAuthereum = (
  Authereum: any,
  options: Partial<AuthereumConnectorOptions> = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authereum = new Authereum({
        ...options,
        networkName: options.networkName || options.network,
      });
      const provider = authereum.getProvider();
      provider.authereum = authereum;
      await provider.enable();
      resolve(provider);
    } catch (error) {
      return reject(error);
    }
  });
};

export default ConnectToAuthereum;
