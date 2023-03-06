import { Middleware } from 'redux';
import { RootState } from '../../../state';
import { serverRequest } from '../../../actions/app/api';
import { APP_URL, POST } from '@/shared/constants';
import { CREATE_CHARACTER } from '@/actions';

export const createCharacter: Middleware<unknown, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === CREATE_CHARACTER.START) {
      const { payload, onFinish, ...rest } = action.meta;
      dispatch(
        serverRequest({
          method: POST,
          url: `${APP_URL.character.create}`,
          onFinish,
          payload,
          onSuccess: CREATE_CHARACTER.SUCCESS,
          ...rest,
        })
      );
    }
  };
