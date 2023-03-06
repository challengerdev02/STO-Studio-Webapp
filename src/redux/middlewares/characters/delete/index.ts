import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, DELETE } from '@/shared/constants';
import { DELETE_CHARACTER } from '@/actions';

export const deleteCharacter: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === DELETE_CHARACTER.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: DELETE,
          url: `${APP_URL.character.delete}`,
          onFinish,
          payload,
          onSuccess: DELETE_CHARACTER.SUCCESS,
          ...rest,
        })
      );
    }
  };
