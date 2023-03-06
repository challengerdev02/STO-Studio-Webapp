import { getAllSaleAssets } from './get-all';
import { getSaleAsset } from './get';
import { createBid } from './make-bid';
import { getBid } from './get-bid';
import { getAllBids } from './get-all-bids';
import { getLatestBid } from './get-latest-bid';
import { getTokenOwners } from './get-token-owners';
import { getTokenActivity } from './get-token-activity';
import { getAllOffers } from './get-all-offers';
import { getOffer } from './get-offer';
import { createOffer } from './make-offer';
import { likeAsset } from './likes';

const middlewares = [
  getAllSaleAssets,
  getSaleAsset,
  createBid,
  getAllBids,
  getBid,
  getLatestBid,
  getTokenOwners,
  getTokenActivity,
  createOffer,
  getOffer,
  getAllOffers,
  likeAsset,
];

export default middlewares;
