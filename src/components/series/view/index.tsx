import {
  MainWrapper,
  Wrapper,
  SeriesViewWrapper,
  BannerWrapper,
} from '@/components/book/create-book/index.styled';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Empty,
  Image,
  List,
  Pagination,
  Row,
  Space,
  Tooltip,
  Typography,
  Spin
} from 'antd';
import {
  UserName,
} from '@/components/account/profile/index.styled';
import { truncateEthAddress } from '@/shared/utils';
import {
  CalendarFilled,
  EditFilled,
  EyeFilled,
  HeartOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { ShareProfile } from '@/components/account/profile/share-profile';
import format from 'date-fns/format';
import { SeriesNamespace } from '@/shared/namespaces/series';
import { clamp, get, toLower } from 'lodash';
import {
  BookFlippingPreview,
  MainLoader,
} from '@/components';
import { isMobile, isTablet } from 'react-device-detect';
import Link from 'next/link';
import { BookNamespace } from '@/shared/namespaces/book';
import { UserNamespace } from '@/shared/namespaces/user';
import { enumerateUser } from '@/components/sale/view/columns';
import Meta from 'antd/lib/card/Meta';

interface ViewSeriesProps {
  loading: boolean;
  subscribing: boolean;
  signedWalletAddress?: string;
  seriesDetails: SeriesNamespace.SeriesData;
  onTipOwner: () => void;
  onSubscribe: (value?: boolean) => void;
  onRevise: (value?: boolean) => void;
  getNextPage: (page: any) => void;
  onFeeVisibilityChange: (v: boolean) => void;
  loadOrdinalData: () => void;
  loadingOrdinalData: boolean;
  ordinalData: any;
}
export const ViewSeries = (props: ViewSeriesProps) => {
  const {
    seriesDetails,
    signedWalletAddress,
    loading,
    subscribing,
    onTipOwner,
    onSubscribe,
    onRevise,
    getNextPage,
    onFeeVisibilityChange,
    ordinalData,
    loadingOrdinalData,
  } = props;

  const episodeData = get(seriesDetails, 'episodeData');
  const [selectedAsset, setSelectedAsset] = useState<
    BookNamespace.Book | undefined
  >(get(episodeData, 'episodes.0.asset'));
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number>(0);
  const [previewVisibility, setPreviewVisibility] = useState<boolean>(false);

  const onPreviewBook = (visibility: boolean) => {
    setPreviewVisibility(visibility);
  };

  const onNextEpisodePreview = () => {
    const episodes = get(episodeData, 'episodes', []);
    setSelectedEpisodeIndex((prevState) => {
      const index = clamp(prevState + 1, 0, episodes.length);
      setSelectedAsset(get(episodes[index], 'asset'));

      return index;
    });
  };

  const onPrevEpisodePreview = () => {
    const episodes = get(episodeData, 'episodes', []);
    setSelectedEpisodeIndex((prevState) => {
      const index = clamp(prevState - 1, 0, episodes.length);
      setSelectedAsset(get(episodes[index], 'asset'));

      return index;
    });
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const [isListView, setIsListView] = useState<boolean>(true);

  const toggleView = () => {
    setIsListView(!isListView);
  };

  const ListView = () => (
    <List
      className={'episode'}
      itemLayout="vertical"
      size="large"
      // header={<Typography.Title level={4}>Episodes</Typography.Title>}
      pagination={{
        onChange: (page: any) => {
          getNextPage(page);
        },
        total: episodeData?.meta?.total ?? 0,
        current: episodeData?.meta?.currentPage ?? 0,
        pageSize: episodeData?.meta?.perPage ?? 0,
        size: 'small',
        simple: true,
      }}
      dataSource={episodeData?.episodes ?? []}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={'No episode published'}
          />
        ),
      }}
      renderItem={(item, index) => (
        <List.Item
          style={{
            backgroundColor:
              selectedEpisodeIndex == index ? '#151515' : undefined,
          }}
          key={item.assetAddress}
          actions={[
            item.asset.issueNumber ? (
              <IconText
                icon={NumberOutlined}
                text={new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(item.asset.issueNumber)}
                key="list-vertical-message"
              />
            ) : null,
            <IconText
              icon={CalendarFilled}
              text={format(
                new Date(item.createdAt ?? Date.now()),
                'MMM dd, yyyy'
              )}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={HeartOutlined}
              text={new Intl.NumberFormat('en-US', {
                notation: 'compact',
                compactDisplay: 'short',
              }).format(item.asset.likes)}
              key="list-vertical-like-o"
            />,
            // <IconText
            //   icon={EyeFilled}
            //   text={new Intl.NumberFormat('en-US', {
            //     notation: 'compact',
            //     compactDisplay: 'short',
            //   }).format(Math.floor(Math.random() * 3e4))}
            //   key="list-vertical-message"
            // />,

            <Button
              key="list-vertical-read-o"
              icon={<EyeFilled />}
              onClick={() => {
                setSelectedAsset(item.asset);
                onPreviewBook(true);
                setSelectedEpisodeIndex(index);
              }}
              size={'small'}
              // type={'text'}
              shape={'round'}
            >
              View NFT
            </Button>,
          ]}
          extra={
            <Link href={`/assets/${item.asset?._id}`}>
              <a>
                <img
                  style={{ border: '1px solid #2c2c2c' }}
                  width={150}
                  alt="logo"
                  className={'book-cover-image'}
                  src={item.asset?.thumbnail ?? item.asset?.coverImage}
                />
              </a>
            </Link>
          }
        >
          <List.Item.Meta
            title={
              <Link href={`/assets/${item.asset._id}`}>
                <a>
                  <span style={{ fontWeight: 'bolder' }}>
                    {item.asset.title}
                  </span>
                </a>
              </Link>
            }
          />
          <span style={{ color: 'white' }}> {item.asset.description}</span>
        </List.Item>
      )}
    />
  );

  const GridView = () => {
    return (
      <div className="grid-view">
        <Row gutter={[16, 16]}>
          {episodeData?.episodes?.map((item, index) => (
            <Col key={item.assetAddress} xs={24} sm={12} md={8} lg={6}>
              <Card
                className={selectedEpisodeIndex === index ? 'selected' : ''}
                hoverable
                cover={
                  <Link href={`/assets/${item.asset?._id}`}>
                    <a>
                      <img
                        alt="cover"
                        src={item.asset?.thumbnail ?? item.asset?.coverImage}
                        style={{
                          width: '100%',
                          maxHeight: '200px',
                          objectFit: 'cover',
                        }}
                      />
                    </a>
                  </Link>
                }
              >
                <Meta
                  title={
                    <Link href={`/assets/${item.asset._id}`}>
                      <a>
                        <span
                          style={{ fontWeight: 'bolder', color: '#ffffff' }}
                        >
                          {item.asset.title}
                        </span>
                      </a>
                    </Link>
                  }
                  description={
                    <span style={{ color: '#ffffff' }}>
                      {item.asset.description}
                    </span>
                  }
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '1rem 0',
                  }}
                >
                  <IconText
                    icon={CalendarFilled}
                    text={format(
                      new Date(item.createdAt ?? Date.now()),
                      'MMM dd, yyyy'
                    )}
                    key="list-vertical-star-o"
                  />
                  <IconText
                    icon={HeartOutlined}
                    text={new Intl.NumberFormat('en-US', {
                      notation: 'compact',
                      compactDisplay: 'short',
                    }).format((item.asset.likes))}
                    key="list-vertical-like-o"
                  />
                </div>
                <Button
                  key="list-vertical-read-o"
                  icon={<EyeFilled />}
                  onClick={() => {
                    setSelectedAsset(item.asset);
                    onPreviewBook(true);
                    setSelectedEpisodeIndex(index);
                  }}
                  size={'small'}
                  // type={'text'}
                  shape={'round'}
                >
                  View NFT
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          onChange={(page: any) => {
            getNextPage(page);
          }}
          total={episodeData?.meta?.total ?? 0}
          current={episodeData?.meta?.currentPage ?? 0}
          pageSize={episodeData?.meta?.perPage ?? 0}
          size="small"
          simple
          style={{ marginTop: '16px' }}
        />
      </div>
    );
  };

  return (
    <>
      <MainWrapper
        data-testid="series-view-wrapper"
        style={{
          width: '100%',
          paddingTop: 0,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {loading && (
          <Wrapper>
            {' '}
            <Space
              size={10}
              style={{ width: '100%', justifyContent: 'center' }}
              align={'center'}
            >
              <MainLoader height={50} width={50} />
            </Space>
          </Wrapper>
        )}
        {!loading && (
          <BannerWrapper>
            <img
              src={seriesDetails?.banner}
              className="banner-image"
              // layout="fill"
              // height={'100%'}
              // width={'100%'}
              height={600 / 2}
              style={{ objectFit: 'cover' }}
              // layout={'intrinsic'}
              alt="banner image"
            />
          </BannerWrapper>
        )}
        {/*<div>*/}
        {!loading && (
          <SeriesViewWrapper
            style={{ zIndex: 10, position: 'relative', width: '80%' }}
          >
            <Space
              direction={'vertical'}
              size={50}
              align={isMobile ? 'center' : undefined}
            >
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
              >
                <Space
                  size={20}
                  className="meta-flex w-100"
                  align={isMobile ? 'center' : 'start'}
                  style={{ justifyContent: isMobile ? 'center' : 'start' }}
                  wrap={isMobile || isTablet}
                >
                  <div
                    style={{
                      width: isMobile ? '100%' : 250,
                      height: isMobile ? '100%' : undefined,
                    }}
                  >
                    <Image
                      width={250}
                      height={250}
                      // width={'100%'}
                      className={'book-cover-image'}
                      preview={false}
                      src={seriesDetails.image}
                      fallback={
                        'https://avatarfiles.alphacoders.com/984/thumb-98474.gif'
                      }
                      placeholder={true}
                      alt=""
                    />
                  </div>

                  <Space
                    direction={'vertical'}
                    size={28}
                    className={'meta-flex meta-flex-col meta-flex-s-b'}
                  >
                    <Space
                      size={20}
                      direction={'vertical'}
                      className="meta-flex meta-flex-col w-100"
                      align={isMobile ? 'center' : 'start'}
                      style={{
                        marginTop: '20px',
                        justifyContent: isMobile ? 'center' : 'start',
                      }}
                    >
                      {/*<Space className={'meta-flex meta-flex-s-b'} wrap>*/}
                      <div>
                        <UserName data-testid="username">
                          {seriesDetails.title}
                        </UserName>
                      </div>
                      {/*</Space>*/}
                      <Tooltip title={'View account'} placement={'bottomLeft'}>
                        By{' '}
                        <Link
                          href={`/${seriesDetails?.user?.username ??
                            seriesDetails?.walletAddress
                            }`}
                        >
                          <a>
                            {seriesDetails?.user?.username ??
                              truncateEthAddress(
                                `${seriesDetails.walletAddress}`
                              )}
                          </a>
                        </Link>
                      </Tooltip>

                      <Typography.Paragraph
                        ellipsis={{
                          rows: 4,
                          suffix: '...',
                          expandable: true,
                        }}
                      >
                        {seriesDetails.description}
                      </Typography.Paragraph>
                    </Space>
                    <Space
                      size={20}
                      align={isMobile ? 'center' : 'start'}
                      className={'w-100 '}
                      style={{
                        marginLeft: '5px',
                        justifyContent: isMobile ? 'center' : 'start',
                      }}
                    >
                      <Tooltip
                        title={`${new Intl.NumberFormat().format(
                          seriesDetails.views ?? 0
                        )} Views`}
                      >
                        <Text strong style={{ color: 'var(--heading-color)' }}>
                          {new Intl.NumberFormat('en-US', {
                            notation: 'compact',
                            compactDisplay: 'short',
                          }).format(seriesDetails.views ?? 0)}{' '}
                          Views
                        </Text>
                      </Tooltip>
                      <Tooltip
                        title={`${new Intl.NumberFormat().format(
                          seriesDetails.subscribers
                        )} Subscribers`}
                      >
                        <Text strong style={{ color: 'var(--heading-color)' }}>
                          {new Intl.NumberFormat('en-US', {
                            notation: 'compact',
                            compactDisplay: 'short',
                          }).format(seriesDetails.subscribers ?? 0)}{' '}
                          Subscribers
                        </Text>
                      </Tooltip>
                      <Tooltip
                        title={`${new Intl.NumberFormat().format(
                          seriesDetails.likes
                        )} Likes`}
                      >
                        <Text strong style={{ color: 'var(--heading-color)' }}>
                          {new Intl.NumberFormat('en-US', {}).format(
                            seriesDetails.likes ?? 0
                          )}{' '}
                          Likes
                        </Text>
                      </Tooltip>
                    </Space>
                    <Space size={20}>
                      {signedWalletAddress !== null && (
                        <Tooltip
                          placement={'bottom'}
                          title="Get notified of new episodes"
                        >
                          <Button
                            type="primary"
                            shape="round"
                            onClick={() => onSubscribe(!seriesDetails.subscribed)}
                            size={'small'}
                            data-testid="series-widget"
                            loading={subscribing}
                            disabled={
                              toLower(signedWalletAddress) ==
                              toLower(seriesDetails.walletAddress)
                            }
                          >
                            {seriesDetails.subscribed
                              ? 'Unsubscribe'
                              : 'Subscribe'}
                          </Button>
                        </Tooltip>
                      )}
                      {signedWalletAddress !== null && (
                        <Tooltip
                          placement={'bottom'}
                          title="Give a tip to support this work"
                        >
                          <Button
                            type="default"
                            shape="round"
                            onClick={onTipOwner}
                            size={'small'}
                            data-testid="series-widget"
                            disabled={
                              toLower(signedWalletAddress) ==
                              toLower(seriesDetails.walletAddress)
                            }
                          >
                            Tip
                          </Button>
                        </Tooltip>
                      )}
                      {signedWalletAddress !== null &&
                        toLower(signedWalletAddress) ==
                        toLower(seriesDetails.walletAddress) && (
                          <Tooltip placement={'bottom'} title="Edit Series">
                            <Button
                              type="default"
                              shape="circle"
                              // href={`/assets/series/${seriesDetails._id}/revise`}
                              icon={<EditFilled />}
                              size={'small'}
                              data-testid="series-widget"
                              onClick={() => onRevise(true)}
                            />
                          </Tooltip>
                        )}
                      <Tooltip placement={'bottom'} title={'Share this series'}>
                        <div>
                          <ShareProfile
                            message={'Check out this comic series on'}
                            username={`assets/series/${seriesDetails._id}`}
                          />
                        </div>
                      </Tooltip>
                    </Space>
                  </Space>
                </Space>
                {loadingOrdinalData && <Spin />}
                {!loadingOrdinalData &&
                  toLower(signedWalletAddress) == toLower(seriesDetails.walletAddress) &&
                  (!ordinalData || (ordinalData && !ordinalData?.revealTx)) && (
                    <Button
                      type='primary'
                      style={{ width: '120px' }}
                      onClick={() => onFeeVisibilityChange(true)}
                    >Publish</Button>
                  )}
              </Space>
              <div>
                <Space
                  style={{
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    type={isListView ? 'primary' : 'default'}
                    onClick={toggleView}
                    shape={'round'}
                  >
                    List View
                  </Button>
                  <Button
                    type={!isListView ? 'primary' : 'default'}
                    onClick={toggleView}
                    shape={'round'}
                  >
                    Grid View
                  </Button>
                </Space>
                {isListView ? <ListView /> : <GridView />}
              </div>
            </Space>
          </SeriesViewWrapper>
        )}
        {/*</div>*/}
      </MainWrapper>
      {selectedAsset && (
        <BookFlippingPreview
          visibility={previewVisibility}
          onClose={onPreviewBook}
          episodeIndex={selectedEpisodeIndex}
          onNextEpisodePreview={onPrevEpisodePreview}
          onPrevEpisodePreview={onNextEpisodePreview}
          episodes={get(episodeData, 'episodes')}
          {...(selectedAsset ?? {})}
          user={
            Object.assign({}, get(seriesDetails, 'user'), {
              username: enumerateUser(get(seriesDetails, 'user')!),
            }) as unknown as UserNamespace.User & {
              username: { link: string; name: string };
            }
          }
        />
      )}
    </>
  );
};
