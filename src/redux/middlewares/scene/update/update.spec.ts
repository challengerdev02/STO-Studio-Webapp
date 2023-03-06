import {
  serverRequest,
  UPDATE_SCENE,
  updateScene as defaultSceneAction,
} from '../../../actions';
import { updateScene as updateSceneMiddleware } from './index';
import { APP_URL, PATCH } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Update Scene: Update Scene Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let updateScene = defaultSceneAction;

  beforeEach(() => {
    updateScene = jest.fn(defaultSceneAction).mockReturnValue({
      type: UPDATE_SCENE.START,
      meta: payload,
    });
    mockedRedux.Scene = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      updateState: jest.fn(),
    };
    mockedRedux.store.updateState.mockReturnValue({
      Scene: {
        Scene: mockedRedux.Scene,
      },
    });
    mockedRedux.updateSceneAction = updateSceneMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the updateScene action since it is not in the tarupdateed list of actions', () => {
    mockedRedux.updateSceneAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.updateSceneAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(updateScene).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the updateScene actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.updateSceneAction(updateScene(payload, id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: PATCH,
        url: `${APP_URL.scene.update}/${id}`,
        onSuccess: '@@scene/update_scene_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: UPDATE_SCENE.START,
      meta: { ...payload },
    });
  });
});
