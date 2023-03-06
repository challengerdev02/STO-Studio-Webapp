export type ChainData = {
  chainId: number;
  chain: string;
  name?: string;
  network: string;
  networkId: number;
  rpc?: string;
};

export type ChainDataList = {
  [chainId: number | string]: ChainData;
};

export interface ControllerOptions {
  providerOptions: ProviderOptions;
  network: string;
}

export interface ProviderOptions {
  [id: string]: {
    package: any;
    options?: any;
    connector?: Connector;
  };
}

export type Connector = (provider?: any, options?: any) => Promise<any>;

export interface ProviderDisplay {
  name: string;
  logo: string;
  description?: string;
}

export interface ProviderDisplayWithConnector extends ProviderDisplay {
  id: string;
  connector: any;
  package?: {
    required: string | string[] | string[][];
  };
}

export interface ProviderOptions {
  [id: string]: {
    package: any;
    options?: any;
    connector?: Connector;
    display?: Partial<ProviderDisplay>;
  };
}

export interface ProviderInfo extends ProviderDisplay {
  id: string;
  type: string;
  check: string;
  package?: {
    required: string | string[] | string[][];
  };
}

export interface EventCallback {
  event: string;
  callback: (result: any) => void;
}
