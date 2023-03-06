import {
  serverRequest,
  DELETE_SCENE,
  deleteScene as defaultSceneAction,
} from '../../../actions';
import { deleteScene as deleteSceneMiddleware } from './index';
import { APP_URL, DELETE } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Delete Scene: Delete Scene Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let deleteScene = defaultSceneAction;

  beforeEach(() => {
    deleteScene = jest.fn(defaultSceneAction).mockReturnValue({
      type: DELETE_SCENE.START,
      meta: payload,
    });
    mockedRedux.scene = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      getState: jest.fn(),
    };
    mockedRedux.store.getState.mockReturnValue({
      scene: {
        scene: mockedRedux.scene,
      },
    });
    mockedRedux.deleteSceneAction = deleteSceneMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the deleteScene action since it is not in the targeted list of actions', () => {
    mockedRedux.deleteSceneAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.deleteSceneAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(deleteScene).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the deleteScene actions, then apiRequest action with correct parameters', () => {
    const { id } = payload;
    mockedRedux.deleteSceneAction(deleteScene(id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: DELETE,
        url: `${APP_URL.scene.delete}`,
        ...payload,
        onSuccess: '@@scene/delete_scene_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: DELETE_SCENE.START,
      meta: { ...payload },
    });
  });
});
