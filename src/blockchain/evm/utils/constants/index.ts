import { Chains } from '../index';
import { CryptoIcons } from '../icons';
import { SOLANA_CHAIN_ID } from '@/shared/constants';

export interface BiddingTokensInterface {
  address: string;
  symbol: string;
  name: string;
}

export const BIDDING_TOKENS: Record<
  string,
  Record<string, any>
> = Object.freeze({
  hCOMI: {
    address: process.env.NEXT_PUBLIC_COMI_TOKEN_ADDRESS as string,
    symbol: process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL as string,
    name: process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL as string,
  },
});

export const APP_TOKENS = {
  ...BIDDING_TOKENS,
};

export const SUPPORTED_USD_TOKENS: any = {
  97: {
    symbol: 'BUSD',
    address: '0xDA30eE710eFA84BeB91FD918365f5Ed1B165e5C8',
    icon: CryptoIcons.BUSD,
    decimals: 18,
  },
  1: {
    symbol: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    icon: CryptoIcons.USDT,
    decimals: 6,
  },
  56: {
    symbol: 'BUSD',
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    icon: CryptoIcons.BUSD,
    decimals: 18,
  },
  137: {
    symbol: 'USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    icon: CryptoIcons.USDC,
    decimals: 6,
  },
  43114: {
    symbol: 'USDC',
    address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    icon: CryptoIcons.USDC,
    decimals: 6,
  },
};

export const SUPPORTED_NETWORKS: any = {
  // 56: {
  //   usdToken: SUPPORTED_USD_TOKENS[56],
  //   rpcURL: 'https://bsc-dataseed.binance.org',
  //   explorerURL: 'https://bscscan.com',
  //   icon: CryptoIcons['bsc'],
  //   nativeCurrency: {
  //     decimals: 18,
  //     symbol: 'BNB',
  //     name: 'Binance Coin',
  //   },
  //   ...Chains[56],
  // },
  // Polygon
  137: {
    usdToken: SUPPORTED_USD_TOKENS[137],
    rpcURL: 'https://polygon-rpc.com',
    explorerURL: 'https://polygonscan.com/',
    icon: CryptoIcons['matic'],
    nativeCurrency: {
      decimals: 18,
      symbol: 'MATIC',
      name: 'Matic',
    },
    ...Chains[137],
  },
  // Ethereum
  1: {
    usdToken: SUPPORTED_USD_TOKENS[1],
    rpcURL: 'https://rpc.ankr.com/eth',
    explorerURL: 'https://etherscan.com/',
    icon: CryptoIcons['eth'],
    nativeCurrency: {
      decimals: 18,
      symbol: 'ETH',
      name: 'Ethereum',
    },
    ...Chains[1],
  },
  // // Avax
  // 43114: {
  //   usdToken: SUPPORTED_USD_TOKENS[43114],
  //   rpcURL: 'https://api.avax.network/ext/bc/C/rpc',
  //   explorerURL: 'https://snowtrace.io/',
  //   icon: CryptoIcons['avax'],
  //   nativeCurrency: {
  //     decimals: 18,
  //     symbol: 'AVAX',
  //     name: 'Avalanche',
  //   },
  //   ...Chains[43114],
  // },
  97: {
    usdToken: SUPPORTED_USD_TOKENS[97],
    rpcURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    explorerURL: 'https://testnet.bscscan.com',
    icon: CryptoIcons['bsc'],
    nativeCurrency: {
      decimals: 18,
      symbol: 'BNB',
      name: 'Testnet-BSC',
    },
    ...Chains[97],
  },
  [SOLANA_CHAIN_ID]: {
    usdToken: SUPPORTED_USD_TOKENS[SOLANA_CHAIN_ID],
    rpcURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    explorerURL: 'https://testnet.bscscan.com',
    icon: CryptoIcons['solana'],
    nativeCurrency: {
      decimals: 18,
      symbol: 'SOL',
      name: 'Solana',
    },
    ...Chains[97],
  },
};

export const SUPPORTED_NETWORKS_TO_LABELS = Object.values(
  SUPPORTED_NETWORKS
).map((network: any) => {
  return {
    value: network.chainId,
    label: network?.name ?? network.chain,
    chain: network.chain,
    usdToken: network.usdToken,
  };
});
