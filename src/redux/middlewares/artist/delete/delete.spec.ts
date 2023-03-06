import {
  serverRequest,
  DELETE_ARTIST,
  deleteArtist as defaultArtistAction,
} from '../../../actions';
import { deleteArtist as deleteArtistMiddleware } from './index';
import { APP_URL, DELETE } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Delete Artist: Delete Artist Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let deleteArtist = defaultArtistAction;

  beforeEach(() => {
    deleteArtist = jest.fn(defaultArtistAction).mockReturnValue({
      type: DELETE_ARTIST.START,
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
    mockedRedux.deleteArtistAction = deleteArtistMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the deleteArtist action since it is not in the targeted list of actions', () => {
    mockedRedux.deleteArtistAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.deleteArtistAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(deleteArtist).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the deleteArtist actions, then apiRequest action with correct parameters', () => {
    const { id } = payload;
    mockedRedux.deleteArtistAction(deleteArtist(id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: DELETE,
        url: `${APP_URL.artist.delete}`,
        ...payload,
        onSuccess: '@@artist/delete_artist_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: DELETE_ARTIST.START,
      meta: { ...payload },
    });
  });
});
