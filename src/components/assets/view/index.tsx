import { Button, Empty, Space, Tag, Tooltip, Typography } from 'antd';
import { SceneAdd, SceneCard } from '@/components/scene';
import { isEmpty, toLower, truncate } from 'lodash';
// import {
//   MoreOutlined,
//   ReloadOutlined,
//   ShareAltOutlined,
// } from '@ant-design/icons';
import Link from 'next/link';
import { Container, OutterContainer } from './index.styled';
import { BookNamespace } from '@/shared/namespaces/book';
// import {CharacterCard } from '@/components/characters';
import React from 'react';
import { AssetViewCoverImage } from '@/components/assets/view/cover-image';
import { AssetViewMetadata } from '@/components/assets/view/metadata';
import { enumerateUser } from '@/components/sale/view/columns';
import { determineFileType, isISO8601 } from '@/shared/utils';
import format from 'date-fns/format';
import { BookFlippingPreview } from '@/components/book';
import { SeriesNamespace } from '@/shared/namespaces/series';
import { ImageView } from '@/components/isomorphic/image-viewer[thumbnail]/main-view';
import { VideoPlayer } from '@/components/video-player';

const { Title, Text } = Typography;

export interface ViewAssetProps extends BookNamespace.Book {
  loading?: boolean;
  onReviseBook: () => void;
  onPreviewBook: (visibility: boolean) => void;
  onSellBook: () => void;
  onCreateScene: (e: any) => void;
  onCreateCharacter: (e: any) => void;
  onSceneActions: (sceneID: string) => void;
  onCharacterActions: (characterID: string) => void;
  previewVisibility: boolean;
  walletAddress?: string;
  published?: boolean;
  togglePublishAsset: () => void;
  series?: SeriesNamespace.Series;
  onLikeAsset: () => void;
  likingAsset?: boolean;
  publishingAsset?: boolean;
  currentAccount: string;
  ordinalData: any;
  setFeeModalVisibility: any;
}

export const Attr = (arr: BookNamespace.Attribute[]) => {
  if (isEmpty(arr))
    return (
      <Space align={'center'}>
        <Text strong>No attributes</Text>
      </Space>
    );
  return arr?.map((item: any, key) => {
    let value: string = item.value;

    if (isISO8601(item.value)) {
      try {
        value = format(new Date(item.value), 'MMM, dd yyyy hh:mm:ss');
      } catch (e) { }
    }
    return (
      <Tag
        color="geekblue"
        key={key}
        style={{ minWidth: 100, borderRadius: 12 }}
      >
        <Space
          direction={'vertical'}
          style={{ justifyContent: 'center', width: '100%' }}
          size={5}
          align={'center'}
        >
          <Text strong>{item.title}</Text>
          <Title level={5}>{value}</Title>
        </Space>
      </Tag>
    );
  });
};

