import { AppObject } from '@/shared/namespaces';

namespace UserNamespace {
  export interface User extends AppObject {
    username?: string;
    followers: number;
    followings: number;
    avatar?: string;
    banner?: string;
    walletAddress: string;
    emailAccount?: {
      email?: string;
      verified: boolean;
    };
    btcAccounts?: { address: string; tr: string }[];
    accountVerified?: boolean;
    isCreator?: boolean;
    publicId?: string;
    createdAt?: string;
    isFollowingUser?: boolean;
    inviteCode?: string;
    bio?: string;
    airdropPoints?: any;
    socials?: {
      twitter?: string;
      instagram?: string;
      reddit?: string;
    };
    website?: string;
    patreon?: string;
  }
}
