import {
  serverRequest,
  CREATE_CHARACTER,
  createCharacter as defaultCharacterAction,
} from '../../../actions';
import { createCharacter as createCharacterMiddleware } from './index';
import { APP_URL, POST } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Create Character: Create Character Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let createCharacter = defaultCharacterAction;

  beforeEach(() => {
    createCharacter = jest.fn(defaultCharacterAction).mockReturnValue({
      type: CREATE_CHARACTER.START,
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
    mockedRedux.createCharacterAction = createCharacterMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the createCharacter action since it is not in the targeted list of actions', () => {
    mockedRedux.createCharacterAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.createCharacterAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(createCharacter).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the createCharacter actions, then apiRequest action with correct parameters', () => {
    mockedRedux.createCharacterAction(createCharacter(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: POST,
        url: `${APP_URL.character.create}`,
        ...payload,
        onSuccess: '@@character/create_character_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: CREATE_CHARACTER.START,
      meta: { ...payload },
    });
  });
});
