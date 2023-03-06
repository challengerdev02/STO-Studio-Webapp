import { AppObject } from '@/shared/namespaces';

namespace ArtistNamespace {
  export interface Artist extends AppObject {
    name: string;
    walletAddress?: string;
    url?: string;
  }
}
