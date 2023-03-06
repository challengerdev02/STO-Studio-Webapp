import {
  Gallery,
  LoadMore,
  LoadMoreButton,
  Tab,
  TabRow,
  TabWrapper,
} from '../../../../components/account/profile/index.styled';
import { Button, Empty, FormInstance, Space, Tabs } from 'antd';
import { get, isEmpty } from 'lodash';
import { MarketplaceCard } from '@/components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import slugify from 'slugify';
// import qs from 'qs';

// const { Option } = Select;
const { TabPane } = Tabs;

interface ProfileTabsProps {
  form: FormInstance;
  onFinish: (values: Record<string, any>) => void;
  onFilterReset: () => void;
  onFilterSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  $record: Record<string, any>;
  onLoadMore: (action: Record<string, any>) => void;
  loading: Record<string, any>;
  showLoad: Record<string, any>;
}
export const ProfileTabs = (props: ProfileTabsProps) => {
  const {
    // form,
    // onFinish,
    // onFilterReset,
    // onFilterSearch,
    $record,
    onLoadMore,
    loading: {
      loadingForOnsaleItems,
      // loadingForCreatedItems,
      loadingForCollectedItems,
      loadingSeries,
    },
    showLoad,
  } = props;

  const [currentTab, setCurrentTab] = useState('created');
  const router = useRouter();

  const { tab, accountAddress } = router.query;

  const onTabChange = (tab: string) => {
    router.push(`${accountAddress ?? 'account'}/?tab=${tab}`).then();
  };

  useEffect(() => {
    if (tab) {
      // onTabChange(tab as string);
      setCurrentTab(String(tab));
    }
  }, [tab]);

  // TODO: Remove after [Redundant]
  // const showLoad = false;
  return (
    <TabRow>
      <TabWrapper>
        <Tab
          data-testid="tab"
          defaultActiveKey="created"
          type="card"
          activeKey={currentTab}
          onChange={onTabChange}
        >
          <TabPane tab="Created Series" key="created">
            {isEmpty($record.series) && (
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
                      <Button
                        type={'primary'}
                        onClick={() => router.push(`/assets/create`)}
                        shape={'round'}
                        size={'small'}
                      >
                        Create New Collection
                      </Button>
                    </Space>
                  }
                />
              </Space>
            )}
            <Gallery data-testid="series-gallery">
              {$record?.series?.map((series: any, index: any) => (
                <MarketplaceCard
                  {...series}
                  key={`@@profile/series:${index}`}
                  coverInfo={series?.coverInfo}
                  cardData={series?.cardData}
                  handleViewCreatedAsset={() => {
                    router.push(
                      `/assets/series/${slugify(series.title)}-${get(
                        series,
                        '_id'
                      )}`
                    );
                  }}
                  cardType={'series'}
                />
              ))}
            </Gallery>

            <LoadMore>
              {showLoad?.series ? (
                <LoadMoreButton
                  data-testid="load-more"
                  shape="round"
                  onClick={(_) => onLoadMore({ type: 'SHOW_MORE_SERIES' })}
                >
                  <span>Load more</span>{' '}
                  {loadingSeries ? <i className="mc-loading-line mc-lg" /> : ''}
                </LoadMoreButton>
              ) : (
                ''
              )}
            </LoadMore>
          </TabPane>
          <TabPane tab="On Sale" key="sale">
            {/* <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
            >
              <FilterRow>
                <FormItem name="category">
                  <SelectMenu
                    data-testid="select-category"
                    bordered={false}
                    suffixIcon={
                      <i className="mc-arrow-down-simple-line mc-2x down-arrow" />
                    }
                    placeholder={
                      <span className="options-inner">
                        {' '}
                        <i className="mc-grid-line mc-1x" />{' '}
                        {truncate(`Category`, {
                          length: 20,
                        })}
                      </span>
                    }
                  >
                    <Option value="category" title="Category">
                      Top Category
                    </Option>
                  </SelectMenu>
                </FormItem>
                <FormItem name="collections">
                  <SelectMenu
                    data-testid="select-collections"
                    bordered={false}
                    suffixIcon={
                      <i className="mc-arrow-down-simple-line mc-2x down-arrow" />
                    }
                    placeholder={
                      <span className="options-inner">
                        {' '}
                        <i className="mc-heart-line mc-1x" />{' '}
                        {truncate(`Collections`, {
                          length: 20,
                        })}
                      </span>
                    }
                  >
                    <Option value="collections" title="Collections">
                      New Collections
                    </Option>
                  </SelectMenu>
                </FormItem>

                <FormItem name="saleType">
                  <SelectMenu
                    data-testid="select-sale-type"
                    bordered={false}
                    suffixIcon={
                      <i className="mc-arrow-down-simple-line mc-2x down-arrow" />
                    }
                    placeholder={
                      <span className="options-inner">
                        {' '}
                        <i className="mc-shopping-tag-line mc-1x" />{' '}
                        {truncate(`Sale Type`, {
                          length: 20,
                        })}
                      </span>
                    }
                  >
                    <Option value="saleType" title="Sale Type">
                      Sale Type
                    </Option>
                  </SelectMenu>
                </FormItem>

                <FormItem name="timed Auction, fixed price, open for offers">
                  <SelectMenu
                    data-testid="select-timed-auction"
                    bordered={false}
                    suffixIcon={
                      <i className="mc-arrow-down-simple-line mc-2x down-arrow" />
                    }
                    placeholder={
                      <span className="options-inner">
                        {' '}
                        <i className="mc-coin-line mc-1x" />{' '}
                        {truncate(
                          `Timed Auction,
                              fixed price, open for offers`,
                          {
                            length: 20,
                          }
                        )}
                      </span>
                    }
                  >
                    <Option
                      value="timed Auction, fixed price, open for offers"
                      title="Timed Auction, fixed price, open for offers"
                    >
                      Timed Auction, fixed price, open for offers
                    </Option>
                    <Option value="blockchain" title="Blockchain">
                      Blockchain
                    </Option>
                  </SelectMenu>
                </FormItem>
                <FormItem name="reset">
                  <Button type="text" onClick={onFilterReset}>
                    Reset
                  </Button>
                </FormItem>
              </FilterRow>
              <FilterRow>
                <FormItem name="search">
                  <SearchBar
                    data-testid="search"
                    placeholder="Search"
                    allowClear
                    onChange={onFilterSearch}
                  />
                </FormItem>
                <FormItem name="singleItem">
                  <SelectMenu
                    bordered={false}
                    suffixIcon={
                      <i className="mc-arrow-down-simple-line mc-2x down-arrow" />
                    }
                    placeholder={truncate(`Single items`, {
                      length: 20,
                    })}
                  >
                    <Option value="Item A" title="Item A">
                      Item A
                    </Option>
                  </SelectMenu>
                </FormItem>

                <FormItem name="recentlyReceived">
                  <SelectMenu
                    bordered={false}
                    suffixIcon={
                      <i className="mc-arrow-down-simple-line mc-2x down-arrow" />
                    }
                    placeholder={truncate(`Recently Received`, {
                      length: 20,
                    })}
                  >
                    <Option value="Item A" title="Item A">
                      Item A
                    </Option>
                  </SelectMenu>
                </FormItem>

                <FormItem name="recentlyAdded">
                  <SelectMenu
                    bordered={false}
                    suffixIcon={
                      <i className="mc-arrow-down-simple-line mc-2x down-arrow" />
                    }
                    placeholder={truncate(`Recently Added`, {
                      length: 20,
                    })}
                  >
                    <Option value="Item A" title="Item A">
                      Item A
                    </Option>
                  </SelectMenu>
                </FormItem>
              </FilterRow>
            </Form> */}

            {isEmpty($record.auctions) && (
              <Space
                size={20}
                style={{ width: '100%', justifyContent: 'center' }}
                align={'center'}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={'No items on sale yet'}
                />
              </Space>
            )}
            <Gallery data-testid="auctions-gallery">
              {$record?.auctions?.map(
                (auction: Record<string, any>, index: any) => (
                  <MarketplaceCard
                    key={index}
                    coverInfo={auction?.coverInfo}
                    cardData={auction?.cardData}
                  />
                )
              )}
            </Gallery>

            <LoadMore>
              {showLoad?.forOnsaleItems ? (
                <LoadMoreButton
                  data-testid="load-more"
                  shape="round"
                  onClick={(_) => onLoadMore({ type: 'SHOW_MORE_SALE_ASSETS' })}
                >
                  <span>Load more</span>{' '}
                  {loadingForOnsaleItems ? (
                    <i className="mc-loading-line mc-lg" />
                  ) : (
                    ''
                  )}
                </LoadMoreButton>
              ) : (
                ''
              )}
            </LoadMore>
          </TabPane>
          {/*<TabPane tab="Created" key="created">*/}
          {/*  {isEmpty($record.createdAssets) && (*/}
          {/*    <Space*/}
          {/*      size={20}*/}
          {/*      style={{ width: '100%', justifyContent: 'center' }}*/}
          {/*      align={'center'}*/}
          {/*    >*/}
          {/*      <Empty*/}
          {/*        image={Empty.PRESENTED_IMAGE_SIMPLE}*/}
          {/*        description={'No assets yet'}*/}
          {/*      />*/}
          {/*    </Space>*/}
          {/*  )}*/}
          {/*  <Gallery data-testid="auctions-gallery">*/}
          {/*    {$record?.createdAssets?.map((asset: any, index: any) => (*/}
          {/*      <MarketplaceCard*/}
          {/*        key={index}*/}
          {/*        cardType="createdAsset"*/}
          {/*        coverInfo={asset?.asset}*/}
          {/*        cardData={asset?.assetData}*/}
          {/*        handleViewCreatedAsset={asset.asset.previewCreatedAsset}*/}
          {/*      />*/}
          {/*    ))}*/}
          {/*  </Gallery>*/}

          {/*  <LoadMore>*/}
          {/*    {showLoad?.forCreatedItems ? (*/}
          {/*      <LoadMoreButton*/}
          {/*        data-testid="load-more"*/}
          {/*        shape="round"*/}
          {/*        onClick={(_) =>*/}
          {/*          onLoadMore({ type: 'SHOW_MORE_CREATED_ASSETS' })*/}
          {/*        }*/}
          {/*      >*/}
          {/*        <span>Load more</span>{' '}*/}
          {/*        {loadingForCreatedItems ? (*/}
          {/*          <i className="mc-loading-line mc-lg" />*/}
          {/*        ) : (*/}
          {/*          ''*/}
          {/*        )}*/}
          {/*      </LoadMoreButton>*/}
          {/*    ) : (*/}
          {/*      ''*/}
          {/*    )}*/}
          {/*  </LoadMore>*/}
          {/*</TabPane>*/}
          <TabPane tab="Collected NFTs" key="collected">
            {isEmpty($record.collections) && (
              <Space
                size={20}
                style={{ width: '100%', justifyContent: 'center' }}
                align={'center'}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={'No collected book or art on the selected chain'}
                />
              </Space>
            )}
            <Gallery data-testid="auctions-gallery">
              {$record?.collections?.map((collection: any, index: any) => (
                <MarketplaceCard
                  key={index}
                  cardType="collection"
                  coverInfo={collection}
                  cardData={get(collection, 'metadata')}
                  handleViewCollection={collection.previewCollection}
                />
              ))}
            </Gallery>

            <LoadMore>
              {showLoad?.forCollectedItems ? (
                <LoadMoreButton
                  data-testid="load-more"
                  shape="round"
                  onClick={(_) => onLoadMore({ type: 'SHOW_MORE_COLLECTIONS' })}
                >
                  <span>Load more</span>{' '}
                  {loadingForCollectedItems ? (
                    <i className="mc-loading-line mc-lg" />
                  ) : (
                    ''
                  )}
                </LoadMoreButton>
              ) : (
                ''
              )}
            </LoadMore>
          </TabPane>
          {/*/!* <TabPane tab="Liked" key="4" />*/}

          {/*<TabPane tab="Series" key="series">*/}
          {/*  {isEmpty($record.series) && (*/}
          {/*    <Space*/}
          {/*      size={20}*/}
          {/*      style={{ width: '100%', justifyContent: 'center' }}*/}
          {/*      align={'center'}*/}
          {/*    >*/}
          {/*      <Empty*/}
          {/*        image={Empty.PRESENTED_IMAGE_SIMPLE}*/}
          {/*        description={*/}
          {/*          <Space*/}
          {/*            size={20}*/}
          {/*            direction={'vertical'}*/}
          {/*            align={'center'}*/}
          {/*            style={{ width: '100%', justifyContent: 'center' }}*/}
          {/*          >*/}
          {/*            <span>No series added yet</span>*/}
          {/*            <Button*/}
          {/*              type={'primary'}*/}
          {/*              href={'/assets/series/create'}*/}
          {/*              shape={'round'}*/}
          {/*              size={'small'}*/}
          {/*            >*/}
          {/*              Add Series*/}
          {/*            </Button>*/}
          {/*          </Space>*/}
          {/*        }*/}
          {/*      />*/}
          {/*    </Space>*/}
          {/*  )}*/}
          {/*  <Gallery data-testid="series-gallery">*/}
          {/*    {$record?.series?.map((series: any, index: any) => (*/}
          {/*      <MarketplaceCard*/}
          {/*        key={`@@profile/series:${index}`}*/}
          {/*        cardType="createdAsset"*/}
          {/*        coverInfo={series?.cover}*/}
          {/*        cardData={series?.seriesData}*/}
          {/*        handleViewCreatedAsset={() => {*/}
          {/*          router.push(`/assets/series/${get(series, '_id')}`);*/}
          {/*        }}*/}
          {/*      />*/}
          {/*    ))}*/}
          {/*  </Gallery>*/}

          {/*  <LoadMore>*/}
          {/*    {showLoad?.series ? (*/}
          {/*      <LoadMoreButton*/}
          {/*        data-testid="load-more"*/}
          {/*        shape="round"*/}
          {/*        onClick={(_) => onLoadMore({ type: 'SHOW_MORE_SERIES' })}*/}
          {/*      >*/}
          {/*        <span>Load more</span>{' '}*/}
          {/*        {loadingSeries ? <i className="mc-loading-line mc-lg" /> : ''}*/}
          {/*      </LoadMoreButton>*/}
          {/*    ) : (*/}
          {/*      ''*/}
          {/*    )}*/}
          {/*  </LoadMore>*/}
          {/*</TabPane>*/}
        </Tab>
      </TabWrapper>
    </TabRow>
  );
};
