import { DELETE_SCENE, deleteScene } from './index';

describe('Delete Scene Actions', () => {
  it('should dispatch an action to delete scene', () => {
    const scenePayload = {
      id: 'test-id',
      key: '@@delete-scene-key',
      onFinish: () => {},
    };

    const { id, key, onFinish } = scenePayload;

    const expectedAction = {
      type: DELETE_SCENE.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(deleteScene(id, { key, onFinish })).toEqual(expectedAction);

    expect(DELETE_SCENE.START).toEqual('@@scene/delete_scene_START');
    expect(DELETE_SCENE.END).toEqual('@@scene/delete_scene_END');
    expect(DELETE_SCENE.SUCCESS).toEqual('@@scene/delete_scene_SUCCESS');
    expect(DELETE_SCENE.ERROR).toEqual('@@scene/delete_scene_ERROR');
  });
});
