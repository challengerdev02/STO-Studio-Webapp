import { useRouter } from 'next/router';
import { useSearchItem, useUIState } from '@/hooks';
import { Search } from '@/components';
import { useEffect } from 'react';

export const SearchContainer = () => {
  const { query } = useRouter();

  const { q: searchQuery } = query;

  const searchKey = '@@search-page/search-key';

  const { items, clearSearch, handleSearch } = useSearchItem({
    key: searchKey,
  });

  const {
    uiLoaders: { [searchKey]: isSearching },
    pagination: { [searchKey]: pagination },
  } = useUIState();

  const onSearch = (virtualized = false, params = {}) => {
    handleSearch({
      params: { search: searchQuery, perPage: 12, ...params },
      virtualized,
    });
  };

  useEffect(() => {
    if (searchQuery) {
      onSearch();
    }
  }, [searchQuery]);

  return (
    <>
      <Search
        onSearch={onSearch}
        searchItem={items}
        clearSearch={clearSearch}
        loading={isSearching}
        pagination={pagination}
      />
    </>
  );
};
