import {
  serverRequest,
  GET_ALL_ARTIST,
  getAllArtists as defaultArtistAction,
} from '../../../actions';
import { fetchAllArtists as fetchAllArtistMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Fetch all Artist: Fetch all Artist Test', function () {
  const mockedRedux: Record<string, any> = {};

  let fetchArtist = defaultArtistAction;

  beforeEach(() => {
    fetchArtist = jest.fn(defaultArtistAction).mockReturnValue({
      type: GET_ALL_ARTIST.START,
      meta: {},
    });
    mockedRedux.artist = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      fetchState: jest.fn(),
    };
    mockedRedux.store.fetchState.mockReturnValue({
      artist: {
        artist: mockedRedux.artist,
      },
    });
    mockedRedux.fetchArtistAction = fetchAllArtistMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the fetchArtist action since it is not in the tarfetched list of actions', () => {
    mockedRedux.fetchArtistAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.fetchArtistAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(fetchArtist).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the fetchArtist actions, then apiRequest action with correct parameters', () => {
    mockedRedux.fetchArtistAction(fetchArtist({}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.artist.fetchAll}`,
        onSuccess: '@@artist/get_all_artist_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_ALL_ARTIST.START,
      meta: {},
    });
  });
});
