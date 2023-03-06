import { ChainDataList } from '../../types';

export const Chains: ChainDataList = {
  1: {
    chainId: 1,
    chain: 'ETH',
    name: 'Ethereum',
    network: 'mainnet',
    networkId: 1,
    rpc: process.env.NEXT_PUBLIC_RPC_ETH,
  },

  3: {
    chainId: 3,
    chain: 'ETH',
    name: 'Ethereum',
    network: 'ropsten',
    networkId: 3,
  },
  4: {
    chainId: 4,
    chain: 'ETH',
    network: 'rinkeby',
    networkId: 4,
  },
  5: {
    chainId: 5,
    chain: 'ETH',
    network: 'goerli',
    networkId: 5,
  },
  10: {
    chainId: 10,
    chain: 'ETH',
    network: 'optimism',
    networkId: 10,
  },
  56: {
    chainId: 56,
    chain: 'BSC',
    name: 'Binance Smart Chain',
    network: 'binance',
    networkId: 56,
    rpc: process.env.NEXT_PUBLIC_RPC_BSC,
  },

  97: {
    chainId: 97,
    chain: 'BSC-TEST',
    name: 'Testnet-BSC',
    network: 'binance-testnet',
    networkId: 97,

    rpc: process.env.NEXT_PUBLIC_RPC_BSC_TEST,
  },
  137: {
    chainId: 137,
    chain: 'MATIC',
    name: 'Polygon Mainnet',
    network: 'matic',
    networkId: 137,
    rpc: process.env.NEXT_PUBLIC_RPC_MATIC,
  },
  42161: {
    chainId: 42161,
    chain: 'ETH',
    network: 'arbitrum',
    networkId: 42161,
  },

  80001: {
    chainId: 80001,
    chain: 'matic',
    name: 'Polygon',
    network: 'mumbai',
    networkId: 80001,
  },
  43113: {
    chainId: 43113,
    chain: 'AVAX',
    name: 'Avalanche',
    network: 'avalanche-fuji-testnet',
    networkId: 43113,
    rpc: process.env.NEXT_PUBLIC_RPC_AVAX_TEST,
  },
  43114: {
    chainId: 43114,
    chain: 'AVAX',
    name: 'Avalanche',
    network: 'avalanche-fuji-mainnet',
    networkId: 43114,
    rpc: process.env.NEXT_PUBLIC_RPC_AVAX,
  },
  421611: {
    chainId: 421611,
    chain: 'ETH',
    network: 'arbitrum-rinkeby',
    networkId: 421611,
  },
};

export const ChainsByName: ChainDataList = {
  'ETH/1': {
    chainId: 1,
    chain: 'ETH',
    network: 'mainnet',
    networkId: 1,
  },
  'ETH/3': {
    chainId: 3,
    chain: 'ETH',
    network: 'ropsten',
    networkId: 3,
  },
  'ETH/4': {
    chainId: 4,
    chain: 'ETH',
    network: 'rinkeby',
    networkId: 4,
  },
  'ETH/5': {
    chainId: 5,
    chain: 'ETH',
    network: 'goerli',
    networkId: 5,
  },

  'ETH/42': {
    chainId: 42,
    chain: 'ETH',
    network: 'kovan',
    networkId: 42,
  },
  'BSC/56': {
    chainId: 56,
    chain: 'BSC',
    name: 'Binance Smart Chain',
    network: 'binance',
    networkId: 56,
  },
  'ETH/69': {
    chainId: 69,
    chain: 'ETH',
    network: 'optimism-kovan',
    networkId: 69,
  },

  'BSC/97': {
    chainId: 97,
    chain: 'BSC',
    name: 'Binance Smart Chain',
    network: 'binance-testnet',
    networkId: 97,
  },

  'MATIC/137': {
    chainId: 137,
    chain: 'MATIC',
    name: 'Polygon',
    network: 'matic',
    networkId: 137,
  },

  'ETH/42161': {
    chainId: 42161,
    chain: 'ETH',
    network: 'arbitrum',
    networkId: 42161,
  },

  'AVAX/43113': {
    chainId: 43113,
    chain: 'AVAX',
    name: 'Avalanche',
    network: 'avalanche-fuji-testnet',
    networkId: 43113,
  },
  'AVAX/43114': {
    chainId: 43114,
    chain: 'AVAX',
    name: 'Avalanche',
    network: 'avalanche-fuji-mainnet',
    networkId: 43114,
  },

  'MUMBAI/80001': {
    chainId: 80001,
    chain: 'MUMBAI',
    network: 'mumbai',
    networkId: 80001,
  },
};
