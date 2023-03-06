import { useSelector } from 'react-redux';
import { RootState } from '../../redux/state';

export type UseUiType = {
  uiErrors: Record<any, boolean>;
  uiLoaders: Record<any, boolean>;
  pagination: Record<string, any>;
};

export const useUIState = (): UseUiType => {
  const { uiErrors, uiLoaders, pagination } = useSelector(
    ({ ui }: RootState) => ({
      uiErrors: ui?.uiErrors,
      uiLoaders: ui?.uiLoaders,
      pagination: ui?.pagination,
    })
  );

  return {
    uiErrors,
    uiLoaders,
    pagination,
  };
};
