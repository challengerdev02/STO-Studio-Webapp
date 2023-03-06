import { Container } from '../marketplace/marketplace-view/index.styled';
import { CATEGORIES } from '@/shared/constants';
import { get, isEmpty } from 'lodash';
import { motion } from 'framer-motion';
import slugify from 'slugify';

import { SeriesNamespace } from '@/shared/namespaces/series';
import { MainLoader, MarketplaceCard, MarketplaceCardType } from '@/components';
import { Empty, Space, Tabs } from 'antd';
import {
  Gallery,
  LoadMore,
  LoadMoreButton,
} from '@/components/account/profile/index.styled';
import { useRouter } from 'next/router';
import { useUIState } from '@/hooks';
import { useEffect, useState } from 'react';

interface GenreComponentProps {
  series: Record<string, SeriesNamespace.Series[]>;
  onMapSeriesToData: (
    series: SeriesNamespace.Series[]
  ) => MarketplaceCardType[];
  onLoadMore: (key: string, pagination: any) => void;
  genre?: any;
}
export const GenreComponent = (props: GenreComponentProps) => {
  const { series, onMapSeriesToData, onLoadMore, genre } = props;
  const [activeTabKey, setActiveTabKey] = useState(`${slugify(CATEGORIES[0])}`);

  const router = useRouter();

  const { uiLoaders, pagination } = useUIState();

  const queryTab = slugify(String(genre ?? get(router.query, ['type'])));

  useEffect(() => {
    if (queryTab?.length) {
      setActiveTabKey(`${queryTab}`);
    }
  }, [queryTab]);

  const onTabChanged = (key: string) => {
    router.push(`/genre/${key}`);
  };

  return (
    <Container>
      <section className="mid">
        <Tabs activeKey={activeTabKey} onChange={onTabChanged}>
          {CATEGORIES.map((genre) => {
            const key = `@@genre/series/${genre}`;
            const slugKey = `${slugify(genre)}`;
            const genreSeries = get(series, key);
            const mappedData = onMapSeriesToData(genreSeries);
            const loading = get(uiLoaders, key);

            return (
              <Tabs.TabPane tab={genre} key={slugKey}>
                {isEmpty(genreSeries) && loading && (
                  <Space
                    size={20}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: 50,
                    }}
                    align={'center'}
                  >
                    <MainLoader height={50} width={50} />
                  </Space>
                )}
                {isEmpty(genreSeries) && !loading && (
                  <Space
                    size={20}
                    style={{ width: '100%', justifyContent: 'center' }}
                    align={'center'}
                  >
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <Space
                          size={20}
                          direction={'vertical'}
                          align={'center'}
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          <span>No series added yet</span>
                        </Space>
                      }
                    />
                  </Space>
                )}
                <Gallery data-testid="series-gallery">
                  {mappedData.map((series: any, index: any) => (
                    <motion.div
                      key={`${key}:${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: ((index + 1) % 20) * 0.1,
                      }}
                    >
                      <MarketplaceCard
                        {...series}
                        coverInfo={series?.coverInfo}
                        cardData={series?.cardData}
                        handleViewCreatedAsset={() => {
                          router.push(`/assets/series/${get(series, '_id')}`);
                        }}
                        cardType={'series'}
                      />
                    </motion.div>
                  ))}
                </Gallery>

                <LoadMore>
                  {pagination[key]?.next ? (
                    <LoadMoreButton
                      data-testid="load-more"
                      shape="round"
                      onClick={(_) => onLoadMore(key, pagination[key])}
                    >
                      <span>Load more</span>{' '}
                      {loading ? <i className="mc-loading-line mc-lg" /> : ''}
                    </LoadMoreButton>
                  ) : (
                    ''
                  )}
                </LoadMore>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </section>
    </Container>
  );
};
