import React, { useState } from 'react';
import {
  ActionContainer,
  InfoContainer,
  SliderContainer,
  Wrapper,
} from './index.styled';
import {
  ImageViewComponent,
  IsomorphicDrawer,
  IsomorphicTab,
} from '@/components';
import { Avatar, Button, Image, Space, Tabs } from 'antd';
import { BookNamespace } from '@/shared/namespaces/book';
import { InfoTab } from './info';
import { BuyTab } from './buy';
import { SellTab } from './sell';
import { SceneNamespace } from '@/shared/namespaces/scene';
import { UserNamespace } from '@/shared/namespaces/user';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { get } from 'lodash';
import Link from 'next/link';
import { isDesktop, isTablet } from 'react-device-detect';

const { TabPane } = Tabs;

interface BookPreviewProps extends BookNamespace.Book {
  onClose: (visibility: boolean) => void;
  visibility: boolean;
  scenes: SceneNamespace.Scene[];
  isbn?: string;
  user: UserNamespace.User & { username: { link: string; name: string } };
}

export const BookPreview = (props: BookPreviewProps) => {
  const { title, onClose, visibility, scenes, user, coverImage } = props;
  const [selectedScene, setSelectedScene] = useState<SceneNamespace.Scene>();
  const thumbnailSelect = (index: number) => {
    setSelectedScene(scenes[index - 1] ?? null);
  };
  const images = [
    { src: coverImage },
    ...(scenes ?? []).map((scene) => ({ src: scene.coverImage })),
  ];
  const [showInfo, setShowInfo] = useState(isDesktop);
  const variants = {
    full: { width: 'calc(100% - 96px)' },
    half: { width: '65%' },
  };
  const infoVariants = {
    show: {
      display: 'flex',
      opacity: 1,
      scale: 1,
    },
    hidden: {
      backgroundColor: 'transparent',
      boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
      opacity: 0,
      scale: 0,
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <>
      <IsomorphicDrawer
        visible={visibility}
        onClose={() => onClose(false)}
        bodyStyle={{ padding: '55.5px 90.5px', paddingRight: 24 }}
        maskClosable
        height={isDesktop ? '99vh' : '95vh'}
        data-testid="isomorphic"
      >
        <Wrapper data-testid="my-book-preview-wrapper" showInfo={showInfo}>
          <SliderContainer
            data-testid="component-slider"
            initial="half"
            layout
            variants={variants}
            animate={showInfo ? 'half' : 'full'}
            transition={{ ease: 'anticipate' }}
          >
            <h2>{title}</h2>
            <div className={'meta-flex meta-align-center meta-flex-s-b'}>
              <Space size={10} className="meta-flex meta-align-center">
                <Avatar
                  src={
                    user.avatar ? (
                      <Image
                        alt="..."
                        src={user.avatar}
                        style={{ width: 32 }}
                      />
                    ) : undefined
                  }
                  icon={
                    <GradientAvatar
                      size={80}
                      value={get(user, 'walletAddress', 'Metacomics')}
                    />
                  }
                />
                <Space size={2} align={'center'}>
                  <small>by </small>{' '}
                  <span className="author">
                    <Link href={user?.username?.link}>
                      {user?.username?.name}
                    </Link>
                  </span>
                  {/*<span className="author">{user.username}</span>*/}
                </Space>
              </Space>
              <Space align={'center'} size={10}>
                <h3>Last Price</h3>
                <Button type="primary" ghost size={'small'} shape={'round'}>
                  2.45 ETH
                </Button>
              </Space>
            </div>
            {(isDesktop || isTablet) && (
              <ImageViewComponent
                images={images}
                onThumbnailChange={thumbnailSelect}
              />
            )}
          </SliderContainer>

          <InfoContainer
            initial="show"
            variants={infoVariants}
            animate={showInfo ? 'show' : 'hidden'}
            data-testid="info-container"
            layout
            transition={{ ease: 'anticipate' }}
          >
            <IsomorphicTab>
              <TabPane tab="Info" key="1">
                <InfoTab
                  selectedScene={selectedScene}
                  {...props}
                  data-testid="info-pane"
                />
              </TabPane>
              <TabPane tab="Buy" key="2">
                <BuyTab data-testid="buy-pane" />
              </TabPane>
              <TabPane tab="Sell" key="3">
                <SellTab data-testid="sell-pane" />
              </TabPane>
            </IsomorphicTab>
          </InfoContainer>
          <ActionContainer layout transition={{ ease: 'anticipate' }}>
            <Button
              ghost
              shape="circle"
              icon={<i className="mc-share-square-fill" />}
            />
            <Button
              onClick={() => setShowInfo((old) => !old)}
              ghost
              type={showInfo ? 'default' : 'primary'}
              shape="circle"
              icon={<i className="mc-info-circle-fill" />}
              data-testid="btn"
            />
          </ActionContainer>
        </Wrapper>
      </IsomorphicDrawer>
    </>
  );
};
