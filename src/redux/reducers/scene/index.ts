import { Action } from '../../types';
import { CREATE_SCENE, GET_SCENES, GET_SCENE, UPDATE_SCENE } from '@/actions';
import { arrayToById } from '@/shared/utils';
import { SceneNamespace } from '@/shared/namespaces/scene';

export interface SceneReducerState {
  scenes: Record<string, SceneNamespace.Scene[]>;
  scenesById: Record<string, Record<string, SceneNamespace.Scene>>;
  scene: Record<string, SceneNamespace.Scene>;
}

export const SceneDefaultState: SceneReducerState = {
  scenes: {},
  scenesById: {},
  scene: {},
};

const SceneReducer = (state = SceneDefaultState, action: Action) => {
  switch (action.type) {
    case CREATE_SCENE.SUCCESS:
      return {
        ...state,
        scene: {
          ...state.scene,
          [action.key]: action.payload,
        },
      };

    case GET_SCENE.SUCCESS:
      return {
        ...state,
        scene: {
          ...state.scene,
          [action.key]: action.payload,
        },
      };

    case GET_SCENES.SUCCESS: {
      const byId = arrayToById(action?.payload ?? []);

      return {
        ...state,
        scenesById: {
          ...state.scenesById,
          [action.key]: byId,
        },
        scenes: {
          ...state.scenes,
          [action.key]: action.payload ?? [],
        },
      };
    }

    case UPDATE_SCENE.SUCCESS: {
      const scenes = state.scenes[action.key] ?? [];

      const index = scenes.findIndex((o) => o?._id === action.payload?._id);

      let currentScene = {};

      if (index !== -1) {
        currentScene = Object.assign({}, scenes[index], action.payload);
        scenes[index] = Object.assign({}, scenes[index], action.payload);
      } else {
        currentScene = Object.assign({}, action.payload);
        scenes.push(action.payload);
      }

      const byId = arrayToById(scenes ?? []);

      return {
        ...state,
        scenesById: {
          ...state.scenesById,
          [action.key]: byId,
        },
        scenes: {
          ...state.scenes,
          [action.key]: scenes ?? [],
        },
        scene: {
          ...state.scene,
          [action.key]: currentScene,
        },
      };
    }

    default:
      return state;
  }
};

export default SceneReducer;
