import { GenreComponent } from '@/components/genre';
import { useSeries } from '@/hooks';
import { useRouter } from 'next/router';
import { CATEGORIES } from '@/shared/constants';
import { SeriesNamespace } from '@/shared/namespaces/series';
import { mapSeriesToCard } from '@/shared/utils';

import { useEffect } from 'react';
import slugify from 'slugify';

export const GenresContainer = () => {
  const KEY = '@@genre/series';

  const { allSeriesByKey, handleBrowseSeries } = useSeries({
    key: KEY,
  });
  const router = useRouter();
  let { genre: selectedGenre } = router.query;

  // const onFindSeriesByGenres = () => {
  //   for (const genre of GENRES) {
  //     handleGetAll({
  //       key: `${KEY}/${genre}`,
  //       params: {
  //         genres: genre,
  //         perPage: 20,
  //         population: JSON.stringify(['user']),
  //       },
  //     });
  //   }
  // };
  const onFindSeriesByGenres = (genre: any, page = 1) => {
    //for (const genre of GENRES) {
    genre = CATEGORIES.find(
      (d: string) => slugify(d) == slugify(genre ?? CATEGORIES[0])
    );
    handleBrowseSeries({
      key: `${KEY}/${genre ?? CATEGORIES[0]}`,
      params: {
        perPage: 20,
        genres: genre,
        page,
      },
      virtualized: Number(page) > 1,
    });
    // }
  };

  useEffect(() => {
    if (
      selectedGenre?.length &&
      !allSeriesByKey[`${KEY}/${selectedGenre}`]?.length
    ) {
      onFindSeriesByGenres(selectedGenre);
    }
  }, [selectedGenre]);

  const onMapSeriesToData = (allSeries: SeriesNamespace.Series[]) => {
    return mapSeriesToCard(allSeries, router);
  };

  const onLoadMore = (_: string, pagination: Record<string, any>) => {
    onFindSeriesByGenres(selectedGenre, pagination?.next);
  };

  useEffect(() => {
    onFindSeriesByGenres(selectedGenre);
  }, []);

  return (
    <GenreComponent
      series={allSeriesByKey}
      onMapSeriesToData={onMapSeriesToData}
      onLoadMore={onLoadMore}
      genre={selectedGenre}
    />
  );
};
