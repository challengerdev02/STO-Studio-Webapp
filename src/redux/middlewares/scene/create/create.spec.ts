import {
  serverRequest,
  CREATE_SCENE,
  createScene as defaultSceneAction,
} from '../../../actions';
import { createScene as createSceneMiddleware } from './index';
import { APP_URL, POST } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Create Scene: Create Scene Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let createScene = defaultSceneAction;

  beforeEach(() => {
    createScene = jest.fn(defaultSceneAction).mockReturnValue({
      type: CREATE_SCENE.START,
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
    mockedRedux.createSceneAction = createSceneMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the createScene action since it is not in the targeted list of actions', () => {
    mockedRedux.createSceneAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.createSceneAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(createScene).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the createScene actions, then apiRequest action with correct parameters', () => {
    mockedRedux.createSceneAction(createScene(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: POST,
        url: `${APP_URL.scene.create}`,
        ...payload,
        onSuccess: '@@scene/create_scene_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: CREATE_SCENE.START,
      meta: { ...payload },
    });
  });
});
