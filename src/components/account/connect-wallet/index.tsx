import { Button, Collapse, Modal, Space, Typography } from 'antd';
import { pick } from 'lodash';
import { Web3ProvidersInfo } from '../../../blockchain/evm/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ConnectContainer } from './index.styled';
import {
  FacebookFilled,
  GoogleCircleFilled,
  RedditCircleFilled,
  TwitterCircleFilled,
} from '@ant-design/icons';
import { BaseProviderContextValues } from '../../../blockchain/base';
import { providerOptions } from '../../../blockchain/evm/provider-options';
import { IWallet } from '@suiet/wallet-kit';
import { isMobile } from 'react-device-detect';
import Image from 'next/image';
const { Panel } = Collapse;

const { Title, Link } = Typography;

interface ConnectProps extends BaseProviderContextValues {}

export const Connect = (props: ConnectProps) => {
  const { connect, isConnecting, providerName, ...rest } = props;
  const [showFull, setShowFull] = useState(false);
  const [activeKey, setActiveKey] = useState<any>();

  const onChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  const wallets = pick(Web3ProvidersInfo, [
    'metamask',
    ...Object.keys(providerOptions),
  ]);
  const suiWalletTypes = [
    ...(rest.configuredWallets ?? []),
    ...(rest.detectedWallets ?? []),
  ];
  const walletKeys = Object.keys(wallets);
  //  type ExpandIconPosition = 'start' | 'end';
  const excludedInMobile: any = { metamask: true };

  const showWalletInfo = () => {
    Modal.info({
      title: 'What is a wallet?',
      content: (
        <div>
          A cryptocurrency wallet is an app that allows cryptocurrency users to
          store and retrieve their digital assets. As with conventional
          currency, you don’t need a wallet to spend your cash, but it certainly
          helps to keep it all in one place. When a user acquires
          cryptocurrency, such as bitcoins, she can store it in a cryptocurrency
          wallet and from there use it to make transactions.{' '}
          <Link
            target={'_blank'}
            href={
              'https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/'
            }
          >
            See more explanation
          </Link>
        </div>
      ),
      okText: 'Close',
      okType: 'default',
      okButtonProps: { shape: 'round' },
      bodyStyle: { width: '50vw' },
      width: '50vw',
    });
  };

  const onConnect = async (env: string, provider: string) => {
    await connect(env, provider);
  };

  const onToggleVisibility = () => {
    setShowFull((prev) => !prev);
  };

  const walletSlice = walletKeys.slice(
    0,
    showFull && activeKey === '1' ? walletKeys.length : 4
  );
  let showWallets: any = walletSlice;
  if (isMobile) {
    showWallets = showWallets.filter((d: string) => !excludedInMobile[d]);
  }
  const genExtraWallet = () => (
    <Space direction={'horizontal'}>
      {showWallets.map((key, index) => (
        <Image
          key={'sl' + index}
          onClick={(event) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
            setActiveKey(activeKey == 1 ? 0 : 1);
          }}
          src={wallets[key].logo}
          alt={wallets[key].name}
          height={24}
          width={24}
        />
      ))}
    </Space>
  );

  const genExtraSocial = () => (
    <Space direction={'horizontal'}>
      <GoogleCircleFilled />
      <FacebookFilled />
      <TwitterCircleFilled />
      <RedditCircleFilled />
    </Space>
  );

  const getButtons = (keys: any[]) => {
    if (isMobile) {
      keys = keys.filter((d: string) => !excludedInMobile[d]);
      keys = keys.sort((a: string, _: string) =>
        a != 'wallet-connect' ? 1 : -1
      );
      console.log('ISMOBILE', true, keys);
    }
    return keys.map((key: string, index: number) => {
      const wallet = wallets[key];
      const btnType =
        key === 'metamask' || key == 'torus' ? 'primary' : 'default';

      const loading =
        isConnecting && rest.env === 'evm' && providerName === wallet.id;

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 0.98 }}
          transition={{ duration: ((index || 1) + 1) * 0.1 }}
          key={wallet.id}
        >
          <Button
            block
            shape={'round'}
            type={btnType}
            onClick={() => onConnect('evm', wallet.id)}
            loading={loading}
            disabled={loading || isConnecting}
          >
            <Space
              size={10}
              className={'w-100 meta-flex-s-b meta-align-center'}
            >
              {loading || key == 'torus' ? (
                <span />
              ) : (
                <Image
                  src={wallet.logo}
                  alt={wallet.name}
                  height={24}
                  width={24}
                />
              )}
              {key != 'torus' && (
                <span>
                  {key === 'metamask' ? 'Sign in With ' : ''}
                  {wallet.name}
                </span>
              )}
              {key == 'torus' && <span>{'Continue with Email/Social'}</span>}
              <span />
            </Space>
          </Button>
        </motion.div>
      );
    });
  };
  const getSUIButtons = () => {
    return suiWalletTypes
      .slice(0, showFull && activeKey === '3' ? walletKeys.length : 4)
      .map((wallet: IWallet, index: number) => {
        const loading =
          isConnecting &&
          rest.env === 'sui' &&
          rest.wallet?.name === wallet.name;
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 0.98 }}
            transition={{ duration: ((index || 1) + 1) * 0.1 }}
            key={wallet.name}
          >
            <Button
              block
              shape={'round'}
              // type={btnType}
              onClick={() => {
                if (!wallet.installed) {
                  window.open(
                    wallet.downloadUrl.browserExtension,
                    '_blank',
                    'rel:no-referrer'
                  );
                  return;
                }
                onConnect('sui', wallet.name);
              }}
              loading={loading}
              disabled={loading || isConnecting}
            >
              <Space
                size={10}
                className={'w-100 meta-align-center meta-flex-s-b'}
              >
                {wallet.iconUrl && (
                  <img
                    src={wallet.iconUrl}
                    // alt={wallet.name}
                    height={24}
                    width={24}
                  />
                )}
                <div>Connect to {wallet.name}</div>
                <span />
              </Space>
            </Button>
          </motion.div>
        );
      });
  };
  return (
    <ConnectContainer
      className={'meta-flex meta-flex-col meta-flex-j-c meta-align-center'}
    >
      <Title level={2}>Sign In</Title>
      <Title level={5}>
        Choose how you want to sign in.
        <br />
        Using your wallet is the preferred method.
        <br />
        <Link onClick={showWalletInfo}>What is a wallet?</Link>
      </Title>
      <br />
      <br />

      <Collapse
        onChange={onChange}
        accordion={true}
        // defaultActiveKey={['2']}
        activeKey={activeKey}
        // expandIconPosition={'end' as ExpandIconPosition}
      >
        <Panel header="EVM Wallets" key="1" extra={genExtraWallet()}>
          <div style={{ textAlign: 'center' }}>
            <Space
              direction={'vertical'}
              size={20}
              // style={{ width: "40%" }}
              className={'connect-wallet-buttons-container'}
            >
              {getButtons(
                walletSlice.filter(
                  (key: string) => key.toLowerCase() != 'torus'
                )
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                // transition={{ duration: (walletKeys.length + 1) * 0.2 }}
              >
                <Button
                  block
                  shape={'round'}
                  onClick={onToggleVisibility}
                  style={{ justifyContent: 'center' }}
                >
                  Show {showFull ? 'fewer' : 'more'} options
                </Button>
              </motion.div>
            </Space>
          </div>
        </Panel>
        <Panel
          header="Near Protocol"
          key="2"
          extra={
            <Space direction={'horizontal'}>
              <img
                onClick={(event) => {
                  // If you don't want click extra trigger collapse, you can prevent this:
                  event.stopPropagation();
                  setActiveKey(activeKey == 1 ? 0 : 1);
                }}
                src={'/assets/near_logo_wht.svg'}
                alt={'Near Wallet'}
                // width={90}
                // width={24}
              />
            </Space>
          }
        >
          <div style={{ textAlign: 'center' }}>
            <Space
              direction={'vertical'}
              size={20}
              align={'center'}
              // justify={'middle'}
              // style={{ width: "40%" }}
              className={'connect-wallet-buttons-container'}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 0.98 }}
                key={'near'}
              >
                <Button
                  // block
                  shape={'round'}
                  type={'default'}
                  onClick={() => connect('near')}
                  loading={isConnecting}
                  disabled={isConnecting}
                >
                  <img
                    src={'/assets/near_logo_wht.svg'}
                    alt={'Near Wallet'}
                    height={24}
                    // width={24}
                  />
                </Button>
              </motion.div>
            </Space>
          </div>
        </Panel>
        <Panel
          header="SUI Wallets"
          key="3"
          extra={
            <Space direction={'horizontal'}>
              {suiWalletTypes
                .slice(
                  0,
                  showFull && activeKey === '3' ? suiWalletTypes.length : 4
                )
                .map((wallet, index) => (
                  <img
                    key={'sl-sui' + index}
                    onClick={(event) => {
                      // If you don't want click extra trigger collapse, you can prevent this:
                      event.stopPropagation();
                      setActiveKey(activeKey == 1 ? 0 : 1);
                    }}
                    src={wallet.iconUrl}
                    // alt={wallet.name}
                    style={{ maxWidth: 36, maxHeight: 36 }}
                    // height={24}
                    // width={24}
                  />
                ))}
            </Space>
          }
        >
          <div style={{ textAlign: 'center' }}>
            <Space
              direction={'vertical'}
              size={20}
              // style={{ width: "40%" }}
              className={'connect-wallet-buttons-container'}
            >
              {getSUIButtons()}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                // transition={{ duration: (walletKeys.length + 1) * 0.2 }}
              >
                <Button
                  block
                  shape={'round'}
                  onClick={onToggleVisibility}
                  style={{ justifyContent: 'center' }}
                >
                  Show {showFull ? 'fewer' : 'more'} options
                </Button>
              </motion.div>
            </Space>
          </div>
        </Panel>
        <Panel
          header="Email or Social Account"
          key="4"
          extra={genExtraSocial()}
        >
          <div style={{ textAlign: 'center' }}>
            <Space
              direction={'vertical'}
              size={20}
              // style={{ width: "40%" }}
              className={'connect-wallet-buttons-container'}
            >
              {getButtons(
                walletKeys.filter((key) => key.toLowerCase() == 'torus')
              )}
            </Space>
          </div>
        </Panel>
      </Collapse>
    </ConnectContainer>
  );
};
