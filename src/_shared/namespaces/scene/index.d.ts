import { AppObject } from '@/shared/namespaces';

namespace SceneNamespace {
  export interface Scene extends AppObject {
    active: true;
    walletAddress: string;
    book: string;
    user: string;
    explicitContent: boolean;
    description: string;
    coverImage: string;
    title: string;
    publicId: string;
    attributes: Attribute[];
    artists?: Artist[];
  }
}
