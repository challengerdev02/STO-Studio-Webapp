import {
  serverRequest,
  GET_SCENE,
  getScene as defaultSceneAction,
} from '../../../actions';
import { getScene as getSceneMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Get Scene: Get Scene Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let getScene = defaultSceneAction;

  beforeEach(() => {
    getScene = jest.fn(defaultSceneAction).mockReturnValue({
      type: GET_SCENE.START,
      meta: payload,
    });
    mockedRedux.Scene = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      getState: jest.fn(),
    };
    mockedRedux.store.getState.mockReturnValue({
      Scene: {
        Scene: mockedRedux.Scene,
      },
    });
    mockedRedux.getSceneAction = getSceneMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the getScene action since it is not in the targeted list of actions', () => {
    mockedRedux.getSceneAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.getSceneAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(getScene).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the getScene actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.getSceneAction(getScene(id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.scene.get}/${id}`,
        onSuccess: '@@scene/get_scene_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_SCENE.START,
      meta: { ...payload },
    });
  });
});
