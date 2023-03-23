import { networks } from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
const bitcoinNetworks = {
  mainnet: networks.bitcoin,
  testnet: networks.testnet,
};
import { BIP32Factory } from 'bip32';
import ecurve from 'ecurve';
const secp256k1 = ecurve.getCurveByName('secp256k1');
import schnorr from 'bip-schnorr';
import { bech32 } from 'bech32';
import { bech32m } from 'bech32';
import { ecc } from '@/shared/utils/secp';
//import * as ecc from 'tiny-secp256k1';
// const ecc: any = {isPoint: ()=>false};
const bip32 = BIP32Factory(ecc);

export default class Bip86 {
  seed: any = undefined;
  isTestnet = false;
  coinType = 0;
  network: any = undefined;
  xprv: any = null;
  networks: any = bitcoinNetworks;
  xpub: any = null;
  /**
   * Constructor
   * Derive accounts from a mnemonic.
   * @param {string} mnemonic
   * @param {string} password
   * @param {boolean} isTestnet
   * @param {number} coinType - slip44
   * @param {object} network
   * @return
   */
  fromMnemonic(
    mnemonic: string,
    password = '',
    isTestnet?: boolean,
    network?: any,
    coinType?: any
  ): any {
    this.seed = bip39.mnemonicToSeedSync(mnemonic, password);
    this.isTestnet = isTestnet === true;
    this.coinType = this.isTestnet ? 1 : coinType ? coinType : 0; // 0 is for Bitcoin and 1 is testnet for all coins
    this.network =
      network || this.isTestnet
        ? bitcoinNetworks.testnet
        : bitcoinNetworks.mainnet;
    return this;
  }

  /**
   * Constructor
   * Derive accounts from seed.
   * @param {string} mnemonic
   * @param {string} password
   * @param {boolean} isTestnet
   * @param {number} coinType - slip44
   * @param {object} network
   * @return
   */
  fromSeed(
    seed: Buffer,
    isTestnet?: boolean,
    network?: any,
    coinType?: any
  ): any {
    this.seed = seed;
    this.isTestnet = isTestnet === true;
    this.coinType = this.isTestnet ? 1 : coinType ? coinType : 0; // 0 is for Bitcoin and 1 is testnet for all coins
    this.network =
      network || this.isTestnet
        ? bitcoinNetworks.testnet
        : bitcoinNetworks.mainnet;
    return this;
  }

  /**
   * Get root master private key
   * @return {string}
   */
  getRootPrivateKey(): string {
    let xprv = bip32.fromSeed(this.seed, this.network).toBase58();

    return xprv;
  }

  /**
   * Get root master public key
   * @return {string}
   */
  getRootPublicKey(): string {
    let xpub = bip32.fromSeed(this.seed, this.network).neutered().toBase58();

    return xpub;
  }

  /**
   * Derive a new master private key
   * @param {number} number
   * @param {number} changePurpose
   * @return {string}
   */
  deriveAccount(number: number, changePurpose: number): string {
    let purpose = changePurpose || 86,
      keypath = 'm/' + purpose + "'/" + this.coinType + "'/" + number + "'",
      account = bip32
        .fromSeed(this.seed, this.network)
        .derivePath(keypath)
        .toBase58();

    return account;
  }

  /**
   * Constructor
   * Create key pairs from a private master key of mainnet and testnet.
   * @param {string} xprv/tprv
   * @param {object} networks
   */
  fromXPrv(xprv: string, networks?: any) {
    this.networks = networks || bitcoinNetworks;
    this.xprv = xprv;
    this.getNetworkFromPrivKey(xprv);
    return this;
  }

  getNetworkFromPrivKey(xprv: any) {
    let key = xprv.slice(0, 4);

    if (key !== 'xprv' && key !== 'tprv') {
      throw new Error('prefix is not supported');
    }

    if (key === 'xprv') {
      this.network = this.networks.mainnet;
      this.isTestnet = false;
    }

    if (key === 'tprv') {
      this.network = this.networks.testnet;
      this.isTestnet = true;
    }
  }

