import { GET_SCENES, fetchScenes } from './index';

describe('Get Scenes Actions', () => {
  it('should dispatch an action to get scene', () => {
    const scenePayload = {
      key: '@@delete-scene-key',
      onFinish: () => {},
    };

    const { key, onFinish } = scenePayload;

    const expectedAction = {
      type: GET_SCENES.START,
      meta: {
        key,
        onFinish,
      },
    };
    expect(fetchScenes({ key, onFinish })).toEqual(expectedAction);

    expect(GET_SCENES.START).toEqual('@@scene/get_scenes_START');
    expect(GET_SCENES.END).toEqual('@@scene/get_scenes_END');
    expect(GET_SCENES.SUCCESS).toEqual('@@scene/get_scenes_SUCCESS');
    expect(GET_SCENES.ERROR).toEqual('@@scene/get_scenes_ERROR');
  });
});
