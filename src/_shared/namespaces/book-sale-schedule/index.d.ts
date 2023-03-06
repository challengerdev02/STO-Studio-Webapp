import { AppObject } from '@/shared/namespaces';
import { UserNamespace } from '../user';

namespace BookSaleScheduleNamespace {
  export interface BookSaleSchedule extends AppObject {
    price: any;
    salesType: string;
    royaltyOnBookSale: number;
    royaltyOnSceneSale: number;
    copiesAvailable: number;
    startDate: string;
    duration: string;
    book: string;
    assetType?: string;
    isEnded?: boolean;
    maxSupply?: number;
    mint?: boolean;
    seller?: any;
    endDate?: string;
    royalty?: number;
    saleId?: string;
    user?: UserNamespace.User;
    walletAddress?: string;
    title?: string;
    editors?: string[];
    description?: string;
    explicitContent?: boolean;
    coverImage?: string;
    bestOffer?: any;
    highestBid?: any;
    saleType?: string;
  }
}