export const ViewAsset = (props: ViewAssetProps) => {
  const {
    onPreviewBook,
    onReviseBook,
    onSellBook,
    onCreateScene,
    onSceneActions,
    // onCharacterActions,
    // onCreateCharacter,
    previewVisibility,
    walletAddress,
    published,
    togglePublishAsset,
    series,
    // loading,
    onLikeAsset,
    likingAsset,
    publishingAsset,
    currentAccount,
    ordinalData,
    setFeeModalVisibility
  } = props;

  const user = enumerateUser(props.user);
  //console.log('sceeense', props.scenes);
  const isCreator =
    toLower(currentAccount) === toLower(props.user.walletAddress);

  const coverImageFileType = determineFileType(props.coverImage);

  const renderAllScenes = (props.scenes ?? []).map((scene: any, key: any) => (
    <div key={key}>
      <SceneCard
        img={scene.coverImage}
        description={scene.description}
        artists={
          scene.artists
            ?.map((artist: any) => artist.name ?? 'No Name Rendered')
            ?.join(', ') ?? ''
        }
        title={scene.title}
        onRevise={() => onSceneActions(scene._id)}
      />
    </div>
  ));
  const assetViewCoverImage = (
    <AssetViewCoverImage
      likes={props.likes}
      disableLiking={!walletAddress}
      coverImage={props.coverImage}
      thumbnail={props.thumbnail}
      published={published}
      liked={props.liked}
      onLike={onLikeAsset}
      likingAsset={likingAsset}
      hidePublishedBadge={currentAccount != walletAddress}
    />
  );
  // const renderAllCharacters = (props.characters ?? []).map(
  //   (character: any, key: any) => (
  //     <div key={key}>
  //       <CharacterCard
  //         img={character.coverImage}
  //         description={character.description}
  //         artists={
  //           character.artists
  //             ?.map((artist: any) => artist.name ?? 'No Name Rendered')
  //             ?.join(', ') ?? ''
  //         }
  //         title={character.title}
  //         onRevise={() => onCharacterActions(character._id)}
  //       />
  //     </div>
  //   )
  // );

  return (
    <>
      <OutterContainer>
        <Container>
          <div className="image-container meta-flex meta-flex-col">
            {assetViewCoverImage}
            <AssetViewMetadata
              ageRating={props.ageRating}
              attributes={props.attributes}
              description={props.description}
              GENRE_OPTIONS={props.genres}
              infoLink={String(props.infoLink)}
              user={user}
            />
          </div>

          <div className={'book-details-main-container'}>
            <Space
              size={10}
              direction={'vertical'}
              style={{ width: '100%', paddingBottom: 20 }}
            >
              <div>
                Series:{' '}
                <Link href={`/assets/series/${props?.series?._id}`}>
                  <a>
                    <strong>{series?.title}</strong>
                  </a>
                </Link>{' '}
              </div>
              <div className="meta-flex meta-flex-s-b">
                <Title
                  level={1}
                  className="info-title"
                  style={{ color: published ? 'var(--heading-color)' : 'grey' }}
                >
                  {props.title}
                </Title>
              </div>

              <div className="meta-flex meta-flex-s-b meta-align-center">
                <Title
                  level={5}
                  style={{ color: published ? 'var(--heading-color)' : 'grey' }}
                >
                  Created by{' '}
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

              <div>
                <Space
                  size={20}
                  direction={'horizontal'}
                  align={'start'}
                  style={{ width: '100%' }}
                  wrap
                >
                  {isCreator && (
                    <>
                      <Tooltip
                        title={
                          'Anyone can view this episode while it is published. Do NOT publish an episode you intend to monetize with one or more options below'
                        }
                      >
                        <Button
                          loading={publishingAsset}
                          shape={'round'}
                          onClick={togglePublishAsset}
                        >
                          {published ? 'Unpublish' : 'Publish'}
                        </Button>
                      </Tooltip>
                      <Button shape={'round'} onClick={onReviseBook}>
                        Revise
                      </Button>
                    </>
                  )}
                  {(isCreator || published) && (
                    <Button
                      type={!isCreator ? 'primary' : undefined}
                      shape={'round'}
                      onClick={() => onPreviewBook(true)}
                    >
                      Read
                    </Button>
                  )}
                  <Button
                    type={!isCreator ? 'primary' : undefined}
                    shape={'round'}
                    loading={likingAsset}
                    onClick={onLikeAsset}
                  >
                    {props.liked ? 'Dislike' : 'Like'} &#8226; {props.likes}{' '}
                    likes
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
                </Space>
              </div>
              {isCreator && (
                <>
                  <h3>Monetize</h3>
                  <div>
                    <Space
                      size={20}
                      direction={'horizontal'}
                      align={'start'}
                      style={{ width: '100%' }}
                      wrap
                    >
                      {/* <Tooltip
                        title={
                          'Only holders of this access card NFT can view this episode while it is NOT published. You can attach bonus art collectibles to the Access Card'
                        }
                      >
                         <Button
                        type="primary"
                        shape={'round'}
                        onClick={onSellBook}
                      >
                        {'Sell NFT Access Card'}
                      </Button>
                      </Tooltip> */}
                      {/* <Tooltip
                        title={
                          'Collect $COMI token payments from fans to gain early access or read this episode for a limited time'
                        }
                      > <Button type="primary" shape={'round'} onClick={onReviseBook}>
                        Paid Access ($COMI)
                      </Button>
                      </Tooltip> */}
                      <Tooltip
                        title={
                          'Sell this episode as an NFT collectible. You can attach bonus art collectibles as well.'
                        }
                      >
                        <Button
                          type="primary"
                          shape={'round'}
                          onClick={onSellBook}
                        >
                          Sell As NFT Access
                        </Button>
                      </Tooltip>
                      {!ordinalData && (
                        <Button
                          type="primary"
                          shape={'round'}
                          onClick={() => setFeeModalVisibility(true)}
                        >
                          Inscribe Ordinal
                        </Button>
                      )}
                    </Space>
                  </div>
                </>
              )}
            </Space>

            <div
              style={{ paddingBottom: 20 }}
              className="image-container-mobile  meta-flex meta-flex-col"
            >
              {assetViewCoverImage}
              <AssetViewMetadata
                ageRating={props.ageRating}
                attributes={props.attributes}
                description={props.description}
                GENRE_OPTIONS={props.genres}
                infoLink={String(props.infoLink)}
                user={user}
              />
            </div>

            <Space size={20} className={'w-100'} direction={'vertical'}>
              {isCreator && (
                <Space
                  size={5}
                  direction={'vertical'}
                  className={'book-details-scene-container'}
                >
                  <Title level={3} style={{ color: 'var(--heading-color)' }}>
                    Episode Strip
                  </Title>
                  {coverImageFileType == 'video' && (
                    <VideoPlayer
                      src={props.coverImage ?? ''}
                      style={{ maxHeight: '500px' }}
                    // poster={uploadedFile?.thumbUrl}
                    // style={{ maxHeight: '500px' }}
                    />
                  )}
                  {coverImageFileType == 'image' && (
                    <ImageView
                      style={{
                        width: 'auto',
                        height: '300px',
                        marginBottom: '20px',
                        // aspectRatio: '1/1',
                      }}
                      src={props.coverImage ?? ''}
                    />
                  )}
                </Space>
              )}
              {(isCreator || published) && (
                <Space
                  size={10}
                  direction={'vertical'}
                  className={'book-details-scene-container'}
                >
                  <Title level={3} style={{ color: 'var(--heading-color)' }}>
                    <Space size={20} align={'center'}>
                      <span>Bonus NFT Art</span>
                      <Tooltip
                        title={
                          'Bonus arts are also received by the buyer when an episode is sold as an' +
                          ' NFT. You will earn royalties for life when a collector resells a bonus NFT art.'
                        }
                      >
                        <Button
                          type={'text'}
                          icon={
                            <i
                              className="mc-question-circle-line mc-2x"
                              style={{ fontSize: '1.5rem' }}
                            />
                          }
                        />
                      </Tooltip>
                    </Space>
                  </Title>

                  <div className="sell-scene-container">
                    {isCreator && <SceneAdd onCreateScene={onCreateScene} />}
                    {isEmpty(props.scenes) && !isCreator ? (
                      <div className={'w-100 meta-flex meta-flex-center'}>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={'No bonus art added!'}
                        />
                      </div>
                    ) : (
                      renderAllScenes
                    )}
                  </div>
                </Space>
              )}
              <Space
                size={10}
                direction={'vertical'}
                className={'book-details-scene-container'}
              >
                {/*<Title level={3} style={{ color: 'var(--heading-color)' }}>*/}
                {/*  <Space size={10} align={'center'}>*/}
                {/*    <span>Characters</span>*/}
                {/*    <Tooltip title={'Click on the character card to update it'}>*/}
                {/*      <Button*/}
                {/*        type={'text'}*/}
                {/*        icon={*/}
                {/*          <i*/}
                {/*            className="mc-question-circle-line mc-2x"*/}
                {/*            style={{ fontSize: '1.5rem' }}*/}
                {/*          />*/}
                {/*        }*/}
                {/*      />*/}
                {/*    </Tooltip>*/}
                {/*  </Space>*/}
                {/*</Title>*/}

                {/*<div className="sell-scene-container">*/}
                {/*  {isCreator && (*/}
                {/*    <div>*/}
                {/*      <span>Coming Soon</span>*/}
                {/*      {Math.abs(1) == 2 && (*/}
                {/*        <CharacterAdd onCreateCharacter={onCreateCharacter} />*/}
                {/*      )}*/}
                {/*    </div>*/}
                {/*  )}*/}
                {/*  {isEmpty(props.scenes) && !isCreator ? (*/}
                {/*    <div className={'w-100 meta-flex meta-flex-center'}>*/}
                {/*      <Empty*/}
                {/*        image={Empty.PRESENTED_IMAGE_SIMPLE}*/}
                {/*        description={'No character added!'}*/}
                {/*      />*/}
                {/*    </div>*/}
                {/*  ) : (*/}
                {/*    renderAllCharacters*/}
                {/*  )}*/}
                {/*</div>*/}
              </Space>
            </Space>
          </div>
        </Container>
      </OutterContainer>
      <BookFlippingPreview
        visibility={previewVisibility}
        onClose={onPreviewBook}
        {...props}
        user={Object.assign({}, props.user, { username: user })}
      />
    </>
  );
};
