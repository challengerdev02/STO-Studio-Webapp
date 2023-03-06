import {
  serverRequest,
  GET_SCENES,
  getAllSeries as defaultSceneAction,
} from '../../../actions';
import { fetchScenes as fetchAllSceneMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Fetch all Scene: Fetch all Scene Test', function () {
  const mockedRedux: Record<string, any> = {};

  let fetchScene = defaultSceneAction;

  beforeEach(() => {
    fetchScene = jest.fn(defaultSceneAction).mockReturnValue({
      type: GET_SCENES.START,
      meta: {},
    });
    mockedRedux.Scene = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      fetchState: jest.fn(),
    };
    mockedRedux.store.fetchState.mockReturnValue({
      Scene: {
        Scene: mockedRedux.Scene,
      },
    });
    mockedRedux.fetchSceneAction = fetchAllSceneMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the fetchScene action since it is not in the tarfetched list of actions', () => {
    mockedRedux.fetchSceneAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.fetchSceneAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(fetchScene).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the fetchScene actions, then apiRequest action with correct parameters', () => {
    mockedRedux.fetchSceneAction(fetchScene({}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.scene.fetchAll}`,
        onSuccess: '@@scene/get_scenes_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_SCENES.START,
      meta: {},
    });
  });
});
