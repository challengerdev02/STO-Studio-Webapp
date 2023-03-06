import {
  Connector,
  ControllerOptions,
  ProviderDisplayWithConnector,
  ProviderOptions,
} from '../types';
import connectors from '../connectors';
import { Web3ProvidersInfo } from '../utils/provider-info';
import { get } from 'lodash';

export class Web3Controller {
  protected options: ControllerOptions;
  protected readonly providerOptions: ProviderOptions = {};
  protected providers: ProviderDisplayWithConnector[];
  protected network: string = 'mainnet';

  constructor(options: ControllerOptions) {
    this.options = options;
    this.providerOptions = options.providerOptions;
    this.network = options.network;

    this.providers = Object.keys(connectors).map((key) => {
      const connector = get(connectors, key);
      const providerInfo = Web3ProvidersInfo[key];
      return {
        ...providerInfo,
        name: key,
        display: connector.display,
        connector,
      };
    });
  }

  private getConnector(provider: string): Connector {
    const providerInfo = this.providers?.find((p) => p.id === provider);
    if (!providerInfo) {
      throw new Error(`Provider ${provider} not found`);
    }
    return providerInfo.connector;
  }

  public async connect(providerName: string): Promise<any> {
    const providerPackage = get(this.providerOptions, [
      providerName,
      'package',
    ]);
    const providerOptions = get(this.providerOptions, [
      providerName,
      'options',
    ]);

    const connector = this.getConnector(providerName);

    const opts = { network: this.network, ...providerOptions };
    return await connector(providerPackage, opts);
  }

  public async addBSCMainnet(provider: any) {
    const params = [
      {
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        iconUrls: [],
        blockExplorerUrls: ['https://bscscan.com/'],
      },
    ];
    return await provider.request({
      method: 'wallet_addEthereumChain',
      params,
    });
  }

  public static async verifyChain(
    provider: any,
    chainId: string,
    rpcURLs: string[],
    chainName: string,
    nativeCurrency?: Record<string, any>,
    blockExplorerUrls?: string[]
  ) {
    try {
      // check if the chain to connect to is installed
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }], // chainId must be in hexadecimal numbers
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (
        error.code === 4902 ||
        error.code === -32603 ||
        new RegExp('unrecognized chain id').test(error.message?.toLowerCase?.())
      ) {
        try {
          const params = {
            chainId,
            rpcUrls: rpcURLs,
            chainName,
            nativeCurrency,
            blockExplorerUrls,
          };

          //console.log(params);
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [params],
          });

          return;
        } catch (addError) {
          throw addError;
        }
      }
      // console.error('error');
      throw error;
    }
  }
}
