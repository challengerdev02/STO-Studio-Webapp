import { AppObject } from '@/shared/namespaces';
import { UserNamespace } from '@/shared/namespaces/user';

export namespace AssetsNamespace {
  export interface Assets extends AppObject {
    asset: Asset;
    assetData: AssetData;
    assetType: string;
    likes: number;
    liked: boolean;
    user: string | UserNamespace.User;
    published?: boolean;
    walletAddress: string;
    series?: Series;
    __v: number;
  }
  export interface Asset extends AppObject {
    active: boolean;
    book: string;
    coverImage: string;
    thumbnail?: string;
    description: string;
    explicitContent: boolean;
    publicId: string;
    title: string;
    user: string;
    walletAddress: string;
    __v: number;
  }

  export interface AssetData extends Asset {
    deleted: boolean;
  }
}
