import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { useEffect } from 'react';
import { getAllCreatedAssets, getAsset, updateAsset } from '@/actions';
import { AssetsNamespace } from '@/shared/namespaces/assets';

interface UseAssets {
  assets: AssetsNamespace.Assets[];
  handleFetchCreatedAssets: (options?: ActionOption) => void;
  asset: AssetsNamespace.Assets;
  handleGetAsset: (id: string, options?: ActionOption) => void;
  handleUpdateAsset: (payload: any, id: string, options?: ActionOption) => void;
}

interface UseAssetsProps {
  key: string;
  autoFetch?: boolean;
  options?: ActionOption;
}

export const useAssets = (parameter: UseAssetsProps): UseAssets => {
  const { key, autoFetch = false, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { assets, asset } = useSelector((state: RootState) => {
    return {
      assets: state.assets.assets[key] ?? [],
      asset: state.assets.asset[key] ?? {},
    };
  });

  const handleFetchCreatedAssets = (options?: ActionOption) => {
    dispatch(
      getAllCreatedAssets(Object.assign({}, defaultOptions, { key }, options))
    );
  };

  const handleGetAsset = (id: string, options?: ActionOption) => {
    dispatch(
      getAsset(id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  useEffect(() => {
    if (autoFetch) {
      handleFetchCreatedAssets({
        key,
      });
    }
  }, [autoFetch]);

  const handleUpdateAsset = (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => {
    dispatch(
      updateAsset(payload, id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  return {
    assets,
    handleFetchCreatedAssets,
    handleGetAsset,
    asset,
    handleUpdateAsset,
  };
};
