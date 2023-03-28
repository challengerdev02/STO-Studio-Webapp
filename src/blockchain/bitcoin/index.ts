import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import bip86 from '../bip86';
// import * as ecc from 'tiny-secp256k1';

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
import { ecc } from '@/shared/utils/secp';
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

export const createWallet = function (seed?: Buffer): any {
  // const entropy =
  let mnemonic;
  if (!seed) {
    // const mnemonic = generateMnemonic(128);
    mnemonic =
      'friend bone later flock comic hamster method change extend analyst rent put';
    seed = mnemonicToSeedSync(mnemonic);
  }
  const bitcoinNetwork = networks.bitcoin;

  const node = bip32.fromSeed(seed, bitcoinNetwork);
  const privateKey: any = node.privateKey;
  const fingerprint = node.fingerprint.slice(0, 4).toString('hex');

  const keyPair: { publicKey: any; privateKey: any } = {
    publicKey: Buffer.from(node.publicKey),
    privateKey,
  };

  const root = new bip86().fromSeed(seed, undefined, false);
  const child0 = root.deriveAccount(0);
  const account0 = new bip86().fromXPrv(child0);
  return {
    mnemonic: mnemonic,
    privateKey: privateKey,
    publicKey: secp.utils.bytesToHex(keyPair.publicKey),
    seed,
    // address: payments.p2pkh({ pubkey: keyPair.publicKey }).address,
    // address: account0.getAddressFromPrivateKey(0, true),
    tapRootAddress: account0.getAddressFromPrivateKey(0, false),
    fingerprint,
    descriptor: `[${fingerprint}/86'/0'/0']${account0.getAccountPublicKeyFromPrivKey()}`,
  };
};
export const md5 = (message: string) =>
  createHash('md5').update(message).digest('hex');

export const encryptWallet = (
  seed: string,
  password: string,
  iv?: Buffer
): { iv: string; encrypted: string } => {
  iv = iv ?? randomBytes(16);
  const key = createHash('md5').update(password).digest('hex');
  let cipher = createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(seed);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encrypted: encrypted.toString('hex') };
};

export const decryptWallet = (
  { iv, encrypted }: { encrypted: string; iv: string },
  password: string,
  _?: (p: number) => void
): string => {
  let ivBuffer = Buffer.from(iv, 'hex');
  let encryptedText = Buffer.from(encrypted, 'hex');
  const key = createHash('md5').update(password).digest('hex');
  let decipher = createDecipheriv('aes-256-cbc', key, ivBuffer);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  const dec = decrypted.toString();
  return dec;
};

export const loadWallet = (account: string, passphrase: string) => {
  let storage = new Storage(`${BTC_WALLET_KEY}/${account.toLowerCase()}`);
  let data = storage.get();
  if (data) data = JSON.parse(data);
  return decryptWallet(data as { encrypted: string; iv: string }, passphrase);
};

export const getChangeAddresses = (seed: Buffer): [string, string] => {
  const node = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
  const result: string[] = [];
  for (let i = 0; i < 2; i++) {
    const path = `m/86'/0'/0'/1/${i}`;
    const child = node.derivePath(path);
    const childNodeXOnlyPubkey = child.publicKey.slice(1, 33);
    const p2pktr = payments.p2tr({
      internalPubkey: childNodeXOnlyPubkey,
      network: bitcoin.networks.bitcoin,
    });
    result.push(String(p2pktr?.address));
  }
  return [result[0], result[1]];
};

export const getReceivingAddresses = (seed: Buffer): [string, string] => {
  // receiving address 0 will always remain the funds address
  const node = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
  const result: string[] = [];
  for (let i = 0; i < 2; i++) {
    const path = `m/86'/0'/0'/0/${i}`;
    const child = node.derivePath(path);
    const childNodeXOnlyPubkey = child.publicKey.slice(1, 33);
    const p2pktr = payments.p2tr({
      internalPubkey: childNodeXOnlyPubkey,
      network: bitcoin.networks.bitcoin,
    });
    result.push(String(p2pktr?.address));
  }
  return [result[0], result[1]];
};

export const getOrdinalAddress = (seed: Buffer): string => {
  // receiving address 1 will always remain the ordinal address
  const node = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
  const path = `m/86'/0'/0'/0/1`;
  const child = node.derivePath(path);
  const childNodeXOnlyPubkey = child.publicKey.slice(1, 33);
  const p2pktr = payments.p2tr({
    internalPubkey: childNodeXOnlyPubkey,
    network: bitcoin.networks.bitcoin,
  });

  return String(p2pktr?.address);
};

export const signRawTransaction = (
  rawTx: any,
  seed: Buffer,
  unspentInputs: any[]
) => {
  const node = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
  const psbt = new bitcoin.Psbt();
  const transaction: any = bitcoin.Transaction.fromHex(rawTx);
  psbt.setVersion(transaction.version);
  psbt.setLocktime(transaction.locktime);

  // const masterFingerprint = node.fingerprint;

  // const p2pktr1 = payments.p2tr({
  //   //hash: unspent.getHash(),
  //   internalPubkey: unspent.outs[1].script,
  //   network: bitcoin.networks.bitcoin,
  // });

  const tweakedChildNodes = [];
  for (let input of transaction.ins) {
    let path, child: any, childNodeXOnlyPubkey, p2pktr, tweakedChildNode;

    const hash = input.hash.reverse().toString('hex');
    const unspent: any = unspentInputs.find((d: any) => String(d.txid) == hash);
    console.log('UNSPENT', unspent, hash, unspentInputs);
    // if(unspentOutputAddress) {
    // search the receiving addreesses
    path = `m${unspent.desc.slice(12, unspent.desc.search(']'))}`;
    console.log('PATTTH', path);
    child = node.derivePath(path);
    childNodeXOnlyPubkey = child.publicKey.slice(1, 33);
    p2pktr = payments.p2tr({
      internalPubkey: childNodeXOnlyPubkey,
      network: bitcoin.networks.bitcoin,
    });

    tweakedChildNode = child.tweak(
      bitcoin.crypto.taggedHash('TapTweak', childNodeXOnlyPubkey)
    );
    tweakedChildNodes.push(tweakedChildNode);

    const utxo = {
      index: input.index,
      hash: Buffer.from(input.hash, 'hex').reverse(),
      sequence: input.sequence,
      witnessUtxo: {
        script: p2pktr?.output!, //unspent.outs[input.index].script,
        value: Number(unspent.amount) * 100000000,
      },
      tapInternalKey: childNodeXOnlyPubkey,
    };
    psbt.addInput(utxo);
  }
  let outtotal = 0;
  for (let output of transaction.outs) {
    psbt.addOutput({
      script: output.script,
      value: Number(output.value),
    });
    outtotal += Number(output.value);
  }
  console.log('HEX', psbt.toHex());
  for (const tweakedChildNode of tweakedChildNodes) {
    psbt.signTaprootInput(0, tweakedChildNode);
  }
  psbt.finalizeAllInputs();

  // signed transaction hex
  const signed = psbt.extractTransaction(true);
  console.log(
    'afterSigned',
    outtotal,
    signed.getHash().toString('hex'),
    psbt.extractTransaction()
  );
  console.log('afterSigned', signed.toHex());
  return signed.toHex();
};
