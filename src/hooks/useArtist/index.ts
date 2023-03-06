import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { useEffect } from 'react';
import {
  createArtist,
  updateArtist,
  deleteArtist,
  getAllArtists,
  getArtist,
} from '@/actions';
import { ArtistNamespace } from '@/shared/namespaces/artist';

interface UseArtist {
  artist?: ArtistNamespace.Artist;
  allArtists: ArtistNamespace.Artist[];
  handleCreate: (payload: Record<string, any>, options?: ActionOption) => void;
  handleUpdate: (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => void;
  handleGetAll: (options?: ActionOption) => void;
  handleDelete: (id: string, options?: ActionOption) => void;
  handleGet: (id: string, options?: ActionOption) => void;
}

interface UseArtistProps {
  key: string;
  autoFetch?: boolean;
  options?: ActionOption;
}

export const useArtist = (parameter: UseArtistProps): UseArtist => {
  const { key, autoFetch = false, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { artist, allArtists } = useSelector((state: RootState) => {
    return {
      artist: state.artist.artist[key] ?? {},
      allArtists: state.artist.allArtists[key] ?? [],
    };
  });

  const handleCreate = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      createArtist(payload, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  const handleUpdate = (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => {
    dispatch(
      updateArtist(payload, id, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  const handleDelete = (id: string, options?: ActionOption) => {
    dispatch(
      deleteArtist(id, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  const handleGetAll = (options?: ActionOption) => {
    dispatch(
      getAllArtists({
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  const handleGet = (id: string, options?: ActionOption) => {
    dispatch(
      getArtist(id, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  useEffect(() => {
    if (autoFetch) {
      handleGetAll({
        key: key,
      });
    }
  }, [autoFetch]);

  return {
    artist,
    allArtists,
    handleCreate,
    handleDelete,
    handleUpdate,
    handleGetAll,
    handleGet,
  };
};
