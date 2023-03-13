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
    tapRootAddress: account0.getAddressFromPrivateKey(0, true),
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

export const signRawTransaction = (transaction: any, seed: string) => {
  const node = bip32.fromSeed(
    Buffer.from(seed, 'hex'),
    bitcoin.networks.bitcoin
  );
  const psbt = new bitcoin.Psbt();
  psbt.setVersion(2);
  psbt.setLocktime(0);
  const masterFingerprint = node.fingerprint;
  const path = "m/86'/0'/0'/0/85";
  const child = node.derivePath(path);

  const childNodeXOnlyPubkey = child.publicKey.slice(1, 33);

  console.log('EXTENDED', childNodeXOnlyPubkey);
  const tweakedChildNode = child.tweak(
    bitcoin.crypto.taggedHash('TapTweak', childNodeXOnlyPubkey)
  );
  const p2pktr = payments.p2tr({
    internalPubkey: childNodeXOnlyPubkey,
    network: bitcoin.networks.bitcoin,
  });
  console.log('P2TR_ADDRESS', p2pktr.address);
  const pubkey = child.publicKey;
  const updateData = {
    bip32Derivation: [
      {
        masterFingerprint,
        path,
        pubkey,
      },
    ],
  };
  const { output } = bitcoin.payments.p2tr({
    pubkey: childNodeXOnlyPubkey,
    network: bitcoin.networks.bitcoin,
  });
  const unspent: any = bitcoin.Transaction.fromHex(
    transaction.input[0].nonWitnessUtxo
  );
  console.log('SCRIPPPT', unspent.outs[1].value, unspent.outs[1].script);
  for (let input of transaction.input) {
    const utxo = {
      //...input,
      index: input.index,
      hash: Buffer.from(input.hash, 'hex').reverse(),
      witnessUtxo: {
        script: p2pktr.output!, //unspent.outs[input.index].script,
        value: 446193 ?? Number(unspent.outs[input.index].value),
      },
      tapInternalKey: childNodeXOnlyPubkey,
    };
    psbt.addInput(utxo);
  }
  let outtotal = 0;
  for (let output of transaction.output) {
    psbt.addOutput({
      script: Buffer.from(output.script, 'hex'),
      value: Number(output.value),
    });
    outtotal += Number(output.value);
  }
  // console.log('beforeSigned', psbt.extractTransaction(true).ins[0].hash.toString('hex'))
  psbt.signTaprootInput(0, tweakedChildNode);
  psbt.finalizeAllInputs();
  // signed transaction hex
  const signed = psbt.extractTransaction(true);
  console.log('afterSigned', outtotal, signed.getHash().toString('hex'));
  console.log('afterSigned', signed.toHex());
  return signed.toHex();
};
