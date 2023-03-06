import WalletConnectProvider from '@walletconnect/web3-provider';
import ethProvider from 'eth-provider';
import { WalletLink } from 'walletlink';
import Fortmatic from 'fortmatic';
import Authereum from 'authereum';
// import Torus from "@toruslabs/torus-embed";
import Portis from '@portis/web3';
import Torus from '@toruslabs/torus-embed';
import { toHex } from 'web3-utils';

export const providerOptions = Object.freeze({
  'wallet-link': {
    package: WalletLink, // Required
    options: {
      appName: 'MetaComic', // Required
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  'wallet-connect': {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
  bsc: {
    package: true,
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: process.env.NEXT_PUBLIC_FORMATIC_KEY,
    },
  },
  authereum: {
    package: Authereum, // required
  },
  torus: {
    package: typeof window !== undefined ? Torus : {}, // required
    options: {
      init: {
        network: {
          host: 'matic',
          chainId: toHex(137), // optional
          networkName: 'Polygon mainnet',
        },
        buildEnv: 'production', // uses staging.tor.us
        enableLogging: true,
        defaultVerifier: 'google',
      },
      config: {
        buildEnv: 'production', // optional
      },
    },
  },
  portis: {
    package: Portis, // required
    options: {
      id: process.env.NEXT_PUBLIC_PORTIS_ID,
    },
  },
  frame: {
    package: ethProvider, // required
  },
});
