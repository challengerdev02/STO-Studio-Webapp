import { UI_ERROR, UI_LOADING, UI_PAGINATION } from '@/actions';
import { Action } from '../../types';
import { getNewLoadingState } from '@/shared/utils';

export interface UIState {
  uiErrors: Record<string, any>;
  uiLoaders: Record<string, any>;
  pagination: Record<string, any>;
}

export const UIDefaultState: UIState = {
  uiErrors: {},
  uiLoaders: {},
  pagination: {},
};

const uiReducer = (state = UIDefaultState, action: Action) => {
  switch (action.type) {
    case UI_LOADING.START:
      return getNewLoadingState(state, action, true);
    case UI_LOADING.END:
      return getNewLoadingState(state, action, false);
    case UI_ERROR:
      return Object.assign({}, state, {
        uiErrors: { ...state.uiErrors, [action.key]: action.value },
      });
    case UI_PAGINATION:
      return Object.assign({}, state, {
        pagination: { ...state.pagination, [action.key]: action.value },
      });
    default:
      return state;
  }
};

export default uiReducer;
