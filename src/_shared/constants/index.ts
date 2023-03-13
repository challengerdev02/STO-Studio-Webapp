import { toBN } from 'web3-utils';

export const THEME_STORAGE_KEY = '@@satoshistudio-storage/theme';
export const THEME_STORAGE_SET_KEY = '@@satoshistudio-storage/theme-set';

// Store: Redux
export const STORE_KEY = '@@satoshistudio-storage/cache';

// WEB3
export const WEB3_SIGNATURE_STORAGE_KEY =
  '@@satoshistudio-storage/web3-signature';
export const WEB3_SIGNATURE_STORAGE_SET_KEY =
  '@@satoshistudio-storage/web3-signature-set';
export const WEB3_CACHED_PROVIDER_KEY =
  '@@satoshistudio-storage/web3-cached-provider';
export const REFERRED_BY_STORAGE = '@@satoshistudio-storage/referred-by';
export const REFERRED_BY_KEY = '@@satoshistudio-storage/referred-by-key';
export const BTC_WALLET_KEY = '@@satoshistudio-storage/btc-wallet';

/**Http Methods **/
export const POST = 'post';
export const PUT = 'put';
export const GET = 'get';
export const PATCH = 'patch';
export const DELETE = 'delete';

export const INFINITY_VALUE = '100000000000000000000000000000000';
export const ZERO = toBN('0');
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const STATE_KEYS = {
  currentUser: '@@user-account',
};

/**App routes **/
export const APP_URL = {
  demo: '/demo',
  book: {
    create: '/books',
    get: '/books',
    fetchAll: '/books',
    update: '/books',
    delete: '/books',
  },
  series: {
    create: '/collections',
    get: '/collections',
    fetchAll: '/collections',
    update: '/collections',
    delete: '/collection',
  },
  artist: {
    create: '/artists',
    get: '/artists',
    fetchAll: '/artists',
    update: '/artists',
    delete: '/artists',
  },
  upload: {
    create: '/media',
  },
  scene: {
    create: '/scenes',
    get: '/scenes',
    fetchAll: '/scenes',
    update: '/scenes',
    delete: '/scenes',
  },
  character: {
    create: '/characters',
    get: '/characters',
    fetchAll: '/characters',
    update: '/characters',
    delete: '/characters',
  },
  saleOptions: {
    create: '/sale-options',
    get: '/sale-options',
    fetchAll: '/sale-options',
    update: '/sale-options',
    delete: '/sale-options',
  },
  bids: '/bids',
  users: '/users',
  bitcoin: {
    addWallet: '/users/add-btc-wallet',
  },

  offers: '/offers',
  account: {
    get: '/users/me',
    search: {
      one: '/users/search/one',
    },
    update: '/users/me',
  },
  collections: {
    get: '/users/nfts',
  },
  assets: {
    get: '/assets',
    update: '/assets',
    get_inscription_fee: '/assets/get-ordinal-mint-fee',
    get_commit_tx: '/assets/get-commit-tx',
    inscribe: '/assets/inscribe',
  },
  competition: '/competitions',
};

export enum COLOR_LIST_ALPHA {
  A = '#3e82ff',
  B = '#c1eafd',
  C = '#f56a00',
  D = '#7265e6',
  E = '#ffbf00',
  F = '#00a2ae',
  G = '#9c9c9d',
  H = '#f3d19b',
  I = '#ca99bc',
  J = '#bab8f5',
  K = '#7b68ed',
  L = '#3e82ff',
  M = '#f3d19b',
  N = '#7265e6',
  O = '#ca99bc',
  P = '#f56a00',
  Q = '#ca99bc',
  R = '#f3d19b',
  S = '#f3d19b',
  T = '#9c9c9d',
  U = '#ffbf00',
  V = '#f3d19b',
  W = '#7265e6',
  X = '#00a2ae',
  Y = '#ca99bc',
  Z = '#c1eafd',
}
export const CATEGORIES_OPTIONS = [
  { value: 'Photography' },
  { value: 'PFP' },
  { value: 'Art' },
  { value: 'Cartoon/Comic' },
  { value: 'Gaming' },
];

export const CATEGORIES: string[] = CATEGORIES_OPTIONS.map((g: any) => g.value);

export const AGE_RATINGS = [{ value: 'PG13' }, { value: '18+' }];

export const PRICE_HISTORY_OPTIONS = [
  { label: 'Last 7 days', value: 'last7' },
  { label: 'Last 14 days', value: 'last14' },
  { label: 'Last 30 days', value: 'last30' },
  { label: 'Last 60 days', value: 'last60' },
  { label: 'Last 90 days', value: 'last90' },
  { label: 'Last year', value: 'lastyear' },
];

export const OFFER_EXPIRATION = [
  { label: '1 day', value: 1 },
  { label: '3 days', value: 3 },
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: 'Custom date', value: 0 },
];

export const ATTRIBUTE_TYPES = ['number', 'text', 'date'];
