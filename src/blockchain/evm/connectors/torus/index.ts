// import { NetworkInterface } from '@toruslabs/torus-embed';
//
// type ETHEREUM_NETWORK_TYPE =
//   | 'ropsten'
//   | 'rinkeby'
//   | 'kovan'
//   | 'mainnet'
//   | 'goerli'
//   | 'localhost'
//   | 'matic'
//   | 'mumbai';

// interface NetworkParams {
//   host: ETHEREUM_NETWORK_TYPE | string;
//   chainId?: number;
//   networkName?: string;
// }

import { createApiRequest } from '@/shared/utils/api';

interface VerifierStatus {
  google?: boolean;
  facebook?: boolean;
  reddit?: boolean;
  twitch?: boolean;
  discord?: boolean;
}

// interface LoginParams {
//   verifier?: 'google' | 'facebook' | 'twitter' | 'reddit' | 'discord' | string;
// }

type LOGIN_TYPE =
  | 'google'
  | 'facebook'
  | 'reddit'
  | 'discord'
  | 'twitch'
  | 'apple'
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'weibo'
  | 'line'
  | 'jwt'
  | 'email-password'
  | 'passwordless';

interface BaseLoginOptions {
  display?: 'page' | 'popup' | 'touch' | 'wap';
  prompt?: 'none' | 'login' | 'consent' | 'select_account';
  max_age?: string | number;
  ui_locales?: string;
  id_token_hint?: string;
  login_hint?: string;
  acr_values?: string;
  scope?: string;
  audience?: string;
  connection?: string;
  [key: string]: unknown;
}

interface JwtParameters extends BaseLoginOptions {
  domain: string;
  client_id?: string;
  redirect_uri?: string;
  leeway?: number;
  verifierIdField?: string;
  isVerifierIdCaseSensitive?: boolean;
}

interface IntegrityParams {
  check: boolean;
  hash?: string;
  version?: string;
}

interface WhiteLabelParams {
  theme: ThemeParams;
  defaultLanguage?: string;
  logoDark: string;
  logoLight: string;
  topupHide?: boolean;
  featuredBillboardHide?: boolean;
  disclaimerHide?: boolean;
  tncLink?: LocaleLinks<string>;
  privacyPolicy?: LocaleLinks<string>;
  contactLink?: LocaleLinks<string>;
  customTranslations?: LocaleLinks<any>;
}

interface LocaleLinks<T> {
  en?: T;
  ja?: T;
  ko?: T;
  de?: T;
  zh?: T;
}

interface ThemeParams {
  isDark: boolean;
  colors: any;
}

interface LoginConfigItem {
  name?: string;
  typeOfLogin: LOGIN_TYPE;
  description?: string;
  clientId?: string;
  logoHover?: string;
  logoLight?: string;
  logoDark?: string;
  showOnModal?: boolean;
  jwtParameters?: JwtParameters;
}

interface LoginConfig {
  [verifier: string]: LoginConfigItem;
}

export interface Options {
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
  modalZIndex?: number;
  apiKey?: string;
  buildEnv?: 'production' | 'development' | 'staging' | 'testing' | 'lrc';
  enableLogging?: boolean;
  enabledVerifiers?: VerifierStatus;
  loginConfig?: LoginConfig;
  showTorusButton?: boolean;
  integrity?: IntegrityParams;
  whiteLabel?: WhiteLabelParams;
}

export interface TorusConnectorOptions {
  config?: Options;
  init?: any;
}

// Supports Torus package versions 0.2.*
const ConnectToTorus = async (Torus: any, options: TorusConnectorOptions) => {
  return new Promise(async (resolve, reject) => {
    try {
      // defaults
      let buttonPosition = 'bottom-left';
      let apiKey =
        'BFATlOpbkbkEfdDHQpLtm6sqCf0Opfj5CutUhXzj5Gasuv5H2Zkk2sEijw5hDU9SqHyYp1oK33iXU15zyGUZUPI';
      let modalZIndex = 99999;
      //let defaultVerifier = 'google';

      // parsing to Torus interfaces
      //   chainId: 137,
      //   networkName: 'Polygon mainnet' };
      // options.networkParams || options.network
      //   ? { host: options.network ?? 'mainnet', ...options.networkParams }
      //   : network;

      const torus = new Torus({
        buttonPosition: options.config?.buttonPosition || buttonPosition,
        apiKey: options.config?.apiKey || apiKey,
        modalZIndex: options.config?.modalZIndex || modalZIndex,
      });
      await torus.init({
        showTorusButton: false,
        ...options.init,
        enabledVerifiers: {
          google: true,
          facebook: true,
          reddit: true,
          discord: true,
          twitter: true,
        },
        whiteLabel: {
          theme: {
            isDark: true,
            // colors: {
            //   torusBrand1: "#282c34",
            // },
          },
          logoDark: 'https://metacomic.art/favicon.png', // Dark logo for light background
          // logoLight: "https://tkey.surge.sh/images/Device.svg", // Light logo for dark background
          topupHide: false,
          featuredBillboardHide: true,
          disclaimerHide: true,
          defaultLanguage: 'en',
        },
      });

      // if (options.init.defaultVerifier) {
      //   defaultVerifier = options.init.defaultVerifier ?? 'facebook';
      // }
      await torus.login();
      const userInfo = await torus.getUserInfo();
      if (userInfo?.isNewUser) {
        const walletRequest = await torus.getPublicAddress({
          verifier: userInfo.verifier,
          verifierId: userInfo.verifierId,
        });
        createApiRequest({
          method: 'post',
          url: `/visitors`,
          data: {
            ...userInfo,
            walletAddress: walletRequest?.data,
          },
        }).then();
      }
      // //console.log('USERINFO', userInfo);
      const provider = torus.provider;
      provider.torus = torus;
      resolve(provider);
    } catch (err) {
      reject(err);
    }
  });
};

export default ConnectToTorus;
