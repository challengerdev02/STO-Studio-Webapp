import WalletConnectLogo from '../logos/walletconnect.svg';
import FortmaticLogo from '../logos/formatic.svg';
import VenlyLogo from '../logos/venly.svg';
import FrameLogo from '../logos/frame.svg';
import BSCLogo from '../logos/bsc.svg';
import CoinbaseLogo from '../logos/coinbase.svg';
import MetamaskLogo from '../logos/metaMask.svg';
import PortisLogo from '../logos/portis.svg';
import AuthereumLogo from '../logos/authereum.svg';
import TorusLogo from '../logos/torus.svg';
import { ProviderInfo } from '../../types';

export const Web3ProvidersInfo: Readonly<Record<string, ProviderInfo>> =
  Object.freeze({
    metamask: {
      id: 'metamask',
      name: 'Metamask',
      logo: MetamaskLogo,
      type: 'injected',
      check: 'isMetaMask',
    },
    'wallet-connect': {
      id: 'wallet-connect',
      name: 'Wallet Connect',
      logo: WalletConnectLogo,
      type: 'qrcode',
      check: 'isWalletConnect',
      package: {
        required: [['infuraId', 'rpc']],
      },
    },
    fortmatic: {
      id: 'fortmatic',
      name: 'Fortmatic',
      logo: FortmaticLogo,
      type: 'web',
      check: 'isFortmatic',
      package: {
        required: ['key'],
      },
    },
    venly: {
      id: 'venly',
      name: 'Venly',
      logo: VenlyLogo,
      type: 'web',
      check: 'isVenly',
      package: {
        required: ['clientId'],
      },
    },
    authereum: {
      id: 'authereum',
      name: 'Authereum',
      logo: AuthereumLogo,
      type: 'web',
      check: 'isAuthereum',
    },
    portis: {
      id: 'portis',
      name: 'Portis',
      logo: PortisLogo,
      type: 'web',
      check: 'isPortis',
      package: {
        required: ['clientId'],
      },
    },
    torus: {
      id: 'torus',
      name: 'Torus',
      logo: TorusLogo,
      type: 'web',
      check: 'isTorus',
    },
    frame: {
      id: 'frame',
      name: 'Frame',
      logo: FrameLogo,
      type: 'web',
      check: 'isFrameNative',
    },
    bsc: {
      id: 'bsc',
      name: 'Binance Chain',
      logo: BSCLogo,
      type: 'injected',
      check: 'isBinanceChainWallet',
    },
    'wallet-link': {
      id: 'wallet-link',
      name: 'Coinbase',
      logo: CoinbaseLogo,
      type: 'qrcode',
      check: 'isWalletLink',
      package: {
        required: [['appName', 'infuraId', 'rpc']],
      },
    },
  });
