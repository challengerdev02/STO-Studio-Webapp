import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { useEffect } from 'react';
import { getAllCollections } from '@/actions';
import { CollectionsNamespace } from '@/shared/namespaces/collections';

interface UseCollections {
  collections: CollectionsNamespace.Collections[];
  handleFetchCollections: (options?: ActionOption) => void;
}

interface UseCollectionsProps {
  key: string;
  autoFetch?: boolean;
  options?: ActionOption;
}

export const useCollections = (
  parameter: UseCollectionsProps
): UseCollections => {
  const { key, autoFetch = false, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { collections } = useSelector((state: RootState) => {
    return {
      collections: state.collections.collections[key] ?? [],
    };
  });

  const handleFetchCollections = (options?: ActionOption) => {
    dispatch(
      getAllCollections(Object.assign({}, defaultOptions, { key }, options))
    );
  };

  useEffect(() => {
    if (autoFetch) {
      handleFetchCollections({
        key,
      });
    }
  }, [autoFetch]);

  return {
    collections,
    handleFetchCollections,
  };
};
