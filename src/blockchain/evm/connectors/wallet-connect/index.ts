import { getChainId } from '../../utils';

export interface WalletConnectConnectorOptions {
  infuraId?: string;
  rpc?: { [chainId: number]: string };
  bridge?: string;
  qrcode?: boolean;
  qrcodeModalOptions?: { mobileLinks?: string[] };
  network?: string;
}

const ConnectToWalletConnect = (
  WalletConnectProvider: any,
  options: WalletConnectConnectorOptions
) => {
  return new Promise(async (resolve, reject) => {
    let bridge = 'https://bridge.walletconnect.org';
    let qrcode = true;
    let infuraId = '';
    let rpc = undefined;
    let chainId = 1;
    let qrcodeModalOptions = undefined;

    if (options) {
      bridge = options.bridge || bridge;
      qrcode = typeof options.qrcode !== 'undefined' ? options.qrcode : qrcode;
      infuraId = options.infuraId || '';
      rpc = options.rpc || undefined;
      chainId =
        options.network && getChainId(options.network)
          ? getChainId(options.network)
          : 1;
      qrcodeModalOptions = options.qrcodeModalOptions || undefined;
    }

    const provider = new WalletConnectProvider({
      bridge,
      qrcode,
      infuraId,
      rpc,
      chainId,
      qrcodeModalOptions,
    });
    try {
      await provider.enable();
      resolve(provider);
    } catch (e) {
      reject(e);
    }
  });
};

export default ConnectToWalletConnect;
