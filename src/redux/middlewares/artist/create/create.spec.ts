import {
  serverRequest,
  CREATE_ARTIST,
  createArtist as defaultArtistAction,
} from '../../../actions';
import { createArtist as createArtistMiddleware } from './index';
import { APP_URL, POST } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Create Artist: Create Artist Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let createArtist = defaultArtistAction;

  beforeEach(() => {
    createArtist = jest.fn(defaultArtistAction).mockReturnValue({
      type: CREATE_ARTIST.START,
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
    mockedRedux.createArtistAction = createArtistMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the createArtist action since it is not in the targeted list of actions', () => {
    mockedRedux.createArtistAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.createArtistAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(createArtist).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the createArtist actions, then apiRequest action with correct parameters', () => {
    mockedRedux.createArtistAction(createArtist(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: POST,
        url: `${APP_URL.artist.create}`,
        ...payload,
        onSuccess: '@@artist/create_artist_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: CREATE_ARTIST.START,
      meta: { ...payload },
    });
  });
});
