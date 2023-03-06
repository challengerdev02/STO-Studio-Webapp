import { AppObject } from '@/shared/namespaces';
import { UserNamespace } from '@/shared/namespaces/user';
import { BookNamespace } from '@/shared/namespaces/book';
import { SeriesNamespace } from '@/shared/namespaces/series';

export namespace SaleNamespace {
  export interface OwnedAssetMetadata {
    token_address: string;
    token_id: string;
    block_number_minted: string;
    owner_of: string;
    block_number: string;
    token_hash: string;
    amount: string;
    contract_type: string;
    name: string;
    symbol: string;
    token_uri: string;
    metadata: any;
    synced_at: string;
    user: UserNamespace.User;
  }
  export interface AssetDump extends AppObject {
    walletAddress: string;
    likes: number;
    liked: boolean;
    issueNumber: number;
    editors: string[];
    genres: string[];
    ageRating: string;
    infoLink: string;
    explicitContent: false;
    description: string;
    coverImage: string;
    thumbnail?: string;
    title: string;
    user: UserNamespace.User;
    publicId: string;
    series?: SeriesNamespace.Series;
    attributes: BookNamespace.Attribute[];
  }
  export interface SaleAsset extends AppObject {
    isEnded: boolean;
    pageURIs: string[];
    pageBaseURI: string;
    bookBaseURI: string;
    saleType: string;
    blockChain: string;
    assetType: string;
    assetAddress: string;
    assetPayload: {
      edition: number;
      creator: string;
      id: string;
      name: string;
      symbol: string;
      bookBaseURI: string;
      pageBaseURI: string;
      pageURIs: string;
      editors: string;
      version: string;
      proxyAddress: string;
      proxyRegistry: string;
      bookAddress: '';
    };
    asset: AssetDump;
    data: '';
    maxSupply?: number;
    mint: true;
    token: string;
    tokenId: number | string;
    seller: string;
    walletAddress: string;
    endDate: string;
    startDate: string;
    startDateTimestamp?: number;
    endDateTimestamp?: number;
    royalty: number;
    price: string;
    latestOffer?: string;
    saleId: string;
    publicId: string;
    saleSignature: string;
    assetSignature: string;
    coverImage?: string;
    title?: string;
    user?: UserNamespace.User;
  }
  export interface Bid extends AppObject {
    saleId: string;
    amount: string;
    bidSignature: string;
    publicId: string;
    token: string;
    user: UserNamespace.User;
    bidder?: string;
    winningBidSignature?: string;
    nonce: number;
  }

  export interface Offers extends AppObject {
    biddingToken: string;
    expired: boolean;
    expiry: number;
    offerSignature: string;
    owner: string;
    price: string;
    publicId: strig;
    token: string;
    tokenId: string;
  }

  export interface TokenActivity {
    block_number: string;
    block_timestamp: number;
    block_hash: string;
    transaction_hash: string;
    transaction_index: number;
    log_index: number;
    value: string;
    contract_type: string;
    transaction_type: string;
    token_address: string;
    token_id: string;
    from_address: string;
    to_address: string;
    amount: string;
    verified: number;
    operator: null;
    formerOwner: UserNamespace.User | null;
    newOwner: UserNamespace.User | null;
  }

  export interface TokenPriceHistory {
    total: number;
    result: {
      price: string;
      buyer: string;
      seller: string;
      timeStamp: string;
    }[];
  }
}
