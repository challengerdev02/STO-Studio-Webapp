import { Button, Collapse, Empty, Space, Table, Typography } from 'antd';
import { get, isEmpty, truncate } from 'lodash';
// import {
//   MoreOutlined,
//   ReloadOutlined,
//   ShareAltOutlined,
// } from '@ant-design/icons';
import Link from 'next/link';
// import { PRICE_HISTORY_OPTIONS } from '@/shared/constants';
import { BookFlippingPreview } from '@/components';
import React, { Fragment } from 'react';
import {
  Container,
  OutterContainer,
} from '@/components/assets/view/index.styled';
import { UserNamespace } from '@/shared/namespaces/user';
import { AssetViewCoverImage } from '@/components/assets/view/cover-image';
import { AssetViewMetadata } from '@/components/assets/view/metadata';
import {
  enumerateUser,
  evaluatePriceHistory,
  offersColumn,
  priceHistoryColumn,
  tokenActivityColumns,
} from '@/components/sale/view/columns';
import { TokenSaleCard } from '@/components/collections/token/token-card';
import { SaleNamespace } from '@/shared/namespaces/sale';
import { isMobile } from 'react-device-detect';
import { parseIpfsUrl } from '@/shared/utils';

const { Panel } = Collapse;
const { Title } = Typography;

export interface TokenAssetProps {
  onPreviewBook: (visibility: boolean) => void;
  onToggleOfferUI: (visibility: boolean) => void;
  onCreateSale: () => void;
  previewVisibility: boolean;
  queryingContract?: boolean;
  asset: Record<string, any>;
  tokenId: string;
  gettingTokenActivity?: boolean;
  tokenActivity?: SaleNamespace.TokenActivity[];
  gettingTokenPriceHistory?: boolean;
  priceHistory?: SaleNamespace.TokenPriceHistory[];
  onGetTokenActivity: (page: number, perPage: number) => void;
  gettingAllOffers?: boolean;
  offers: SaleNamespace.Offers[];
  offersPagination: any;
  onPaginateOffers: (page: number, perPage: number) => void;
  onAcceptOffer: (values: Record<string, any>) => void;
  uiLoaders: Record<string, any>;
  onFeeVisibilityChange: (v: boolean) => void;
}

