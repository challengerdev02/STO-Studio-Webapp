import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { GET } from '@/shared/constants';
import { GET_EXTERNAL_RESOURCE } from '@/actions';

export const getExternalResource: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_EXTERNAL_RESOURCE.START) {
      const {
        payload,
        onFinish,
        url,
        baseURL = undefined,
        ...rest
      } = action.meta;

      dispatch(
        serverRequest({
          method: GET,
          url,
          onFinish,
          payload,
          onSuccess: GET_EXTERNAL_RESOURCE.SUCCESS,
          baseURL,
          isExternal: true,
          ...rest,
        })
      );
    }
  };
