import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, PATCH } from '@/shared/constants';
import { UPDATE_CHARACTER } from '@/actions';

export const updateCharacter: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UPDATE_CHARACTER.START) {
      const { id, payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: PATCH,
          url: `${APP_URL.character.update}/${id}`,
          onFinish,
          payload,
          onSuccess: UPDATE_CHARACTER.SUCCESS,
          ...rest,
        })
      );
    }
  };
