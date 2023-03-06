import { GET_SCENE, getScene } from './index';

describe('Get Scene Actions', () => {
  it('should dispatch an action to get scene', () => {
    const scenePayload = {
      id: 'test-id',
      key: '@@delete-scene-key',
      onFinish: () => {},
    };

    const { id, key, onFinish } = scenePayload;

    const expectedAction = {
      type: GET_SCENE.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(getScene(id, { key, onFinish })).toEqual(expectedAction);

    expect(GET_SCENE.START).toEqual('@@scene/get_scene_START');
    expect(GET_SCENE.END).toEqual('@@scene/get_scene_END');
    expect(GET_SCENE.SUCCESS).toEqual('@@scene/get_scene_SUCCESS');
    expect(GET_SCENE.ERROR).toEqual('@@scene/get_scene_ERROR');
  });
});
