import {
  serverRequest,
  DELETE_CHARACTER,
  deleteCharacter as defaultCharacterAction,
} from '../../../actions';
import { deleteCharacter as deleteCharacterMiddleware } from './index';
import { APP_URL, DELETE } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Delete Character: Delete Character Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let deleteCharacter = defaultCharacterAction;

  beforeEach(() => {
    deleteCharacter = jest.fn(defaultCharacterAction).mockReturnValue({
      type: DELETE_CHARACTER.START,
      meta: payload,
    });
    mockedRedux.Character = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      getState: jest.fn(),
    };
    mockedRedux.store.getState.mockReturnValue({
      Character: {
        Character: mockedRedux.Character,
      },
    });
    mockedRedux.deleteCharacterAction = deleteCharacterMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the deleteCharacter action since it is not in the targeted list of actions', () => {
    mockedRedux.deleteCharacterAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.deleteCharacterAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(deleteCharacter).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the deleteCharacter actions, then apiRequest action with correct parameters', () => {
    const { id } = payload;
    mockedRedux.deleteCharacterAction(deleteCharacter(id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: DELETE,
        url: `${APP_URL.character.delete}`,
        ...payload,
        onSuccess: '@@character/delete_character_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: DELETE_CHARACTER.START,
      meta: { ...payload },
    });
  });
});
