import { Action } from '../../types';
import {
  FIND_ACCOUNT,
  GET_ACCOUNT,
  GET_USER_TIP_BALANCE,
  TIP_USER,
  UPDATE_ACCOUNT,
} from '@/actions';
import { UserNamespace } from '@/shared/namespaces/user';

// import { get } from 'lodash';

export interface AppReducerState {
  user: Record<string, UserNamespace.User>;
  search: Record<string, UserNamespace.User>;
  tip: Record<string, Record<any, any>>;
}

export const SceneDefaultState: AppReducerState = {
  user: {},
  search: {},
  tip: {},
};

const AppReducer = (state = SceneDefaultState, action: Action) => {
  switch (action.type) {
    case GET_USER_TIP_BALANCE.SUCCESS:
    case TIP_USER.SUCCESS:
      return {
        ...state,
        tip: {
          ...state.tip,
          [action.key]: action.payload,
        },
      };
    // case FOLLOW_USER.SUCCESS:
    //   const user = get(state, ['user', action.key], {});
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       [action.key]: { ...user, ...(action.payload ?? {}) },
    //     },
    //   };
    case GET_ACCOUNT.SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          [action.key]: action.payload,
        },
      };
    case FIND_ACCOUNT.SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          [action.key]: action.payload,
        },
      };

    case UPDATE_ACCOUNT.SUCCESS: {
      return {
        user: {
          ...state.user,
          [action.key]: action.payload,
        },
        search: {
          ...state.search,
          [action.key]: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export default AppReducer;
