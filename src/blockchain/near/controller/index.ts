import { getConfig } from '../config';
import {
  connect,
  Contract,
  InMemorySigner,
  keyStores,
  WalletConnection,
} from 'near-api-js';
import { WEB3_CACHED_PROVIDER_KEY } from '@/shared/constants';
import { KeyStore } from 'near-api-js/lib/key_stores';

export class NearProtocolController {
  protected readonly env: string;

  constructor(env: string) {
    this.env = env;
  }

  async connect() {
    const nearConfig = getConfig(this.env ?? process.env.NODE_ENV ?? 'testnet');

    // Initializing connection to the NEAR TestNet
    const near = await connect({
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      ...nearConfig,
    });

    // Needed to access wallet
    const walletConnection = new WalletConnection(
      near,
      (WEB3_CACHED_PROVIDER_KEY ??
        process.env.NEXT_APP_NAME ??
        process.env.NODE_ENV) as string
    );

    // Load in account data
    let currentUser;
    if (walletConnection.getAccountId()) {
      currentUser = {
        accountId: walletConnection.getAccountId(),
        balance: (await walletConnection.account().state()).amount,
      };
    }

    // Initializing our contract APIs by contract name and configuration
    const contract = new Contract(
      walletConnection.account(),
      nearConfig.contractName,
      {
        // View methods are read-only – they don't modify the state, but usually return some value
        viewMethods: NearProtocolController.viewMethods,
        // Change methods can modify the state, but you don't receive the returned value when called
        changeMethods: NearProtocolController.changeMethods,
        // Sender is the account ID to initialize transactions.
        // getAccountId() will return empty string if user is still unauthorized
        sender: walletConnection.getAccountId(),
      } as any
    );

    return { contract, currentUser, nearConfig, walletConnection };
  }

  async sign(_keyStore: KeyStore, _accountId: string, _networkId: string) {
    const signer = new InMemorySigner(_keyStore);
    const encoder = new TextEncoder();

    const messageObject = {
      timestamp: Date.now(),
      accountId: _accountId,
      networkId: _networkId,
    };

    const message = JSON.stringify(messageObject);
    const array = encoder.encode(message);

    const signed = await signer.signMessage(array, _accountId, _networkId);

    const publicKey = signed.publicKey.data.reduce((prev, current) => {
      if (current < 16) {
        return `${prev}0${current.toString(16)}`;
      }
      return `${prev}${current.toString(16)}`;
    }, '');

    const signature = signed.signature.reduce((prev, current) => {
      if (current < 16) {
        return `${prev}0${current.toString(16)}`;
      }
      return `${prev}${current.toString(16)}`;
    }, '');

    return { ...messageObject, signature, address: publicKey, message };
  }

  static changeMethods = ['set_status'];
  static viewMethods = ['get_status'];
}
