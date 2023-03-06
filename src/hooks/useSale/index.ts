import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import {
  createBid,
  createOffer,
  getAllBids,
  getAllOffers,
  getAllSaleAssets,
  getBid,
  getLatestBid,
  getOffer,
  getSaleAsset,
  getTokenActivity,
  getTokenOwners,
  likeAsset,
  unlikeAsset,
} from '@/actions';
import { SaleNamespace } from '@/shared/namespaces/sale';

interface UseSale {
  assets: SaleNamespace.SaleAsset[];
  queriedAssets: Record<string, SaleNamespace.SaleAsset[]>;
  asset: SaleNamespace.SaleAsset;
  assetsById: Record<string, SaleNamespace.SaleAsset>;
  getAllSaleAssets: (options?: ActionOption) => void;
  getSaleAsset: (options?: ActionOption) => void;

  bids: SaleNamespace.Bid[];
  bid: SaleNamespace.Bid;
  bidsById: Record<string, SaleNamespace.Bid>;
  getBid: (bidId: string, options?: ActionOption) => void;
  getLatestBid: (options?: ActionOption) => void;
  getAllBids: (options?: ActionOption) => void;
  createBid: (payload: Record<string, any>, options?: ActionOption) => void;

  tokenOwners: SaleNamespace.OwnedAssetMetadata[];
  tokenOwner: SaleNamespace.OwnedAssetMetadata;
  getTokenOwners: (
    tokenAddress: string,
    chainId: number,
    options?: ActionOption
  ) => void;

  tokenActivity: SaleNamespace.TokenActivity[];
  getTokenActivity: (
    tokenAddress: string,
    tokenId: string,
    chainId: number,
    options?: ActionOption
  ) => void;

  offers: SaleNamespace.Offers[];
  offer: SaleNamespace.Offers;
  getOffer: (offerId: string, options?: ActionOption) => void;
  getAllOffers: (options?: ActionOption) => void;
  createOffer: (payload: Record<string, any>, options?: ActionOption) => void;
  likeAsset: (payload: Record<string, any>, options?: ActionOption) => void;
  unlikeAsset: (payload: Record<string, any>, options?: ActionOption) => void;
}

interface UseSaleProps {
  key: string;
  options?: ActionOption;
}

export const useSale = (parameter: UseSaleProps): UseSale => {
  const { key, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const {
    assets,
    queriedAssets,
    assetsById,
    asset,
    bid,
    bidsById,
    bids,
    tokenOwners,
    tokenOwner,
    tokenActivity,
    offer,
    offers,
  } = useSelector((state: RootState) => {
    return {
      assets: state.sale.assets[key] ?? [],
      queriedAssets: state.sale.assets ?? [],
      assetsById: state.sale.assetsById[key] ?? {},
      asset: state.sale.asset[key] ?? {},
      bid: state.sale.bid[key] ?? {},
      bids: state.sale.bids[key] ?? [],
      bidsById: state.sale.bidsById[key] ?? {},
      tokenOwners: state.sale.tokenOwners[key] ?? [],
      tokenOwner: state.sale.tokenOwner[key] ?? {},
      tokenActivity: state.sale.tokenActivity[key] ?? {},
      //Offers
      offers: state.sale.offers[key] ?? [],
      offer: state.sale.offer[key] ?? {},
    };
  });

  const _getAllSaleAssets = (options?: ActionOption) => {
    dispatch(
      getAllSaleAssets(
        Object.assign({}, defaultOptions, { key: options?.key || key }, options)
      )
    );
  };

  const _getSaleAsset = (options?: ActionOption) => {
    dispatch(getSaleAsset(Object.assign({}, defaultOptions, { key }, options)));
  };

  const _createBid = (payload: Record<string, any>, options?: ActionOption) => {
    dispatch(
      createBid(payload, Object.assign({}, defaultOptions, { key }, options))
    );
  };

  const _getAllBids = (options?: ActionOption) => {
    dispatch(getAllBids(Object.assign({}, defaultOptions, { key }, options)));
  };

  const _getBid = (bidId: string, options?: ActionOption) => {
    dispatch(
      getBid(bidId, Object.assign({}, defaultOptions, { key }, options))
    );
  };

  const _getLatestBid = (options?: ActionOption) => {
    dispatch(getLatestBid(Object.assign({}, defaultOptions, { key }, options)));
  };

  const _getTokenOwners = (
    tokenAddress: string,
    chainId: number,
    options?: ActionOption
  ) => {
    dispatch(
      getTokenOwners(
        tokenAddress,
        chainId,
        Object.assign({}, defaultOptions, { key }, options)
      )
    );
  };

  const _getTokenActivity = (
    tokenAddress: string,
    tokenId: string,
    chainId: number,
    options?: ActionOption
  ) => {
    dispatch(
      getTokenActivity(
        tokenAddress,
        tokenId,
        chainId,
        Object.assign({}, defaultOptions, { key }, options)
      )
    );
  };

  const _createOffer = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      createOffer(payload, Object.assign({}, defaultOptions, { key }, options))
    );
  };

  const _getAllOffers = (options?: ActionOption) => {
    dispatch(getAllOffers(Object.assign({}, defaultOptions, { key }, options)));
  };

  const _getOffer = (bidId: string, options?: ActionOption) => {
    dispatch(
      getOffer(bidId, Object.assign({}, defaultOptions, { key }, options))
    );
  };

  const _likeAsset = (payload: Record<string, any>, options?: ActionOption) => {
    dispatch(
      likeAsset(payload, Object.assign({}, defaultOptions, { key }, options))
    );
  };
  const _unlikeAsset = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      unlikeAsset(payload, Object.assign({}, defaultOptions, { key }, options))
    );
  };
  return {
    assets,
    assetsById,
    asset,
    getAllSaleAssets: _getAllSaleAssets,
    getSaleAsset: _getSaleAsset,
    bids: bids,
    bidsById: bidsById,
    bid: bid,
    createBid: _createBid,
    getAllBids: _getAllBids,
    getBid: _getBid,
    getLatestBid: _getLatestBid,
    tokenOwners,
    tokenOwner,
    getTokenOwners: _getTokenOwners,
    queriedAssets,
    tokenActivity,
    getTokenActivity: _getTokenActivity,

    getAllOffers: _getAllOffers,
    getOffer: _getOffer,
    createOffer: _createOffer,
    offer,
    offers,

    unlikeAsset: _unlikeAsset,
    likeAsset: _likeAsset,
  };
};
