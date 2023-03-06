import {
  serverRequest,
  GET_ARTIST,
  getArtist as defaultArtistAction,
} from '../../../actions';
import { getArtist as getArtistMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Get Artist: Get Artist Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let getArtist = defaultArtistAction;

  beforeEach(() => {
    getArtist = jest.fn(defaultArtistAction).mockReturnValue({
      type: GET_ARTIST.START,
      meta: payload,
    });
    mockedRedux.artist = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      getState: jest.fn(),
    };
    mockedRedux.store.getState.mockReturnValue({
      artist: {
        artist: mockedRedux.artist,
      },
    });
    mockedRedux.getArtistAction = getArtistMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the getArtist action since it is not in the targeted list of actions', () => {
    mockedRedux.getArtistAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.getArtistAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(getArtist).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the getArtist actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.getArtistAction(getArtist(id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.artist.get}/${id}`,
        onSuccess: '@@artist/get_artist_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_ARTIST.START,
      meta: { ...payload },
    });
  });
});
