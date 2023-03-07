import { ReadSeries } from '@/components';
import { mapSeriesToCard } from '@/shared/utils';

import { useSeries } from '@/hooks';
import { CATEGORIES } from '@/shared/constants';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SeriesNamespace } from '@/shared/namespaces/series';

export const ReadSeriesContainer = () => {
  const featuredSeries = '@@read/series';

  const { allSeriesByKey, handleBrowseSeries } = useSeries({
    key: featuredSeries,
  });
  const router = useRouter();

  const onFindSeriesByGenres = () => {
    handleBrowseSeries({
      key: `${featuredSeries}/grouped`,
      params: {
        groups: JSON.stringify(CATEGORIES.map((d) => d)),
      },
    });
  };

  const onMapSeriesToData = (allSeries: SeriesNamespace.Series[]) => {
    return mapSeriesToCard(allSeries, router);
  };

  useEffect(() => {
    onFindSeriesByGenres();
  }, []);

  return (
    <ReadSeries series={allSeriesByKey} onMapSeriesToData={onMapSeriesToData} />
  );
};
