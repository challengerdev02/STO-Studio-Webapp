import { Action } from '../../types';
import { UPLOAD_MEDIA } from '@/actions';
import { UploadMediaNamespace } from '@/shared/namespaces/upload';

export interface UploadMediaReducerState {
  media: Record<string, UploadMediaNamespace.Upload>;
}

export const UploadMediaDefaultState: UploadMediaReducerState = {
  media: {},
};

const UploadMediaReducer = (
  state = UploadMediaDefaultState,
  action: Action
) => {
  switch (action.type) {
    case UPLOAD_MEDIA.SUCCESS:
      return {
        ...state,
        media: {
          ...state.media,
          [action.key]: action.payload.media,
        },
      };

    default:
      return state;
  }
};

export default UploadMediaReducer;