  /**
   * Get account master private key
   * @return {string}
   */
  getAccountPrivateKey() {
    let xprv = bip32.fromBase58(this.xprv, this.network).toBase58();

    return xprv;
  }

  /**
   * Get account master public key
   * @return {string}
   */
  getAccountPublicKeyFromPrivKey() {
    let xpub = bip32.fromBase58(this.xprv, this.network).neutered().toBase58();

    return xpub;
  }

  /**
   * Get private key
   * @param {number} index
   * @param {boolean} isChange
   * @return {string}
   */
  getPrivateKey(index: number, isChange: boolean) {
    let change = isChange === true ? 1 : 0,
      prvkey = bip32
        .fromBase58(this.xprv, this.network)
        .derive(change)
        .derive(index);

    return prvkey.toWIF();
  }

  /**
   * Get public key
   * @param {number} index
   * @param {boolean} isChange
   * @return {string}
   */
  getPublicKeyFromPrivKey(index: number, isChange: boolean) {
    let change = isChange === true ? 1 : 0,
      pubKey = bip32
        .fromBase58(this.xprv, this.network)
        .derive(change)
        .derive(index).publicKey;

    return pubKey.toString('hex');
  }

  /**
   * Get address
   * @param {number} index
   * @param {boolean} isChange
   * @param {number} purpose
   * @return {string}
   */

  getAddressFromPrivateKey(index: number, isChange: boolean, _?: number) {
    let change = isChange === true ? 1 : 0,
      pubkey = bip32
        .fromBase58(this.xprv, this.network)
        .derive(change)
        .derive(index).publicKey;

    return this.getP2TRAddress(pubkey, this.isTestnet);
  }

  /**
   * Constructor
   * Create public keys and addresses from a public master key of mainnet and testnet.
   * @param {string} xpub/tpub
   * @param {object} networks
   */
  fromXPub(xpub: string, networks: any) {
    this.networks = networks || bitcoinNetworks;
    this.xpub = xpub;
    this.getNetworkFromPubKey(xpub);
  }

  getNetworkFromPubKey(xpub: any) {
    let key = xpub.slice(0, 4);

    if (key !== 'xpub' && key !== 'tpub') {
      throw new Error('prefix is not supported');
    }

    if (key === 'xpub') {
      this.network = this.networks.mainnet;
      this.isTestnet = false;
    }

    if (key === 'tpub') {
      this.network = this.networks.testnet;
      this.isTestnet = true;
    }
  }

  /**
   * Get account master public key
   * @return {string}
   */
  getAccountPublicKeyFromPubKey() {
    let xpub = bip32.fromBase58(this.xpub, this.network).neutered().toBase58();

    return xpub;
  }

  /**
   * Get public key
   * @param {number} index
   * @param {boolean} isChange
   * @return {string}
   */
  getPublicKeyFromPubKey(index: number, isChange: boolean) {
    let change = isChange === true ? 1 : 0,
      xpub = bip32
        .fromBase58(this.xpub, this.network)
        .derive(change)
        .derive(index);

    return xpub.publicKey.toString('hex');
  }

  /**
   * Get address
   * @param {number} index
   * @param {boolean} isChange
   * @param {number} purpose
   * @return {string}
   */
  public getAddressFromPubKey(index: number, isChange: boolean, _?: string) {
    let change = isChange === true ? 1 : 0,
      pubkey = bip32
        .fromBase58(this.xpub, this.network)
        .derive(change)
        .derive(index).publicKey;

    return this.getP2TRAddress(pubkey, this.isTestnet);
  }

  public getP2TRAddress(pubkey: Buffer, testnet = false) {
    const pubKey = ecurve.Point.decodeFrom(secp256k1, pubkey);
    const taprootPubkey = schnorr.taproot.taprootConstruct(pubKey);
    const words = bech32.toWords(taprootPubkey);
    words.unshift(1);
    return bech32m.encode(testnet ? 'tb' : 'bc', words);
  }
}
