import { AppObject } from '@/shared/namespaces';
import { SceneNamespace } from '@/shared/namespaces/scene';
import { UserNamespace } from '@/shared/namespaces/user';
import { SaleNamespace } from '@/shared/namespaces/sale';

namespace BookNamespace {
  export interface Book extends AppObject {
    title: string;
    description: string;
    coverImage: string;
    infoLink?: string;
    numberOfPages?: number;
    isbn?: string;
    GENRE_OPTIONS?: string;
    ageRating: string;
    likes?: number;
    liked?: boolean;
    issueNumber?: number;
    explicitContent: boolean;
    series?: Series[] | string | Series | any;
    attributes?: Attribute[];
    artists?: Artist[];
    genres?: string[];
    scenes: SceneNamespace.Scene[];
    characters?: Character[];
    user?: UserNamespace.User;
    thumbnail?: string;
    pages?: string[];
  }

  export interface Artist extends AppObject {
    asset: string;
    name: string;
    active: boolean;
    assetType: string;
    createdAt: string;
    publicId: string;
    updatedAt: string;
    walletAddress: string;
  }

  export interface Series extends AppObject {
    asset: string;
    title: string;
    active: boolean;
    assetType: string;
    GENRE_OPTIONS: string[];
    description: string;
    publicId: string;
    walletAddress: string;
  }

  export interface Attribute extends AppObject {
    asset: string;
    title: string;
    active: boolean;
    assetType: string;
    attributeType: string;
    value: string;
    publicId: string;
    walletAddress: string;
  }

  export interface Character extends AppObject {
    walletAddress: string;
    book: string;
    explicitContent: boolean;
    description: string;
    coverImage: string;
    title: string;
    publicId: string;
  }

  export interface SearchItem {
    assets: SaleNamespace.SaleAsset[];
    accounts: UserNamespace.User[];
  }
}
