export interface Network {
  nodeUrl: string;
  chainId?: string;
  gasRelayHubAddress?: string;
}

export type Scope = 'email';

export interface Options {
  scope?: Scope[];
  gasRelay?: boolean;
  registerPageByDefault?: boolean;
  pocketDevId?: string;
}

// export interface PortisConnectorOptions extends AbstractConnectorOptions {
//   id: string;
//   config?: Options;
// }

export interface PortisConnectorOptions {
  id: string;
  config?: Options;
  network?: string;
}

const ConnectToPortis = (Portis: any, options: PortisConnectorOptions) => {
  return new Promise(async (resolve, reject) => {
    if (options && options.id) {
      try {
        const id = options.id;
        const network = options.network || 'mainnet';
        const config = options.config;
        const pt = new Portis(id, network, config);
        await pt.provider.enable();
        pt.provider._portis = pt;
        resolve(pt.provider);
      } catch (error) {
        return reject(error);
      }
    } else {
      return reject(new Error('Missing Portis Id'));
    }
  });
};

export default ConnectToPortis;
