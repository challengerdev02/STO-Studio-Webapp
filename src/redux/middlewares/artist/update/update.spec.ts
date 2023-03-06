import {
  serverRequest,
  UPDATE_ARTIST,
  updateArtist as defaultArtistAction,
} from '../../../actions';
import { updateArtist as updateArtistMiddleware } from './index';
import { APP_URL, PUT } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Update Artist: Update Artist Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let updateArtist = defaultArtistAction;

  beforeEach(() => {
    updateArtist = jest.fn(defaultArtistAction).mockReturnValue({
      type: UPDATE_ARTIST.START,
      meta: payload,
    });
    mockedRedux.artist = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      updateState: jest.fn(),
    };
    mockedRedux.store.updateState.mockReturnValue({
      artist: {
        artist: mockedRedux.artist,
      },
    });
    mockedRedux.updateArtistAction = updateArtistMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the updateArtist action since it is not in the tarupdateed list of actions', () => {
    mockedRedux.updateArtistAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.updateArtistAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(updateArtist).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the updateArtist actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.updateArtistAction(updateArtist(payload, id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: PUT,
        url: `${APP_URL.artist.update}/${id}`,
        onSuccess: '@@artist/update_artist_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: UPDATE_ARTIST.START,
      meta: { ...payload },
    });
  });
});
