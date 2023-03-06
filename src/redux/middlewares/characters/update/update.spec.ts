import {
  serverRequest,
  UPDATE_CHARACTER,
  updateCharacter as defaultCharacterAction,
} from '../../../actions';
import { updateCharacter as updateCharacterMiddleware } from './index';
import { APP_URL, PATCH } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Update Character: Update Character Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let updateCharacter = defaultCharacterAction;

  beforeEach(() => {
    updateCharacter = jest.fn(defaultCharacterAction).mockReturnValue({
      type: UPDATE_CHARACTER.START,
      meta: payload,
    });
    mockedRedux.Character = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      updateState: jest.fn(),
    };
    mockedRedux.store.updateState.mockReturnValue({
      Character: {
        Character: mockedRedux.Character,
      },
    });
    mockedRedux.updateCharacterAction = updateCharacterMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the updateCharacter action since it is not in the tarupdateed list of actions', () => {
    mockedRedux.updateCharacterAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.updateCharacterAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(updateCharacter).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the updateCharacter actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.updateCharacterAction(updateCharacter(payload, id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: PATCH,
        url: `${APP_URL.character.update}/${id}`,
        onSuccess: '@@character/update_character_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: UPDATE_CHARACTER.START,
      meta: { ...payload },
    });
  });
});
