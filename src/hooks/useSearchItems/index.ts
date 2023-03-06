import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { clearSearch, searchItems } from '@/actions';
import { BookNamespace } from '@/shared/namespaces/book';

interface UseSearchItem {
  items: BookNamespace.SearchItem;
  handleSearch: (options?: ActionOption) => void;
  clearSearch: () => void;
}

interface UseSearchItemProps {
  key: string;
  options?: ActionOption;
}

export const useSearchItem = (parameter: UseSearchItemProps): UseSearchItem => {
  const { key, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { searchItems: items } = useSelector((state: RootState) => {
    return {
      searchItems: state.book.searchItems[key] ?? [],
    };
  });

  const handleSearch = (options?: ActionOption) => {
    dispatch(
      searchItems({
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };
  const handleClearSearch = () => {
    dispatch(
      clearSearch({
        key,
      })
    );
  };

  return {
    handleSearch,
    clearSearch: handleClearSearch,
    items,
  };
};
