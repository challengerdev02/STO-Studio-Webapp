import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import bip86 from '../bip86';
import * as ecc from 'tiny-secp256k1';
import ecurve from 'ecurve';
import schnorr from 'bip-schnorr';
import { bech32, bech32m } from 'bech32';
import * as bitcoin from 'bitcoinjs-lib';
import * as secp from '@noble/secp256k1';
import { Storage } from '@/shared/utils';
import { BIP32Factory } from 'bip32';
import {
  randomBytes,
  createHash,
  createCipheriv,
  createDecipheriv,
} from 'crypto';
import { BTC_WALLET_KEY } from '@/shared/constants';
const secp256k1 = ecurve.getCurveByName('secp256k1');
const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);
const { payments, networks } = bitcoin;

const algorithm = 'aes-256-cbc';

export const toTapRoot = function (publicKey: any) {
  const pubKey = ecurve.Point.decodeFrom(secp256k1, publicKey);
  const taprootPubkey = schnorr.taproot.taprootConstruct(pubKey);
  const words = bech32.toWords(taprootPubkey);
  words.unshift(1);
  return bech32m.encode('bc', words);
};

export const createWallet = function (): any {
  // const entropy =
  // const mnemonic = generateMnemonic(128);
  const mnemonic =
    'friend bone later flock comic hamster method change extend analyst rent put';

  const seed = mnemonicToSeedSync(mnemonic);

  const bitcoinNetwork = networks.bitcoin;

  const node = bip32.fromSeed(seed, bitcoinNetwork);
  const privateKey: any = node.privateKey;
  const fingerprint = node.fingerprint.slice(0, 4).toString('hex');

  const keyPair: { publicKey: any; privateKey: any } = {
    publicKey: Buffer.from(node.publicKey),
    privateKey,
  };

  const root = new bip86().fromMnemonic(mnemonic, undefined, false);
  const child0 = root.deriveAccount(0);
  const account0 = new bip86().fromXPrv(child0);
  return {
    mnemonic,
    privateKey: privateKey,
    publicKey: secp.utils.bytesToHex(keyPair.publicKey),
    // address: payments.p2pkh({ pubkey: keyPair.publicKey }).address,
    // address: account0.getAddressFromPrivateKey(0, true),
    tapRootAddress: account0.getAddressFromPrivateKey(0, true),
    fingerprint,
    descriptor: `[${fingerprint}/86'/0'/0']${account0.getAccountPublicKeyFromPrivKey()}`,
  };
};

export const encryptWallet = (
  privateKey: string | Buffer,
  password: string,
  _?: (p: number) => void
): { iv: string; encrypted: string } => {
  const key = createHash('md5').update(password).digest('hex');
  const iv = randomBytes(16);
  // const encryptedKey = bip38.encrypt(privateKey, true, password, function (status) {
  //     if( progress) progress(status.percent);
  // });
  let cipher = createCipheriv(algorithm, Buffer.from(key), iv);
  if (typeof privateKey == 'object') privateKey = privateKey.toString('hex');
  let encrypted = cipher.update(privateKey);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encrypted: encrypted.toString('hex') };
};

export const decryptWallet = (
  { iv, encrypted }: { encrypted: string; iv: string },
  password: string,
  _?: (p: number) => void
): string => {
  const key = createHash('md5').update(password).digest('hex');

  const ivBuffer = Buffer.from(iv, 'hex');
  const encryptedBuffer = Buffer.from(encrypted, 'hex');

  let decipher = createDecipheriv(algorithm, Buffer.from(key), ivBuffer);

  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

export const loadWallet = (account: string, passphrase: string) => {
  let storage = new Storage(`${BTC_WALLET_KEY}/${account.toLowerCase()}`);
  let data = storage.get();
  if (data) data = JSON.parse(data);
  return decryptWallet(data as { encrypted: string; iv: string }, passphrase);
};
