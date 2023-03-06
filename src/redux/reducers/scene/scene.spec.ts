import SceneReducer, { SceneDefaultState as defaultState } from './index';
import { arrayToById } from '../../../_shared/utils';
import {
  CREATE_SCENE,
  DELETE_SCENE,
  GET_SCENE,
  GET_SCENES,
  UPDATE_SCENE,
} from '@/actions';

describe('Reducer: Scene', () => {
  it('Should return a Scene', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const mockAction = {
      type: GET_SCENE.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      scene: {
        ...defaultState.scene,
        [mockAction.key]: mockAction.payload,
      },
    };
    expect(SceneReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should get list of Scene', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];
    const mockAction = {
      type: GET_SCENES.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };

    const byId = arrayToById(mockAction?.payload ?? []);

    const expectedResult = {
      ...defaultState,
      scenesById: {
        ...defaultState.scenesById,
        [mockAction.key]: byId,
      },
      scenes: {
        ...defaultState.scenes,
        [mockAction.key]: mockAction.payload ?? [],
      },
    };
    expect(SceneReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should Create a Scene', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const mockAction = {
      type: CREATE_SCENE.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      scene: {
        ...defaultState.scene,
        [mockAction.key]: mockAction.payload,
      },
    };

    expect(SceneReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should Update a Scene', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];
    const mockMPayload = {
      '0': { id: 'test-1' },
      '1': { id: 'test-2' },
      '2': { id: 'test-3' },
    };

    const mockAction = {
      type: UPDATE_SCENE.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      scene: {
        ...defaultState.scene,
        [mockAction.key]: mockMPayload,
      },
      scenesById: {
        ...defaultState.scenesById,
        [mockAction.key]: { undefined: mockPayload },
      },
      scenes: {
        ...defaultState.scenes,
        [mockAction.key]: [mockPayload] ?? [],
      },
    };
    expect(SceneReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should Delete a Scene', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];
    const mockMPayload = {
      '0': { id: 'test-1' },
      '1': { id: 'test-2' },
      '2': { id: 'test-3' },
    };

    const mockAction = {
      type: DELETE_SCENE.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      scene: {},
      scenesById: {},
      scenes: {},
    };
    expect(SceneReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('should return initial state when there is no action', () => {
    expect(SceneReducer(defaultState, { type: '' })).toEqual(defaultState);
  });
});
