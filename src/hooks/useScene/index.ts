import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { useEffect } from 'react';
import {
  createScene,
  updateScene,
  deleteScene,
  fetchScenes,
  getScene,
} from '@/actions';
import { SceneNamespace } from '@/shared/namespaces/scene';

interface UseScene {
  scene?: SceneNamespace.Scene;
  scenes?: SceneNamespace.Scene[];
  handleCreateScene: (
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  handleUpdateScene: (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => void;
  handleFetchScenes: (options?: ActionOption) => void;
  handleDeleteScene: (id: string, options?: ActionOption) => void;
  handleGetScene: (id: string, options?: ActionOption) => void;
}

interface UseSceneProps {
  key: string;
  autoFetch?: boolean;
  options?: ActionOption;
}

export const useScene = (parameter: UseSceneProps): UseScene => {
  const { key, autoFetch = false, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { scene } = useSelector((state: RootState) => {
    return {
      scene: state.scene.scene[key] ?? [],
    };
  });

  const handleCreateScene = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      createScene(payload, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleUpdateScene = (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => {
    dispatch(
      updateScene(payload, id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleDeleteScene = (id: string, options?: ActionOption) => {
    dispatch(
      deleteScene(id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleFetchScenes = (options?: ActionOption) => {
    dispatch(
      fetchScenes({
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleGetScene = (id: string, options?: ActionOption) => {
    dispatch(
      getScene(id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  useEffect(() => {
    if (autoFetch) {
      handleFetchScenes({
        key,
      });
    }
  }, [autoFetch]);

  return {
    scene,
    handleCreateScene,
    handleDeleteScene,
    handleUpdateScene,
    handleFetchScenes,
    handleGetScene,
  };
};
