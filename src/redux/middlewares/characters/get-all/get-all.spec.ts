import {
  serverRequest,
  GET_CHARACTERS,
  fetchCharacters as defaultCharacterAction,
} from '../../../actions';
import { fetchCharacters as fetchAllCharacterMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Fetch all Character: Fetch all Character Test', function () {
  const mockedRedux: Record<string, any> = {};

  let fetchCharacter = defaultCharacterAction;

  beforeEach(() => {
    fetchCharacter = jest.fn(defaultCharacterAction).mockReturnValue({
      type: GET_CHARACTERS.START,
      meta: {},
    });
    mockedRedux.Character = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      fetchState: jest.fn(),
    };
    mockedRedux.store.fetchState.mockReturnValue({
      Character: {
        Character: mockedRedux.Character,
      },
    });
    mockedRedux.fetchCharacterAction = fetchAllCharacterMiddleware(
      mockedRedux.store
    )(mockedRedux.nextMock);
  });

  it('should not dispatch the fetchCharacter action since it is not in the tarfetched list of actions', () => {
    mockedRedux.fetchCharacterAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.fetchCharacterAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(fetchCharacter).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the fetchCharacter actions, then apiRequest action with correct parameters', () => {
    mockedRedux.fetchCharacterAction(fetchCharacter({}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.character.fetchAll}`,
        onSuccess: '@@character/get_characters_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_CHARACTERS.START,
      meta: {},
    });
  });
});
