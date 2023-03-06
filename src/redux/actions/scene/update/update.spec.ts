import { UPDATE_SCENE, updateScene } from './index';

describe('Update Scene Actions', () => {
  it('should dispatch an action to update scene', () => {
    const scenePayload = {
      id: 'test-id',
      link: 'test-link.com',
      artist: 'test-artist',
      key: '@@delete-scene-key',
      onFinish: () => {},
    };

    const { id, key, onFinish, link, artist } = scenePayload;
    const payload = {
      link,
      artist,
    };

    const expectedAction = {
      type: UPDATE_SCENE.START,
      meta: {
        payload: payload,
        id,
        key,
        onFinish,
      },
    };
    expect(updateScene(payload, id, { key, onFinish })).toEqual(expectedAction);

    expect(UPDATE_SCENE.START).toEqual('@@scene/update_scene_START');
    expect(UPDATE_SCENE.END).toEqual('@@scene/update_scene_END');
    expect(UPDATE_SCENE.SUCCESS).toEqual('@@scene/update_scene_SUCCESS');
    expect(UPDATE_SCENE.ERROR).toEqual('@@scene/update_scene_ERROR');
  });
});
