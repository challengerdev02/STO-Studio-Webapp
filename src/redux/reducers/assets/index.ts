import { Action } from '../../types';
import {
  GET_ALL_CREATED_ASSETS,
  GET_ASSET,
  GET_CREATED_ASSETS,
  UPDATE_ASSET,
} from '../../actions';
import { AssetsNamespace } from '@/shared/namespaces/assets';
import { arrayToById } from '@/shared/utils';

export interface AssetsReducerState {
  assets: Record<string, AssetsNamespace.Assets[]>;
  asset: Record<string, any>;
  assetsById: Record<string, Record<string, AssetsNamespace.Assets>>;
}

export const AssetsDefaultState: AssetsReducerState = {
  assets: {},
  asset: {},
  assetsById: {},
};

const AssetsReducer = (state = AssetsDefaultState, action: Action) => {
  switch (action.type) {
    case GET_CREATED_ASSETS.SUCCESS: {
      return {
        ...state,
        assets: {
          ...state.assets,
          [action.key]: action.payload,
        },
      };
    }

    case GET_ALL_CREATED_ASSETS.SUCCESS: {
      const previousAssets = state.assets[action.key] ?? [];
      let assets = [];
      if (!action.virtualized) {
        assets = action.payload;
      } else {
        assets = [...previousAssets, ...action.payload];
      }
      return {
        ...state,
        assets: {
          ...state.assets,
          [action.key]: assets,
        },
      };
    }
    case GET_ASSET.SUCCESS:
      return {
        ...state,
        asset: {
          ...state.asset,
          [action.key]: action.payload,
        },
      };

    case UPDATE_ASSET.SUCCESS: {
      const assets = state.assets[action.key] ?? [];

      const index = assets.findIndex((o) => o?._id === action.payload?._id);

      let currentAsset = {};

      if (index !== -1) {
        currentAsset = Object.assign({}, assets[index], action.payload);
        assets[index] = Object.assign({}, assets[index], action.payload);
      } else {
        currentAsset = Object.assign({}, action.payload);
        assets.push(action.payload);
      }

      const byId = arrayToById(assets ?? []);

      return {
        ...state,
        assetsById: {
          ...state.assetsById,
          [action.key]: byId,
        },
        assets: {
          ...state.assets,
          [action.key]: assets ?? [],
        },
        book: {
          ...state.asset,
          [action.key]: currentAsset,
        },
      };
    }

    default:
      return state;
  }
};

export default AssetsReducer;
