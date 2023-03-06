import { CREATE_SCENE, createScene } from './index';

describe('Create Scene Actions', () => {
  it('should dispatch an action to create scene', () => {
    const scenePayload = {
      title: 'test-title',
      link: 'test-link.com',
      key: '@@create-scene-key',
      onFinish: () => {},
    };

    const { title, link, key, onFinish } = scenePayload;

    const expectedAction = {
      type: CREATE_SCENE.START,
      meta: {
        payload: { title, link },
        key,
        onFinish,
      },
    };
    expect(createScene({ title, link }, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(CREATE_SCENE.START).toEqual('@@scene/create_scene_START');
    expect(CREATE_SCENE.END).toEqual('@@scene/create_scene_END');
    expect(CREATE_SCENE.SUCCESS).toEqual('@@scene/create_scene_SUCCESS');
    expect(CREATE_SCENE.ERROR).toEqual('@@scene/create_scene_ERROR');
  });
});
