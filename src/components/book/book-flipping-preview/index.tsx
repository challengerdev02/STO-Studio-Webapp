import React, { useCallback, useRef, useState } from 'react';
import {
  PreviewHeader,
  ScrollToTopContainer,
  StyledDrawer,
  Wrapper,
} from './index.styled';
import { Avatar, Button, Image, Space, Tooltip } from 'antd';
import { BookNamespace } from '@/shared/namespaces/book';
import { SceneNamespace } from '@/shared/namespaces/scene';
import { UserNamespace } from '@/shared/namespaces/user';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { get, isPlainObject } from 'lodash';
import Link from 'next/link';
import { isDesktop } from 'react-device-detect';
import {
  CloseOutlined,
  // LeftOutlined,
  LinkOutlined,
  // RightOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { SeriesNamespace } from '@/shared/namespaces/series';
import { AnimatePresence, motion } from 'framer-motion';
import { VideoPlayer } from '@/components/video-player';
import { determineFileType } from '@/shared/utils';

interface BookFlippingPreviewProps extends BookNamespace.Book {
  onClose: (visibility: boolean) => void;
  visibility: boolean;
  scenes: SceneNamespace.Scene[];
  episodeIndex?: number;
  onNextEpisodePreview?: () => void;
  onPrevEpisodePreview?: () => void;
  episodes?: SeriesNamespace.Episode[];
  user: UserNamespace.User & { username: { link: string; name: string } };
}

export const BookFlippingPreview = (props: BookFlippingPreviewProps) => {
  const {
    title,
    onClose,
    visibility,
    scenes = [],
    user,
    coverImage,
    series,
    episodeIndex,
    onNextEpisodePreview,
    onPrevEpisodePreview,
    episodes,
    issueNumber,
  } = props;

  const images = [
    { src: coverImage },
    ...(scenes ?? []).map((scene) => ({ src: scene.coverImage })),
  ];

  const coverImageFileType = determineFileType(coverImage);

  const [showScrollToButton, setShowScrollToButton] = useState(false);

  const drawerRef = useRef<HTMLDivElement | undefined>();

  const drawerCallbackRef = useCallback((node: HTMLDivElement) => {
    const drawer = document.querySelector('.book-preview .ant-drawer-body');
    if (drawer && node) {
      drawer.addEventListener(
        'scroll',
        (event) => {
          const scrollTop = (event.target as HTMLDivElement).scrollTop;

          if (scrollTop > 100) {
            setShowScrollToButton(true);
          } else {
            setShowScrollToButton(false);
          }

          drawerRef.current = node;
        }
        // { once: true }
      );
    }
  }, []);

  const onScrollToTop = () => {
    if (drawerRef.current) {
      drawerRef.current?.scrollIntoView({ behavior: 'smooth' });
      // setShowScrollToButton(false);
    }
  };

  const Header = (
    <PreviewHeader className={'meta-flex meta-flex-s-b meta-align-center'}>
      <div className="book-preview-header-section">
        <h2>{title}</h2>
        <div className={'meta-flex meta-align-center meta-flex-s-b'}>
          <Space size={5} className="meta-flex meta-align-center">
            {/*<small>by </small>{' '}*/}
            <Space size={5} align={'center'}>
              <Avatar
                src={
                  user.avatar ? (
                    <Image alt="..." src={user.avatar} style={{ width: 32 }} />
                  ) : undefined
                }
                icon={
                  <GradientAvatar
                    size={80}
                    value={get(user, 'walletAddress', 'Metacomics')}
                  />
                }
              />
              <span className="author">
                <Link href={user?.username?.link}>{user?.username?.name}</Link>
              </span>
              {/*<span className="author">{user.username}</span>*/}
            </Space>
          </Space>
        </div>
      </div>
      {/*{episodeIndex !== undefined &&*/}
      {/*  (onNextEpisodePreview || onPrevEpisodePreview) &&*/}
      {/*  episodes && (*/}
      {/*    <Space className="book-preview-header-section" size={10}>*/}
      {/*      <Tooltip title={'Previous episode'} placement={'bottomLeft'}>*/}
      {/*        <Button*/}
      {/*          size={'small'}*/}
      {/*          shape={'circle'}*/}
      {/*          icon={<LeftOutlined />}*/}
      {/*          disabled={episodeIndex <= 0}*/}
      {/*          onClick={onPrevEpisodePreview}*/}
      {/*        />*/}
      {/*      </Tooltip>*/}
      <h3>#{issueNumber}</h3>
      {/*      <Tooltip title={'Next episode'} placement={'bottomLeft'}>*/}
      {/*        <Button*/}
      {/*          size={'small'}*/}
      {/*          shape={'circle'}*/}
      {/*          icon={<RightOutlined />}*/}
      {/*          disabled={episodeIndex >= episodes.length - 1}*/}
      {/*          onClick={onNextEpisodePreview}*/}
      {/*        />*/}
      {/*      </Tooltip>*/}
      {/*    </Space>*/}
      {/*  )}*/}
      <Space className="book-preview-header-section" size={10}>
        {episodeIndex !== undefined &&
        (onNextEpisodePreview || onPrevEpisodePreview) &&
        episodes ? null : (
          <Tooltip title={'Check out the series'} placement={'bottomLeft'}>
            <Button
              size={'small'}
              shape={'circle'}
              icon={<LinkOutlined />}
              href={`/assets/series/${get(series, '_id')}`}
              target={'_blank'}
            />
          </Tooltip>
        )}
        {/*<Tooltip title={'View more info about this episode'}>*/}
        {/*  <Button*/}
        {/*    size={'small'}*/}
        {/*    shape={'circle'}*/}
        {/*    icon={<InfoCircleOutlined />}*/}
        {/*  />*/}
        {/*</Tooltip>*/}
        <Tooltip title={'Close'} placement={'bottomLeft'}>
          <Button
            size={'small'}
            shape={'circle'}
            icon={<CloseOutlined />}
            onClick={() => onClose(false)}
          />
        </Tooltip>
      </Space>
    </PreviewHeader>
  );

  return (
    <>
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
        title={Header}
        className={'book-preview'}
        // forceRender
      >
        <Tooltip title={'Scroll to top'}>
          <ScrollToTopContainer
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: showScrollToButton ? 1 : 0,
              opacity: showScrollToButton ? 1 : 0,
            }}
            transition={{ duration: 0.1 }}
            initial={{ scale: 0 }}
            aria-label={'Scroll to top button'}
            onClick={onScrollToTop}
          >
            <VerticalAlignTopOutlined size={30} />
          </ScrollToTopContainer>
        </Tooltip>
        <Wrapper
          data-testid="my-book-preview-wrapper"
          showInfo={false}
          style={{ height: 'unset' }}
          ref={drawerCallbackRef}
        >
          <AnimatePresence>
            <motion.div
              // layout
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className={
                'w-100 h-100 meta-flex meta-flex-col meta-align-center'
              }
            >
              {coverImageFileType === 'video' && (
                <div style={{ width: '100%', height: '100%' }}>
                  <VideoPlayer src={coverImage} style={{ maxHeight: '80vh' }} />
                </div>
              )}
              {coverImageFileType === 'image' &&
                images.map((image, index) => (
                  <Image
                    preview={false}
                    key={index}
                    alt={'Preview Image'}
                    src={
                      (isPlainObject(image)
                        ? get(image, 'src')
                        : image) as string
                    }
                  />
                ))}
            </motion.div>
          </AnimatePresence>
        </Wrapper>
      </StyledDrawer>
    </>
  );
};
