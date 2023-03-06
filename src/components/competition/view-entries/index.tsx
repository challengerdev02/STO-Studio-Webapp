import { StyledDrawer } from '@/components/competition/view-entries/index.styled';
import { isDesktop } from 'react-device-detect';
import { CompetitionNamespace } from '@/shared/namespaces/competition';
import { get, isEmpty, map } from 'lodash';
import { Empty } from 'antd';
import { Gallery } from '@/components/account/profile/index.styled';
import { MarketplaceCard } from '@/components/marketplace';
import { useRouter } from 'next/router';
import { generateAvatar } from '@/shared/utils';

interface ViewCompetitionEntriesProps {
  visibility: boolean;
  // loadingEntries: boolean;
  entries: CompetitionNamespace.CompetitionEntry[];
  onClose: (visibility: boolean) => void;
  // pagination: Record<string, any>;
  // onGetEntries: (params: Record<string, any>) => void;
}
export const ViewCompetitionEntries = (props: ViewCompetitionEntriesProps) => {
  const {
    visibility,
    onClose,
    entries,
    // onGetEntries,
    // pagination,
    // loadingEntries,
  } = props;

  const series = map(entries, (entry) => ({
    ...entry.series,
    cardType: 'series',
    coverInfo: {
      coverImg: entry.series.image,
      menuItems: [],
    },
    cardData: {
      inWishlist: false,
      count: entry.series?.subscribers ?? '0',
      iconURL:
        entry.series.user?.avatar ??
        generateAvatar(entry.series?.user?.walletAddress),
      ...entry.series,
      cardType: 'series',
    },
  }));

  const router = useRouter();
  return (
    <StyledDrawer
      visible={visibility}
      placement="bottom"
      onClose={() => onClose(false)}
      // bodyStyle={{ padding: '55.5px 90.5px', paddingRight: 24 }}
      maskClosable
      // closable={false}
      height={isDesktop ? '100vh' : '90vh'}
      data-testid="isomorphic"
      borderRadius="0"
      title={<h1>Entries</h1>}
      className={'competition-entry'}
    >
      {isEmpty(series) && (
        <Empty
          description={'No entries yet!'}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        ></Empty>
      )}

      {!isEmpty(series) && (
        <>
          <Gallery data-testid="series-gallery">
            {series?.map((series: any, index: any) => (
              <MarketplaceCard
                {...series}
                key={`@@profile/series:${index}`}
                coverInfo={series?.coverInfo}
                cardData={series?.cardData}
                handleViewCreatedAsset={() => {
                  router.push(`/assets/series/${get(series, '_id')}`);
                }}
                cardType={'series'}
              />
            ))}
          </Gallery>

          {/*<LoadMore>*/}
          {/*  {has(pagination, 'next') ? (*/}
          {/*    <LoadMoreButton*/}
          {/*      data-testid="load-more"*/}
          {/*      shape="round"*/}
          {/*      onClick={(_) => onGetEntries({ type: 'SHOW_MORE_SERIES' })}*/}
          {/*    >*/}
          {/*      <span>Load more</span>{' '}*/}
          {/*      {loadingEntries ? <i className="mc-loading-line mc-lg" /> : ''}*/}
          {/*    </LoadMoreButton>*/}
          {/*  ) : (*/}
          {/*    ''*/}
          {/*  )}*/}
          {/*</LoadMore>*/}
        </>
      )}
    </StyledDrawer>
  );
};
