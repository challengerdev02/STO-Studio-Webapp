import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { getExternalResource } from '@/actions';

interface UseExternalResource {
  resource: any;
  getExternalResource: (url: string, options?: ActionOption) => void;
}

interface UseExternalResourceProps {
  key: string;
  options?: ActionOption;
}

export const useExternalResource = (
  parameter: UseExternalResourceProps
): UseExternalResource => {
  const { key, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { resource } = useSelector((state: RootState) => {
    return {
      resource: state.externalResources.resources ?? {},
    };
  });

  const _getExternalResource = (url: string, options?: ActionOption) => {
    dispatch(
      getExternalResource(
        Object.assign({}, defaultOptions, { key }, options, { url })
      )
    );
  };

  return {
    resource,
    getExternalResource: _getExternalResource,
  };
};
