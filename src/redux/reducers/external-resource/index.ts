import { Action } from '../../types';
import { GET_EXTERNAL_RESOURCE } from '@/actions';
import { UploadMediaNamespace } from '@/shared/namespaces/upload';

export interface ExternalResourceReducerState {
  resources: Record<string, UploadMediaNamespace.Upload>;
}

export const UploadMediaDefaultState: ExternalResourceReducerState = {
  resources: {},
};

const externalResourceReducer = (
  state = UploadMediaDefaultState,
  action: Action
) => {
  switch (action.type) {
    case GET_EXTERNAL_RESOURCE.SUCCESS:
      return {
        ...state,
        resources: {
          ...state.resources,
          [action.key]: action.payload,
        },
      };

    default:
      return state;
  }
};

export default externalResourceReducer;
