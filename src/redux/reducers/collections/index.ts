import { Action } from '../../types';
import { GET_COLLECTIONS, GET_ALL_COLLECTIONS } from '../../actions';
import { CollectionsNamespace } from '@/shared/namespaces/collections';

export interface CollectionsReducerState {
  collections: Record<string, CollectionsNamespace.Collections[]>;
}

export const CollectionsDefaultState: CollectionsReducerState = {
  collections: {},
};

const CollectionsReducer = (
  state = CollectionsDefaultState,
  action: Action
) => {
  switch (action.type) {
    case GET_COLLECTIONS.SUCCESS: {
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.key]: action.payload,
        },
      };
    }

    case GET_ALL_COLLECTIONS.SUCCESS: {
      const previousCollections = state.collections[action.key] ?? [];
      let collections = [];
      if (!action.virtualized) {
        collections = action.payload;
      } else {
        collections = [...previousCollections, ...action.payload];
      }
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.key]: collections,
        },
      };
    }
    default:
      return state;
  }
};

export default CollectionsReducer;