export const TokenAsset = (props: TokenAssetProps) => {
  const {
    onPreviewBook,
    previewVisibility,
    onToggleOfferUI,
    onCreateSale,
    asset,
    queryingContract,
    // tokenId,
    tokenActivity,
    gettingTokenActivity,
    priceHistory,
    gettingTokenPriceHistory,
    onGetTokenActivity,
    gettingAllOffers,
    offers,
    offersPagination,
    onPaginateOffers,
    onAcceptOffer,
    uiLoaders,
    onFeeVisibilityChange,
  } = props;

  const assetUser = get(asset, 'user', {}) as UserNamespace.User;
  const creatorUser = get(asset, 'creator', {}) as UserNamespace.User;
  const currentUserIsOwner = get(asset, 'isOwner', false);

  const user = enumerateUser(assetUser);
  const creator = enumerateUser(creatorUser);
  const assetImage = parseIpfsUrl(asset.thumbnail ?? asset.coverImage);
  return (
    <>
      <OutterContainer>
        <Container>
          <div className="image-container meta-flex meta-flex-col ">
            <AssetViewCoverImage
              likes={asset.likes}
              coverImage={assetImage}
              blockchain={get(asset, 'blockChain', '97')}
              hidePublishedBadge={true}
              hideLikes={true}
            />
            <AssetViewMetadata
              ageRating={asset.ageRating}
              attributes={asset.attributes}
              description={asset.description}
              GENRE_OPTIONS={asset.genres}
              infoLink={asset.infoLink}
              maxSupply={1}
              isOwned={asset.isOwner}
              user={creator}
            />
          </div>

          <Space size={10} className={'w-100 book-details-main-container'}>
            <div className="meta-flex meta-flex-s-b">
              <Title level={1} className="info-title">
                {asset.title}
              </Title>
            </div>

            <Space size={20} className={'w-100'} direction={'vertical'}>
              <div className="meta-flex meta-flex-s-b meta-align-center">
                <Title level={5} style={{ color: 'var(--heading-color)' }}>
                  Owned by{' '}
                  <Link href={user.link}>
                    {truncate(user.name, { length: 25 })}
                  </Link>
                </Title>

                {/*<Space size={5}>*/}
                {/*  <Tooltip title={'Reload metadata'}>*/}
                {/*    <Button*/}
                {/*      icon={<ReloadOutlined />}*/}
                {/*      type={'text'}*/}
                {/*      size={'middle'}*/}
                {/*      shape={'circle'}*/}
                {/*    />*/}
                {/*  </Tooltip>*/}
                {/*  <Tooltip title={'Share'}>*/}
                {/*    <Button*/}
                {/*      icon={<ShareAltOutlined />}*/}
                {/*      type={'text'}*/}
                {/*      size={'middle'}*/}
                {/*      shape={'circle'}*/}
                {/*    />*/}
                {/*  </Tooltip>*/}
                {/*  <Tooltip title={'More'}>*/}
                {/*    <Button*/}
                {/*      icon={<MoreOutlined />}*/}
                {/*      type={'text'}*/}
                {/*      size={'middle'}*/}
                {/*      shape={'circle'}*/}
                {/*    />*/}
                {/*  </Tooltip>*/}
                {/*</Space>*/}
              </div>

              <div
                style={{ paddingBottom: 20 }}
                className="image-container-mobile meta-flex meta-flex-center meta-flex-j-c meta-flex-col"
              >
                <AssetViewCoverImage
                  likes={asset.likes}
                  coverImage={asset.thumbnail ?? asset.coverImage}
                  blockchain={get(asset, 'blockChain', '97')}
                  hidePublishedBadge={true}
                  hideLikes={true}
                />
                <AssetViewMetadata
                  ageRating={asset.ageRating}
                  attributes={asset.attributes}
                  description={asset.description}
                  GENRE_OPTIONS={asset.genres}
                  infoLink={asset.infoLink}
                  user={creator}
                  maxSupply={1}
                />
              </div>

              <Fragment>
                {asset?.isOwner && (
                  <>
                    <Button
                      onClick={() => onFeeVisibilityChange(true)}
                      style={{ width: 200 }}
                      type={'primary'}
                      shape={'round'}
                      block={isMobile}
                      loading={queryingContract}
                    >
                      Import to Ordinals
                    </Button>
                  </>
                )}
                {!asset?.isOwner && (
                  <Button
                    block={isMobile}
                    onClick={() => onToggleOfferUI(true)}
                    style={!isMobile ? { width: 200 } : {}}
                    shape={'round'}
                  >
                    Make offer
                  </Button>
                )}
                <TokenSaleCard
                  onCreateSale={onCreateSale}
                  onPreviewBook={() => onPreviewBook(!previewVisibility)}
                  onMakeOffer={() => onToggleOfferUI(true)}
                  price={asset.price}
                  currency={process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL}
                  queryingContract={queryingContract}
                  isOwner={asset?.isOwner}
                  assetType={asset?.type}
                />
              </Fragment>

              <Collapse
                defaultActiveKey={['1', '2']}
                expandIconPosition={'right'}
              >
                <Panel header={<Title level={4}>Offers</Title>} key="1">
                  {isEmpty(offers) && (
                    <Space
                      size={20}
                      style={{ width: '100%', justifyContent: 'center' }}
                      align={'center'}
                    >
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={'No offers yet'}
                      />
                    </Space>
                  )}

                  {!isEmpty(offers) && (
                    <Table
                      columns={offersColumn({
                        onAcceptOffer,
                        isOwner: currentUserIsOwner,
                        uiLoaders: uiLoaders,
                      })}
                      dataSource={offers}
                      loading={gettingAllOffers}
                      pagination={{
                        onChange: onPaginateOffers,
                        size: 'small',
                        pageSize: 5,
                        total: get(offersPagination, 'totalCount', 0),
                        current: get(offersPagination, 'current', 1),
                      }}
                    />
                  )}
                </Panel>
              </Collapse>

              <Collapse defaultActiveKey={['1']} expandIconPosition={'right'}>
                <Panel header={<Title level={4}>Price History</Title>} key="1">
                  <Space direction={'vertical'} size={10} className={'w-100'}>
                    {/*<Select*/}
                    {/*  placeholder="Select a duration"*/}
                    {/*  optionFilterProp="children"*/}
                    {/*  // onChange={onChange}*/}
                    {/*  // onSearch={onSearch}*/}
                    {/*  options={PRICE_HISTORY_OPTIONS}*/}
                    {/*  style={{ width: '100%' }}*/}
                    {/*/>*/}
                    {isEmpty(get(priceHistory, 'purchases')) && (
                      <Space
                        size={20}
                        style={{ width: '100%', justifyContent: 'center' }}
                        align={'center'}
                      >
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={'No item activity yet'}
                        />
                      </Space>
                    )}

                    {!isEmpty(get(priceHistory, 'purchases')) && (
                      <Table
                        columns={priceHistoryColumn}
                        dataSource={evaluatePriceHistory(
                          get(priceHistory, 'purchases')
                        )}
                        loading={gettingTokenPriceHistory}
                        pagination={{
                          onChange: onGetTokenActivity,
                          size: 'small',
                          pageSize: 5,
                          total: get(priceHistory, 'total'),
                          current: get(priceHistory, 'current', 1),
                        }}
                      />
                    )}
                  </Space>
                </Panel>
              </Collapse>
            </Space>
          </Space>
        </Container>
        <Collapse defaultActiveKey={['1']} expandIconPosition={'right'}>
          <Panel header={<Title level={4}>Item Activity</Title>} key="1">
            <Space direction={'vertical'} size={10} className={'w-100'}>
              {/*<Select*/}
              {/*  placeholder="Filter"*/}
              {/*  optionFilterProp="children"*/}
              {/*  // onChange={onChange}*/}
              {/*  // onSearch={onSearch}*/}
              {/*  options={PRICE_HISTORY_OPTIONS}*/}
              {/*  style={{ width: '100%' }}*/}
              {/*/>*/}
              {isEmpty(tokenActivity) && (
                <Space
                  size={20}
                  style={{ width: '100%', justifyContent: 'center' }}
                  align={'center'}
                >
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={'No item activity yet'}
                  />
                </Space>
              )}

              {!isEmpty(tokenActivity) && (
                <Table
                  columns={tokenActivityColumns}
                  dataSource={tokenActivity}
                  loading={gettingTokenActivity}
                />
              )}
            </Space>
          </Panel>
        </Collapse>
      </OutterContainer>
      <BookFlippingPreview
        visibility={previewVisibility}
        title={asset?.title}
        ageRating={asset?.ageRating}
        onClose={() => undefined}
        description={asset?.description}
        explicitContent={asset?.explicitContent}
        scenes={asset?.pages}
        coverImage={asset?.pages?.[0] ?? asset?.coverImage}
        series={asset?.series}
        episodeIndex={0}
        onNextEpisodePreview={() => undefined}
        onPrevEpisodePreview={() => undefined}
        episodes={[]}
        issueNumber={asset?.issueNumber}
        user={Object.assign({}, asset?.user, { username: user })}
      />
    </>
  );
};
