import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, GET } from '@/shared/constants';
import { GET_CHARACTERS } from '@/actions';

export const fetchCharacters: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === GET_CHARACTERS.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: GET,
          url: `${APP_URL.character.fetchAll}`,
          onFinish,
          payload,
          onSuccess: GET_CHARACTERS.SUCCESS,
          ...rest,
        })
      );
    }
  };
