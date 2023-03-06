import { ImageViewComponent, MainLoader } from '@/components';
import { TrendingImages } from '@/components/marketplace/marketplace-view/utils';
import { useSale, useUIState } from '@/hooks';
import Text from 'antd/lib/typography/Text';
import { useEffect } from 'react';

export const FeaturedAndTrendingSection = () => {
  const key = '@@featured-marketplace-container';
  const trendingKey = '@@trending-marketplace-container';

  const { assets: bookSaleSchedules, getAllSaleAssets } = useSale({ key });
  const { assets: trendingAssets, getAllSaleAssets: getAllTrendingAssets } =
    useSale({ key: trendingKey });
  const { uiLoaders } = useUIState();
  const loading = uiLoaders[key];
  const loadingTrending = uiLoaders[trendingKey];

  useEffect(() => {
    getAllSaleAssets({
      params: {
        population: JSON.stringify(['user']),
      },
    });
    getAllTrendingAssets({
      params: {
        population: JSON.stringify(['user']),
        perPage: 6,
      },
    });
  }, []);

  const featuredBooks = (bookSaleSchedules ?? []).map((book: any) => ({
    src: book.asset.coverImage,
  }));
  const trendingBooks = (trendingAssets ?? []).map(
    (book: any) => book.asset.coverImage
  );

  return (
    <>
      <section className="main-section">
        <div className="featured half">
          <Text className="heading">Featured</Text>
          {!loading ? (
            <ImageViewComponent images={featuredBooks} />
          ) : (
            <div
              style={{ height: '50vh' }}
              className={'meta-flex-center meta-flex'}
            >
              <MainLoader height={40} width={40} />
            </div>
          )}
        </div>

        <div className="trending half">
          <Text className="heading">Trending</Text>

          {!loadingTrending ? (
            <TrendingImages images={trendingBooks} />
          ) : (
            <div
              style={{ height: '50vh' }}
              className={'meta-flex-center meta-flex'}
            >
              <MainLoader height={40} width={40} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
