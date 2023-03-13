import Web3 from 'web3';
import { ChainData } from '../../types';
import { Chains } from '../chains';
import { Storage } from '@/shared/utils';
import {
  THEME_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
} from '@/shared/constants';
// import { get, has, isEmpty } from 'lodash';
import { notification } from 'antd';
import { Dispatch } from 'react';
import BN from 'bn.js';
import { toBN } from 'web3-utils';
import { BaseProviderActions, BaseProviderActionTypes } from '../../../base';

export const getChainId = (network: string): number => {
  const chains: ChainData[] = Object.values(Chains);
  const match = chains.filter((x) => x.network === network)[0] as ChainData;
  if (!match) {
    throw new Error(`No chainId found match ${network}`);
  }
  return match.chainId;
};

export const getProvider = (chainId: number): any => {
  return new Web3.providers.HttpProvider(String(Chains[chainId].rpc));
};

export const signMessage = async (
  web3: Web3,
  options: {
    chainId: number;
    accounts: string[];
  }
) => {
  const storage = new Storage(
    WEB3_SIGNATURE_STORAGE_KEY,
    {},
    {
      set: WEB3_SIGNATURE_STORAGE_SET_KEY,
    }
  );

  // const chainIdStorage = get(storage.get(), 'chainId');
  // const timestampStorage = get(storage.get(), 'timestamp');
  // const isGreaterThan24Hours =
  //   timestampStorage &&
  //   new Date().getTime() - parseInt(timestampStorage) > 86400000;

  // if (
  //   isEmpty(storage.get()) ||
  //   !has(localStorage, WEB3_CACHED_PROVIDER_KEY) ||
  //   chainIdStorage !== options.chainId ||
  //   isGreaterThan24Hours
  // ) {
  const walletAddress = options.accounts[0];
  const messageObject = {
    chainId: options.chainId,
    timestamp: Date.now(),
  };

  // These formatting is important for displaying the signing message.
  const message = web3.utils.fromUtf8(
    `Welcome to SatoshiStudio! Click to sign in and 
accept the SatoshiStudio Terms of Service: 
${
  process.env.NEXT_PUBLIC_TERMS_OF_SERVICE ??
  'https://satoshistudio.tawk.help/article/terms-of-service'
}

This request will not trigger a blockchain transaction 
or cost any gas fees.

Your authentication status will reset after 24 hours.

Chain ID: ${messageObject.chainId}

Address: 
${walletAddress}

Nonce: ${messageObject.timestamp}`
  );
  // //console.log(`"${message}"`);
  await web3.eth.personal.sign(
    message,
    walletAddress,
    (process.env.NEXT_PUBLIC_APP_NAME ?? '') as string,
    (error: Error, signature: string) => {
      if (error) {
        return;
      }

      notification.success({
        placement: 'bottomLeft',
        message: 'Wallet Connected Successfully',
      });

      storage.update((prevState) => {
        return {
          ...prevState,

          ...messageObject,
          signature,
          address: walletAddress,
          message,
          connectionEnvironment: 'evm',
        };
      });
    }
  );
  // }
};

export const clearProvider = (dispatch: Dispatch<BaseProviderActions>) => {
  Storage.keepOnly(['persist:metacomic', THEME_STORAGE_KEY]);
  dispatch({
    type: BaseProviderActionTypes.DISCONNECTED,
    payload: {
      isConnected: false,
      isConnecting: false,
      evm: {
        provider: null,
        chainId: undefined,
        providerName: undefined,
        accounts: [],
      },
    },
  });
};

export const onWalletConnectionError = (
  dispatch: Dispatch<BaseProviderActions>,
  e: any
) => {
  clearProvider(dispatch);
  notification.error({
    placement: 'bottomLeft',
    message: "We couldn't connect to your wallet.",
    description: (
      <div>
        <div style={{ paddingBottom: 20 }}>
          <span>{e?.message ?? 'Something went wrong'}</span>
        </div>
        <div
          style={{ paddingBottom: 20, color: 'var(--text-secondary-color)' }}
        >
          If issue persist, please contact support.
        </div>
        {e.code && (
          <span style={{ color: 'var(--disabled-color)' }}>
            Error code: {e.code}
          </span>
        )}
      </div>
    ),
    duration: 10,
  });
  return null;
};

export const getSignatureData = (
  chainId: number,
  name: string,
  structure: any[],
  message: any,
  verifyingContractAddress: string,
  verifyingContractName?: string
): any => {
  const domain = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'contract', type: 'address' },
  ];
  const domainData = {
    name: verifyingContractName || 'MCTrader',
    version: '1',
    chainId: chainId,
    contract: verifyingContractAddress,
  };
  const data = {
    types: {
      EIP712Domain: domain,
      [name]: structure,
    },
    domain: domainData,
    primaryType: name,
    message: message,
  };
  return data;
};

export const signV4 = (
  provider: any,
  address: string,
  data: any,
  callback: (err?: any, result?: any) => void
) => {
  const params = [address, JSON.stringify(data)];
  const method = 'eth_signTypedData_v4';

  return provider.sendAsync(
    {
      method,
      params,
      from: address,
    },
    callback
  );
};

