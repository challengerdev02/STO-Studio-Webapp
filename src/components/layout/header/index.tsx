import { Avatar, Button, Divider, Form, Input, Skeleton, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { ConnectPopover, Header, Image, LogoContainer } from './index.styled';
import { getPopupContainer, truncateEthAddress } from '@/shared/utils';
import { DropDownContent } from './connect-dropdown';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { motion } from 'framer-motion';
import { BalanceDrawer } from './balance-drawer';
import { FullscreenMenu } from './fullscreen-menu';
import { SearchDialog } from './search';
import { isDesktop, isTablet } from 'react-device-detect';
import { AddFund } from './add-fund';
import { UserNamespace } from '@/shared/namespaces/user';
import { get, isEmpty } from 'lodash';
import { ActionOption } from '../../../redux/types';
import { BookNamespace } from '@/shared/namespaces/book';
import { HeaderSearch } from '@/components/layout/header/search/header-search';
import { useRouter } from 'next/router';
// import { PlusOutlined } from '@ant-design/icons';
// import { useRouter } from 'next/router';

export interface BaseLayoutHeaderProps {
  onFinish?: (data: any) => void;
  onCreate?: (data: any) => void;
  onConnectWallet: (data: any) => void;
  onDisconnectWallet: () => void;
  mdLogo?: string;
  smLogo?: string;
  walletAddress?: string;
  getBalance: (contractAddress?: string, option?: ActionOption) => void;
  loading: boolean;
}

export interface LayoutHeaderProps
  extends BaseLayoutHeaderProps,
    Partial<UserNamespace.User> {
  balanceObject: Record<string, any>;
  isGettingBalance?: boolean;
  onSearch: (value: string) => void;
  clearSearch: () => void;
  onGetHCOMIBalance: () => void;
  hComiBalance: Record<string, any>;
  items: BookNamespace.SearchItem;
  isSearching: boolean;
  isGettingHComiBalance: boolean;
}

export const LayoutHeader = (props: LayoutHeaderProps) => {
  const {
    onFinish,
    mdLogo,
    smLogo,
    onCreate,
    onConnectWallet,
    walletAddress,
    onDisconnectWallet,
    getBalance,
    loading,
    balanceObject,
    isGettingBalance,
    items,
    onSearch,
    isSearching,
    clearSearch,
    hComiBalance,
    onGetHCOMIBalance,
    isGettingHComiBalance,
    ...user
  } = props;

  const router = useRouter();

  const [balanceDrawerVisibility, setBalanceDrawerVisibility] = useState(false);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [addFundVisibility, setAddFundVisibility] = useState(false);
  const [fullscreenMenuVisibility, setFullscreenMenuVisibility] =
    useState(false);

  const onBalanceDrawerVisibilityChange = (visibility: boolean) => {
    setBalanceDrawerVisibility(visibility);
  };

  const onFullscreenMenuVisibilityChange = (visibility: boolean) => {
    setFullscreenMenuVisibility(visibility);
  };

  const onSearchVisibilityChange = (visibility: boolean) => {
    setSearchVisibility(visibility);
  };

  const onAddFundVisibilityChange = (visibility: boolean) => {
    setAddFundVisibility(visibility);
  };

  const onScroll = () => {
    const header = document.getElementById('main-header');
    if (header) {
      if (window.scrollY > 0) {
        header.style.background = 'var(--header-background)';
      } else {
        header.style.background = 'transparent';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // alert(walletAddress);

  const tabletCreateButton = (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 0.98 }}
      key={'create-button'}
    >
      <Button
        onClick={onCreate}
        type="primary"
        data-testid={'create-button'}
        shape="round"
        id={'create-button'}
      >
        Create
      </Button>
    </motion.div>
  );

  return (
    <Fragment>
      <SearchDialog
        visibility={searchVisibility}
        onVisibilityChange={onSearchVisibilityChange}
        onSearch={onSearch}
        items={items}
        isSearching={isSearching}
        clearSearch={clearSearch}
      />
      <FullscreenMenu
        visibility={fullscreenMenuVisibility}
        onVisibilityChange={onFullscreenMenuVisibilityChange}
        walletAddress={walletAddress}
      />
      {walletAddress && (
        <BalanceDrawer
          getBalance={getBalance}
          walletAddress={walletAddress as string}
          onVisibilityChange={onBalanceDrawerVisibilityChange}
          visibility={balanceDrawerVisibility}
          onDisconnectWallet={onDisconnectWallet}
          placement={isDesktop ? 'left' : 'bottom'}
          onAddFundVisibilityChange={onAddFundVisibilityChange}
          avatarURL={get(user, 'avatar')}
          balanceObject={balanceObject}
          isGettingBalance={isGettingBalance}
          hComiBalance={hComiBalance}
          onGetHCOMIBalance={onGetHCOMIBalance}
          isGettingHComiBalance={isGettingHComiBalance}
        />
      )}
      {walletAddress && (
        <AddFund
          address={walletAddress as string}
          onVisibilityChange={onAddFundVisibilityChange}
          visibility={addFundVisibility}
        />
      )}
      <Header role="main-header" id={'main-header'}>
        <Link passHref href={'/'}>
          <motion.a whileTap={{ scale: 0.95 }}>
            <LogoContainer>
              <Image
                className="md-logo"
                src={mdLogo || '/assets/logo-200.png'}
                alt="MetaComic"
              />
              <Image
                className="sm-logo"
                src={smLogo || '/assets/logo-200.png'}
                alt="MetaComic"
              />
            </LogoContainer>
          </motion.a>
        </Link>
        <Divider type="vertical" />
        <div className="link-list">
          <Link href={'/'} passHref>
            <motion.a className="meta-text-link">Home</motion.a>
          </Link>
          <Link href={'/collect'} passHref>
            <motion.a className="meta-text-link">Market</motion.a>
          </Link>
          {/*<Link href={'/launch'} passHref>*/}
          {/*  <motion.a className="meta-text-link">Crowdfund</motion.a>*/}
          {/*</Link>*/}

          <motion.a
            href={'https://metacomic.tawk.help/'}
            target={'_blank'}
            rel="noreferrer"
            className="meta-text-link"
          >
            Resources
          </motion.a>

          {/*<Link href={'/token'} passHref>*/}
          {/*  <motion.a className="meta-text-link">Token</motion.a>*/}
          {/*</Link>*/}
          {/*<Link href={'/launch'} passHref>*/}
          {/*  <motion.a className="meta-text-link">Launch</motion.a>*/}
          {/*</Link>*/}
        </div>
        <div
          className="button-list button-list-desktop"
          style={{ flex: 1, paddingLeft: '8%' }}
        >
          <HeaderSearch
            onSearch={onSearch}
            items={items}
            isSearching={isSearching}
            clearSearch={clearSearch}
          />
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 0.98 }}>
            <Button
              onClick={onCreate}
              type="primary"
              data-testid={'create-button'}
              shape="round"
            >
              Create
            </Button>
          </motion.div>

          {walletAddress && (
            // <ConnectPopover
            //   content={<DropDownContent logout={onDisconnectWallet} />}
            //   trigger="click"
            //   getPopupContainer={getPopupContainer}
            // >
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 0.98 }}
              onClick={() => onBalanceDrawerVisibilityChange(true)}
            >
              <Button data-testid={'wallet-address-button'} shape="round">
                {truncateEthAddress(walletAddress)}
              </Button>
            </motion.div>
            // </ConnectPopover>
          )}
          {/*{walletAddress}*/}
          {isEmpty(walletAddress) && (
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 0.98 }}>
              <Link
                href={`/connect?referrer=${
                  router.query.referrer ?? router.asPath
                }`}
                passHref
              >
                <Button
                  shape="round"
                  data-testid={'connect-wallet-button'}
                  // onClick={onConnectWallet}
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
          )}
          {walletAddress && (
            <ConnectPopover
              content={
                <DropDownContent
                  onShowBalance={() => setBalanceDrawerVisibility(true)}
                  logout={onDisconnectWallet}
                />
              }
              trigger="click"
              getPopupContainer={getPopupContainer}
            >
              <motion.div
                data-testid={'drawer-balance-icon'}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 0.98 }}
                style={{ cursor: 'pointer' }}
              >
                {loading && (
                  <Skeleton.Avatar
                    active={loading}
                    size={44}
                    shape={'circle'}
                  />
                )}
                {!loading && (
                  <Avatar
                    size={44}
                    icon={
                      <GradientAvatar
                        size={44}
                        value={walletAddress ?? 'Metacomic'}
                      />
                    }
                    src={get(user, 'avatar')}
                  />
                )}
              </motion.div>
            </ConnectPopover>
          )}
        </div>

        <Space
          align={'center'}
          size={15}
          className="button-list-mobile mobile-list-desktop"
        >
          <Space>{isTablet && tabletCreateButton}</Space>

          {isEmpty(walletAddress) && (
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 0.98 }}>
              <Link href={`/connect?referrer=${router.asPath}`} passHref>
                <Button
                  shape="round"
                  type={'primary'}
                  size={'small'}
                  // data-testid={'connect-wallet-button'}
                  // onClick={onConnectWallet}
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>
          )}

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              className="toggle-menu ant-btn-custom"
              type="default"
              shape={'circle'}
              size={'small'}
              icon={<i className="mc-search-line" />}
              onClick={() => onSearchVisibilityChange(true)}
            />
          </motion.div>
          {/*<motion.div whileTap={{ scale: 0.95 }}>*/}
          {/*  <Button*/}
          {/*    className="toggle-menu "*/}
          {/*    type="primary"*/}
          {/*    shape={'circle'}*/}
          {/*    size={'small'}*/}
          {/*    icon={<PlusOutlined />}*/}
          {/*    onClick={() => router.push('/assets/create')}*/}
          {/*  />*/}
          {/*</motion.div>*/}

          {/*{walletAddress && (*/}
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              className="toggle-menu ant-btn-custom"
              type="default"
              shape={'circle'}
              size={'small'}
              onClick={() => onFullscreenMenuVisibilityChange(true)}
              icon={<i className="mc-burger-line" />}
            />
          </motion.div>
          {/*)}*/}
          {walletAddress && (
            <motion.div
              data-testid={'drawer-balance-icon-2'}
              whileTap={{ scale: 0.95 }}
              onClick={() => onBalanceDrawerVisibilityChange(true)}
            >
              {loading && (
                <Skeleton.Avatar active={loading} size={44} shape={'circle'} />
              )}
              {!loading && (
                <Avatar
                  size={44}
                  icon={
                    <GradientAvatar
                      size={44}
                      value={walletAddress ?? 'Metacomics'}
                    />
                  }
                  src={get(user, 'avatar')}
                />
              )}
            </motion.div>
          )}
        </Space>

        <div style={{ display: 'none' }} className={`mobile-menu-layout`}>
          <div className="logo-container">
            <Image className="md-logo" src={mdLogo || '/logo.png'} alt="logo" />
          </div>
          <Form name="search-form" onFinish={onFinish}>
            <Form.Item
              name="search"
              rules={[{ message: 'Please input search value' }]}
            >
              <Input
                placeholder="Item, Collection, Artist"
                suffix={
                  <Button type="text">
                    <i className="mc-search-line" />
                  </Button>
                }
              />
            </Form.Item>
          </Form>
          <div className="links">
            <Text>Market</Text>
            <Text>Resources</Text>
            {/*<Text>Token</Text>*/}
            {/*<Text>Launch</Text>*/}
            <Text>Create</Text>
          </div>
        </div>
      </Header>
    </Fragment>
  );
};
