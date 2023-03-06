import {
  serverRequest,
  GET_CHARACTER,
  getCharacter as defaultCharacterAction,
} from '../../../actions';
import { getCharacter as getCharacterMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Get Character: Get Character Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let getCharacter = defaultCharacterAction;

  beforeEach(() => {
    getCharacter = jest.fn(defaultCharacterAction).mockReturnValue({
      type: GET_CHARACTER.START,
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
    mockedRedux.getCharacterAction = getCharacterMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the getCharacter action since it is not in the targeted list of actions', () => {
    mockedRedux.getCharacterAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.getCharacterAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(getCharacter).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the getCharacter actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.getCharacterAction(getCharacter(id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.character.get}/${id}`,
        onSuccess: '@@character/get_character_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_CHARACTER.START,
      meta: { ...payload },
    });
  });
});
