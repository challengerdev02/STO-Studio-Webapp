import { AppObject } from '@/shared/namespaces';
import { BookNamespace } from '@/shared/namespaces/book';
import { UserNamespace } from '@/shared/namespaces/user';

namespace SeriesNamespace {
  export interface Episode extends AppObject {
    _id: string;
    asset: BookNamespace.Book;
    assetAddress: string;
    walletAddress: string;
    assetType: string;
    series: string;
    user: string | UserNamespace.User;
    deployerVersion: number;
    likes: number;
    latestEdition: number;
  }

  export interface EpisodeData {
    meta: Record<string, any>;
    episodes: Episode[];
  }
  export interface Series extends AppObject {
    title: string;
    description: string;
    image: string;
    publicId: string;
    walletAddress: string;
    genres: string[];
    views: number;
    subscribers: number;
    likes: number;
    subscribed: boolean;
    user?: UserNamespace.User;
  }

  export interface SeriesData extends Series {
    episodeData: EpisodeData;
  }
}
