import { Action } from '../../types';
import {
  CREATE_BID,
  CREATE_OFFER,
  GET_ALL_BIDS,
  GET_ALL_OFFERS,
  GET_ALL_SALE_ASSETS,
  GET_BID,
  GET_LATEST_BID,
  GET_OFFER,
  GET_SALE_ASSET,
  GET_TOKEN_ACTIVITY,
  GET_TOKEN_OWNERS,
} from '../../actions';
import { SaleNamespace } from '@/shared/namespaces/sale';
import { arrayToById } from '@/shared/utils';

export interface SaleReducerState {
  assets: Record<string, SaleNamespace.SaleAsset[]>;
  assetsById: Record<string, Record<string, SaleNamespace.SaleAsset>>;
  asset: Record<string, SaleNamespace.SaleAsset>;
  assetPayload: Record<string, any>;
  bids: Record<string, SaleNamespace.Bid[]>;
  bidsById: Record<string, Record<string, SaleNamespace.Bid>>;
  bid: Record<string, SaleNamespace.Bid>;
  tokenOwners: Record<string, SaleNamespace.OwnedAssetMetadata[]>;
  tokenOwnersById: Record<
    string,
    Record<string, SaleNamespace.OwnedAssetMetadata>
  >;
  tokenOwner: Record<string, SaleNamespace.OwnedAssetMetadata>;

  tokenActivity: Record<string, SaleNamespace.TokenActivity[]>;

  offers: Record<string, SaleNamespace.Offers[]>;
  offer: Record<string, SaleNamespace.Offers>;
  startDateTimestamp?: number;
  endDateTimestamp?: number;
}

export const SaleDefaultState: SaleReducerState = {
  assets: {},
  assetsById: {},
  assetPayload: {},
  asset: {},
  bids: {},
  bidsById: {},
  bid: {},
  tokenOwners: {},
  tokenOwnersById: {},
  tokenOwner: {},
  tokenActivity: {},
  offers: {},
  offer: {},
};

const SaleReducer = (state = SaleDefaultState, action: Action) => {
  switch (action.type) {
    case GET_SALE_ASSET.SUCCESS: {
      return {
        ...state,
        asset: {
          ...state.asset,
          [action.key]: action.payload,
        },
      };
    }

    case GET_ALL_SALE_ASSETS.SUCCESS: {
      const previousAssets = state.assets[action.key] ?? [];
      let assets = [];
      if (!action.virtualized) {
        assets = action.payload;
      } else {
        assets = [...previousAssets, ...action.payload];
      }
      const byId = arrayToById(assets);
      return {
        ...state,
        assets: {
          ...state.assets,
          [action.key]: assets,
        },
        assetsById: {
          ...state.assetsById,
          [action.key]: byId,
        },
      };
    }

    case GET_BID.SUCCESS:
    case GET_LATEST_BID.SUCCESS:
      return {
        ...state,
        bid: {
          ...state.bid,
          [action.key]: action.payload,
        },
      };

    case GET_ALL_BIDS.SUCCESS: {
      const byId = arrayToById(action?.payload ?? []);
      return {
        ...state,
        bids: {
          ...state.bids,
          [action.key]: action.payload,
        },
        bidsById: {
          ...state.bidsById,
          [action.key]: byId,
        },
      };
    }

    case GET_TOKEN_OWNERS.SUCCESS: {
      const byId = arrayToById(action?.payload ?? []);
      return {
        ...state,
        tokenOwners: {
          ...state.tokenOwners,
          [action.key]: action.payload,
        },
        tokenOwnersById: {
          ...state.tokenOwnersById,
          [action.key]: byId,
        },
      };
    }

    case GET_TOKEN_ACTIVITY.SUCCESS: {
      return {
        ...state,
        tokenActivity: {
          ...state.tokenActivity,
          [action.key]: action.payload,
        },
      };
    }

    case CREATE_BID.SUCCESS: {
      return {
        ...state,
        bid: {
          ...state.bid,
          [action.key]: action.payload,
        },
      };
    }
    case GET_OFFER.SUCCESS:
    case CREATE_OFFER.SUCCESS: {
      return {
        ...state,
        offer: {
          ...state.offer,
          [action.key]: action.payload,
        },
      };
    }

    case GET_ALL_OFFERS.SUCCESS: {
      return {
        ...state,
        offers: {
          ...state.offers,
          [action.key]: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export default SaleReducer;
