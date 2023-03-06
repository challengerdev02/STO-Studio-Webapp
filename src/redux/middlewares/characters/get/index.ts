import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_CHARACTER } from '@/actions';

export const getCharacter: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_CHARACTER.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.character.get}/${id}`,
          onFinish,
          payload,
          onSuccess: GET_CHARACTER.SUCCESS,
          ...rest,
        })
      );
    }
  };
