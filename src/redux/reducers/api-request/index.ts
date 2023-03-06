import { Action } from '../../types';
import { MAKE_API_REQUEST } from '../../actions';

export interface ApiRequestReducerState {
  data: Record<string, any>;
}

export const ApiResponseDefaultState: ApiRequestReducerState = {
  data: {},
};

const ApiRequestReducer = (state = ApiResponseDefaultState, action: Action) => {
  switch (action.type) {
    case MAKE_API_REQUEST.SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.key]: action.payload,
        },
      };

    default:
      return state;
  }
};

export default ApiRequestReducer;