export const objectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

export const signSale = (
  provider: any,
  address: string,
  chainId: number,
  sale: any,
  callback: (err?: any, result?: any) => void
) => {
  sale.data = Web3.utils.stringToHex(sale.data || '');
  sale.hash = Web3.utils.soliditySha3(
    { type: 'string', value: sale.saleId },
    { type: 'string', value: sale.assetId },
    { type: 'address', value: sale.seller },
    { type: 'address', value: sale.token },
    { type: 'uint256', value: sale.tokenId },
    { type: 'uint256', value: sale.saleType },
    { type: 'uint256', value: sale.assetType }
  );
  // //console.log('SALLLLLLLE', sale);
  const dataTypes = [
    // { name: 'seller', type: 'address' },
    // { name: 'token', type: 'address' },
    // { name: 'tokenId', type: 'uint256' },
    // { name: 'saleId', type: 'string' },
    // { name: 'saleType', type: 'uint256' },
    // { name: 'assetType', type: 'uint256' },
    // { name: 'price', type: 'uint256' },
    // { name: 'royalty', type: 'uint256' },
    // { name: 'mint', type: 'bool' },
    // { name: 'maxSupply', type: 'uint256' },
    // { name: 'endDate', type: 'uint256' },
    // { name: 'data', type: 'bytes' },

    { name: 'hash', type: 'bytes32' },
    { name: 'price', type: 'uint256' },
    { name: 'royalty', type: 'uint256' },
    { name: 'maxSupply', type: 'uint256' },
    { name: 'startDate', type: 'uint256' },
    { name: 'endDate', type: 'uint256' },
  ];

  const data = getSignatureData(
    chainId,
    'Sale',
    dataTypes,
    sale,
    String(process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS)
  );

  // colorized console
  //console.log(
  //   '%cData',
  //   'color: #00a0e9; font-weight: bold; font-size: 30px',
  //   data,
  //   sale
  // );
  return signV4(provider, address, data, callback);
};

export const signBid = (
  provider: any,
  address: string,
  chainId: number,
  bid: {
    saleSignature: string;
    amount: string | BN;
    nonce?: string;
  },
  callback: (err?: any, result?: any) => void
): any => {
  const dataTypes = [
    { name: 'saleSignature', type: 'bytes' },
    { name: 'amount', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
  ];
  if (!bid.nonce) bid.nonce = String(Math.floor(Date.now() / 1000));
  const data = getSignatureData(
    chainId,
    'Bid',
    dataTypes,
    bid,
    String(process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS)
  );
  // return web3.eth.signTypedData(data);
  return signV4(provider, address, data, callback);
};

export const signOffer = (
  provider: any,
  address: string,
  chainId: number,
  offer: {
    expiry: number;
    price: string | BN;
    token: string;
    tokenId: string;
    offerId: string;
    nonce?: string;
  },
  callback: (err?: any, result?: any) => void
): any => {
  const dataTypes = [
    // { name: 'owner', type: 'address' },
    { name: 'offerId', type: 'string' },
    { name: 'token', type: 'address' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'price', type: 'uint256' },
    { name: 'expiry', type: 'uint256' },
  ];

  if (!offer.nonce) {
    offer.nonce = String(Math.floor(Date.now() / 1000));
  }
  const data = getSignatureData(
    chainId,
    'Offer',
    dataTypes,
    offer,
    String(process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS)
  );
  // return web3.eth.signTypedData(data);
  return signV4(provider, address, data, callback);
};

export const toWei = function (amount: string | number, currencyDecimals = 18) {
  return Web3.utils
    .toBN(Web3.utils.toWei(String(amount)))
    .div(toBN('10').pow(toBN(18 - currencyDecimals)))
    .toString();
};
export const toEther = function (
  amount: string | BN,
  decimals = 5,
  currencyDecimals = 18
) {
  amount = amount ? String(amount) : '0';
  if (!amount || isNaN(parseInt(amount))) return '0';
  const diff = 18 - currencyDecimals;
  const multi = Web3.utils.toBN('10').pow(Web3.utils.toBN(diff));
  const value = Web3.utils.fromWei(
    Web3.utils.toBN(amount).mul(multi).toString()
  );
  if (decimals == -1) return value;
  if (!value.includes('.')) return value;
  return value.substring(0, value.indexOf('.') + decimals + 1);
};

export const fixDecimals = function (amountInWei: BN, newDecimals: number): BN {
  return amountInWei.div(toBN('10').pow(toBN(18 - newDecimals)));
};

export const getSaleTypeActionTitle = (saleType: string | number) => {
  switch (saleType) {
    case 'BuyNow':
    case 0:
      return 'Buy now';
    case 'Auction':
    case 1:
      return 'Place a bid';
    default:
      return '';
  }
};

export const getBtcSeedSignature = (params: {
  environment: 'evm' | 'solana' | 'near';
  walletAddress: string;
  user: string;
}) => {
  return `Satoshi Studio Ordinal Wallet: 

Network: ${params.environment}
Address: ${params.walletAddress.toLowerCase()}
Nonce: ${params.user}`;
};
export * from './contracts';
