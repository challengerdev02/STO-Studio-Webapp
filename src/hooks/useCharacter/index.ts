import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { useEffect } from 'react';
import {
  createCharacter,
  updateCharacter,
  deleteCharacter,
  fetchCharacters,
  getCharacter,
} from '@/actions';
import { BookNamespace } from '@/shared/namespaces/book';

interface UseCharacter {
  character?: BookNamespace.Character;
  characters?: BookNamespace.Character[];
  handleCreateCharacter: (
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  handleUpdateCharacter: (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => void;
  handleFetchCharacters: (options?: ActionOption) => void;
  handleDeleteCharacter: (id: string, options?: ActionOption) => void;
  handleGetCharacter: (id: string, options?: ActionOption) => void;
}

interface UseCharacterProps {
  key: string;
  autoFetch?: boolean;
  options?: ActionOption;
}

export const useCharacter = (parameter: UseCharacterProps): UseCharacter => {
  const { key, autoFetch = false, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { character } = useSelector((state: RootState) => {
    return {
      character: state.characters.character[key] ?? [],
    };
  });

  const handleCreateCharacter = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      createCharacter(payload, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleUpdateCharacter = (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => {
    dispatch(
      updateCharacter(payload, id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleDeleteCharacter = (id: string, options?: ActionOption) => {
    dispatch(
      deleteCharacter(id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleFetchCharacters = (options?: ActionOption) => {
    dispatch(
      fetchCharacters({
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleGetCharacter = (id: string, options?: ActionOption) => {
    dispatch(
      getCharacter(id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  useEffect(() => {
    if (autoFetch) {
      handleFetchCharacters({
        key,
      });
    }
  }, [autoFetch]);

  return {
    character,
    handleCreateCharacter,
    handleDeleteCharacter,
    handleUpdateCharacter,
    handleFetchCharacters,
    handleGetCharacter,
  };
};
