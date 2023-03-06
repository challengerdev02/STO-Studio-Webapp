import { Container } from '../marketplace/marketplace-view/index.styled';
import { CardCarousel } from '@/components/marketplace/marketplace-view/carousel';
import { SeriesNamespace } from '@/shared/namespaces/series';
import { get } from 'lodash';
import { MarketplaceCardType } from '@/components/marketplace';
import { useUIState } from '@/hooks';
import { useRouter } from 'next/router';
import { CATEGORIES } from '@/shared/constants';
import { Button, Skeleton } from 'antd';
import slugify from 'slugify';

interface ReadSeriesProps {
  series: Record<string, SeriesNamespace.Series[]>;
  onMapSeriesToData: (
    series: SeriesNamespace.Series[]
  ) => MarketplaceCardType[];
}
export const ReadSeries = (props: ReadSeriesProps) => {
  const { series, onMapSeriesToData } = props;
  const router = useRouter();
  const { uiLoaders } = useUIState();
  const key = '@@read/series/grouped';

  return (
    <Container>
      {/*<section className={'marketPlaceBanner'}>*/}
      {/*  <a onClick={() => router.push('/competition/63823de17f5842757b00ed0a')}>*/}
      {/*    <Image src={'/images/enrollment-banner.png'} />*/}
      {/*  </a>*/}
      {/*</section>*/}
      {get(uiLoaders, key) && (
        <>
          <Skeleton style={{ opacity: 0.2 }} key={key} />
          <Skeleton style={{ opacity: 0.2 }} key={key} />
          <Skeleton style={{ opacity: 0.2 }} key={key} />
          <Skeleton style={{ opacity: 0.2 }} key={key} />
        </>
      )}
      <section className="mid">
        {series[key] &&
          CATEGORIES.map((genre, index) => {
            const genreSeries = get(series[key], genre);

            if (genreSeries && genreSeries.length < 1) {
              return null;
            }

            return (
              <section className="tail mb-10" key={key + index}>
                <div className="container">
                  <CardCarousel
                    filter={undefined}
                    title={genre}
                    cards={onMapSeriesToData(genreSeries)}
                    loading={get(uiLoaders, key)}
                    key={'series-read'}
                  />
                  <div style={{ textAlign: 'right' }}>
                    <Button
                      shape={'round'}
                      type={'ghost'}
                      onClick={() => router.push(`/genre/${slugify(genre)}`)}
                      size={'small'}
                    >
                      See more in {genre} ...
                    </Button>
                  </div>
                </div>
              </section>
            );
          })}
      </section>
    </Container>
  );
};
