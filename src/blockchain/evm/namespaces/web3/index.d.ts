export namespace Web3Namespace {
  export const enum ContractTypes {
    token = 'TokenContract',
    busd = 'BusdContract',
    book = 'BookContract',
    page = 'PageContract',
    trader = 'TraderContract',
    bookCreator = 'BookCreatorContract',
  }

  export enum SaleTypeEnum {
    BuyNow = 0,
    Auction,
    Offer,
  }

  export enum SaleTypeEnumString {
    BuyNow = 'BuyNow',
    Auction = 'Auction',
    Offer = 'Offer',
  }
  export enum AssetTypeEnum {
    Book = 0,
    Page,
    Scene = 1,
    Character,
  }

  export enum AssetTypeEnumString {
    Book = 'Book',
    Page = 'Page',
    Character = 'Character',
  }

  export interface ISale {
    seller?: string;
    token?: string;
    tokenId?: string;
    saleId?: string;
    saleType: SaleTypeEnum | string;
    price: string;
    assetType: AssetTypeEnum | string;
    mint?: boolean;
    maxSupply?: number;
    endDate: number;
    startDate: number;
    // data?: string;
    assetId: string;
    royalty: string;
    traderSignature?: string;
  }

  interface IItemInterface {
    edition: number;
    creator: string;
    id: string;
    name: string;
    symbol: string;
    editors: string[];
    proxyAddress: string; // MC_TRADER_ADDRESS
    proxyRegistry: string; // MC_PROXY_REGISTRY_ADDRESS
  }

  export interface IBookInterface extends IItemInterface {
    bookBaseURI: string; // Path to the book json file
    pageBaseURI: string; //sample https://www.pexels.com/photo (path to the page json folder)
    pageURIs: string[]; // Sample: [0.json, 1.json]
    bookAddress: string; // Contract address
    version: string;
  }
  export interface IPageInterface extends IItemInterface {
    pageBaseURI: string;
    pageURIs: string[];
    bookAddress: string;
    version: string;
  }

  export interface ICharacterInterface extends IItemInterface {
    characterBaseURI: string;
    version: string;
  }
}
