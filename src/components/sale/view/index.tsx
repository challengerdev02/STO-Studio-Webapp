import {
  Button,
  Collapse,
  Empty,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { get, inRange, isEmpty, toLower, truncate } from 'lodash';
// import {
//   MoreOutlined,
//   ReloadOutlined,
//   ShareAltOutlined,
// } from '@ant-design/icons';
import Link from 'next/link';
import { BookNamespace } from '@/shared/namespaces/book';
import { BookFlippingPreview } from '@/components';
import React, { Fragment } from 'react';
import {
  Container,
  OutterContainer,
} from '@/components/assets/view/index.styled';
import { SaleNamespace } from '@/shared/namespaces/sale';
import { SaleCard } from '@/components/sale/view/sale-card';
import { UserNamespace } from '@/shared/namespaces/user';
import { AssetViewCoverImage } from '@/components/assets/view/cover-image';
import { AssetViewMetadata } from '@/components/assets/view/metadata';
import {
  biddingColumn,
  enumerateUser,
  evaluatePriceHistory,
  ownersColumn,
  priceHistoryColumn,
  tokenActivityColumns,
} from '@/components/sale/view/columns';
import { PRICE_HISTORY_OPTIONS } from '@/shared/constants';

const { Panel } = Collapse;
const { Title } = Typography;

export interface ViewSaleAssetProps extends SaleNamespace.SaleAsset {
  onPreviewBook: (visibility: boolean) => void;
  onToggleBidUI: (visibility: boolean) => void;
  onToggleOfferUI: (visibility: boolean) => void;
  onPaginateBids: (page: number, pageSize: number) => void;
  previewVisibility: boolean;
  bids: SaleNamespace.Bid[];
  gettingAllBids?: boolean;
  deployingBook?: boolean;
  likingAsset?: boolean;
  queryingContract?: boolean;
  bidsPagination?: Record<string, any>;
  onBuyNow: () => void;
  onLikeAsset: () => void;
  onDeployBook: () => void;
  onBuyAuction: () => void;
  onPaginateTokenOwners: (page: number, pageSize: number) => void;
  tokenOwners: SaleNamespace.OwnedAssetMetadata[];
  gettingTokenOwners?: boolean;
  ownerOf?: string;
  ownerOfUserAccount?: UserNamespace.User;
  walletAddress: string;
  tokenActivity: SaleNamespace.TokenActivity[];
  gettingTokenActivity?: boolean;
  latestBid: SaleNamespace.Bid;
  onCountDownFinished: () => void;
  maxSupply?: number;
  soldCount?: number;
  edition?: number;
  creatorAccount: any;
  isDeployed?: boolean;
  priceHistory?: SaleNamespace.TokenPriceHistory[];
  gettingTokenPriceHistory?: boolean;
  onGetTokenActivity: (page: number, perPage: number) => void;
}

export const ViewSaleAsset = (props: ViewSaleAssetProps) => {
  const {
    onPreviewBook,
    previewVisibility,
    onToggleBidUI,
    onPaginateBids,
    onToggleOfferUI,
    onBuyNow,
    onBuyAuction,
    onGetTokenActivity,
    onLikeAsset,
    onDeployBook,
    asset,
    bids,
    blockChain,
    gettingAllBids,
    deployingBook,
    bidsPagination,
    queryingContract,
    tokenOwners,
    priceHistory,
    gettingTokenOwners,
    onPaginateTokenOwners,
    ownerOf,
    gettingTokenPriceHistory,
    ownerOfUserAccount,
    seller,
    walletAddress,
    edition,
    gettingTokenActivity,
    tokenActivity,
    latestBid,
    likingAsset,
    onCountDownFinished,
    maxSupply,
    soldCount,
    tokenId,
    creatorAccount,
    isDeployed,
  } = props;
  //console.log(tokenOwners);
  const assetUser =
    ownerOf && !isEmpty(ownerOfUserAccount)
      ? (Object.assign({}, ownerOfUserAccount, {
          walletAddress: ownerOf,
        }) as UserNamespace.User)
      : (get(asset, 'user', {}) as UserNamespace.User);

  const isPurchasable =
    inRange(
      Date.now(),
      new Date(props.startDate).getTime(),
      new Date(props.endDate).getTime()
    ) &&
    (ownerOf ? toLower(ownerOf) === toLower(seller) : true) &&
    toLower(seller) !== toLower(walletAddress);
  const canMakeOffer = ownerOf
    ? toLower(ownerOf) !== walletAddress
    : toLower(seller) !== toLower(walletAddress);

  const user = enumerateUser(assetUser);
  const creator = enumerateUser(creatorAccount);

  return (
    <>
      <OutterContainer>
        <Container>
          <div className="image-container meta-flex meta-flex-col ">
            <AssetViewCoverImage
              likes={get(asset, 'likes', 0)}
              liked={get(asset, 'liked', false)}
              coverImage={
                get(asset, 'thumbnail', null) ?? get(asset, 'coverImage', '')
              }
              blockchain={blockChain}
              onLike={onLikeAsset}
              likingAsset={likingAsset}
              disableLiking={!walletAddress}
              startDateTimestamp={props?.startDateTimestamp}
              edition={edition}
              published={true} // for sales
              hidePublishedBadge={asset.walletAddress != walletAddress}
            />

            <AssetViewMetadata
              ageRating={get(asset, 'ageRating', '0')}
              attributes={get(asset, 'attributes', [])}
              description={get(asset, 'description', '')}
              GENRE_OPTIONS={get(asset, 'genres', [])}
              infoLink={get(asset, 'infoLink', '')}
              user={creator}
              maxSupply={maxSupply}
              isOwned={!!ownerOf}
            />
          </div>

          <Space size={10} className={'w-100 book-details-main-container'}>
            {asset?.series && (
              <div>
                Series:{' '}
                <Link href={`/assets/series/${asset?.series?._id}`}>
                  <a>
                    <strong>{asset?.series?.title}</strong>
                  </a>
                </Link>{' '}
              </div>
            )}
            <div className="meta-flex meta-flex-s-b">
              <Title level={1} className="info-title">
                {get(asset, 'title')}{' '}
                {props.tokenId !== '0' ? `#${props.tokenId}` : ''}
              </Title>
            </div>

            <Space size={20} className={'w-100'} direction={'vertical'}>
              <div className="meta-flex meta-flex-s-b meta-align-center">
                <Title level={5} style={{ color: 'var(--heading-color)' }}>
                  {/*{ownerOf ? 'Seller' : 'Created'}{' '}*/}
                  Seller{' '}
                  <Link href={user.link}>
                    {truncate(user.name, { length: 25 })}
                  </Link>
                </Title>

                <Space size={5}>
                  {/*<Tooltip title={'Reload metadata'}>*/}
                  {/*  <Button*/}
                  {/*    icon={<ReloadOutlined />}*/}
                  {/*    type={'text'}*/}
                  {/*    size={'middle'}*/}
                  {/*    shape={'circle'}*/}
                  {/*  />*/}
                  {/*</Tooltip>*/}
                  {/*<Tooltip title={'Share'}>*/}
                  {/*  <Button*/}
                  {/*    icon={<ShareAltOutlined />}*/}
                  {/*    type={'text'}*/}
                  {/*    size={'middle'}*/}
                  {/*    shape={'circle'}*/}
                  {/*  />*/}
                  {/*</Tooltip>*/}
                  {/*<Tooltip title={'More'}>*/}
                  {/*  <Button*/}
                  {/*    icon={<MoreOutlined />}*/}
                  {/*    type={'text'}*/}
                  {/*    size={'middle'}*/}
                  {/*    shape={'circle'}*/}
                  {/*  />*/}
                  {/*</Tooltip>*/}
                </Space>
              </div>
              {!isDeployed &&
                toLower(seller) === toLower(walletAddress) &&
                tokenId == '0' && (
                  <Tooltip
                    title={
                      'Deploy to reduce cost of minting for the first buyer'
                    }
                  >
                    <Button
                      type={'primary'}
                      shape={'round'}
                      loading={deployingBook}
                      onClick={onDeployBook}
                    >
                      Deploy Book Contract
                    </Button>
                  </Tooltip>
                )}

              {get(asset, 'published') && (
                <div
                  className={'meta-flex meta-align-center'}
                  style={{ gap: 20 }}
                >
                  <Button
                    type={'default'}
                    shape={'round'}
                    onClick={() => onPreviewBook(true)}
                  >
                    Read Episode
                  </Button>

                  <Button
                    type={'default'}
                    shape={'round'}
                    href={
                      'https://metacomic.tawk.help/article/delete-my-account'
                    }
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    Report
                  </Button>
                </div>
              )}
              {/*{(walletAddress.toLowerCase() == seller.toLowerCase()) && (*/}
              {/*  <Button*/}
              {/*    style={{border: '1px solid red'}}*/}
              {/*    shape={'round'}*/}
              {/*    onClick={() => onPreviewBook(true)}*/}
              {/*  >*/}
              {/*    End NFT Sale*/}
              {/*  </Button>*/}
              {/*)}*/}

              <div
                style={{ paddingBottom: 20 }}
                className="image-container-mobile meta-flex meta-flex-center meta-flex-j-c meta-flex-col"
              >
                <AssetViewCoverImage
                  likes={get(asset, 'likes', 0)}
                  liked={get(asset, 'liked', false)}
                  coverImage={
                    get(asset, 'thumbnail', null) ??
                    get(asset, 'coverImage', '')
                  }
                  blockchain={blockChain}
                  onLike={onLikeAsset}
                  likingAsset={likingAsset}
                  disableLiking={!walletAddress}
                  startDateTimestamp={props?.startDateTimestamp}
                  edition={edition}
                  published={true} // for salesr sales
                  hidePublishedBadge={asset.walletAddress != walletAddress}
                />
                <AssetViewMetadata
                  ageRating={get(asset, 'ageRating', '0')}
                  attributes={get(asset, 'attributes', [])}
                  description={get(asset, 'description', '')}
                  GENRE_OPTIONS={get(asset, 'genres', [])}
                  infoLink={get(asset, 'infoLink', '')}
                  user={creator}
                  maxSupply={maxSupply}
                />
              </div>

              <Fragment>
                <SaleCard
                  onCountdownFinished={onCountDownFinished}
                  startDate={props.startDate}
                  walletAddress={toLower(walletAddress)}
                  seller={toLower(seller)}
                  endDate={props.endDate}
                  onBuyNow={() => onBuyNow()}
                  onBuyAuction={() => onBuyAuction()}
                  onMakeBid={() => onToggleBidUI(true)}
                  onMakeOffer={() => onToggleOfferUI(true)}
                  price={latestBid.amount ?? props.price}
                  blockchain={blockChain}
                  saleType={props.saleType}
                  queryingContract={queryingContract}
                  isPurchasable={isPurchasable}
                  canMakeOffer={canMakeOffer}
                  latestBid={latestBid}
                  maxSupply={maxSupply}
                  soldCount={soldCount}
                />
              </Fragment>

              {props.saleType === 'Auction' && (
                <Collapse
                  defaultActiveKey={['1', '2', '3']}
                  expandIconPosition={'right'}
                >
                  <Panel header={<Title level={4}>Offers</Title>} key="1">
                    {isEmpty(bids) && (
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

                    {!isEmpty(bids) && (
                      <Table
                        columns={biddingColumn}
                        dataSource={bids}
                        loading={gettingAllBids}
                        pagination={{
                          onChange: onPaginateBids,
                          size: 'small',
                          pageSize: 5,
                          total: get(bidsPagination, 'totalCount', 0),
                          current: get(bidsPagination, 'current', 1),
                        }}
                      />
                    )}
                  </Panel>
                </Collapse>
              )}
              {props.saleType !== 'Auction' && (
                <Collapse
                  defaultActiveKey={['1', '2', '3']}
                  expandIconPosition={'right'}
                >
                  <Panel header={<Title level={4}>Owners</Title>} key="1">
                    {isEmpty(tokenOwners) && (
                      <Space
                        size={20}
                        style={{ width: '100%', justifyContent: 'center' }}
                        align={'center'}
                      >
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={'No owners yet'}
                        />
                      </Space>
                    )}

                    {!isEmpty(tokenOwners) && (
                      <Table
                        columns={ownersColumn}
                        dataSource={tokenOwners}
                        loading={gettingTokenOwners}
                        pagination={{
                          onChange: onPaginateTokenOwners,
                          size: 'small',
                          pageSize: 5,
                          total: get(bidsPagination, 'totalCount', 0),
                          current: get(bidsPagination, 'current', 1),
                        }}
                      />
                    )}
                  </Panel>
                </Collapse>
              )}
              {!!ownerOf && (
                <Collapse
                  defaultActiveKey={['1', '2', '3']}
                  expandIconPosition={'right'}
                >
                  <Panel
                    header={<Title level={4}>Price History</Title>}
                    key="3"
                  >
                    <Space direction={'vertical'} size={10} className={'w-100'}>
                      <Select
                        placeholder="Select a duration"
                        optionFilterProp="children"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        options={PRICE_HISTORY_OPTIONS}
                        style={{ width: '100%' }}
                      />
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
              )}
            </Space>
          </Space>
        </Container>
        {!!ownerOf && (
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
        )}
      </OutterContainer>
      <BookFlippingPreview
        visibility={previewVisibility}
        onClose={onPreviewBook}
        {...(asset as unknown as BookNamespace.Book)}
        user={Object.assign({}, asset.user, { username: user })}
      />
    </>
  );
};
