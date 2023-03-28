import {
  Avatar,
  Button,
  Card,
  DrawerProps,
  Select,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import { StyledCard, StyledDrawer } from './index.styled';
import { truncateEthAddress } from '@/shared/utils';
import {
  CopyFilled,
  PlusCircleFilled,
  PoweroffOutlined,
  SettingFilled,
} from '@ant-design/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { isDesktop } from 'react-device-detect';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { useEffect, useState } from 'react';
import { get, omit, toUpper } from 'lodash';
import { APP_TOKENS, toEther } from '../../../../blockchain/evm/utils';
import { ActionOption } from '../../../../redux/types';

const { Title, Paragraph } = Typography;
const { Meta } = Card;
interface BalanceDrawerProps extends DrawerProps {
  getBalance: (contractAddress?: string, options?: ActionOption) => void;
  walletAddress: string;
  onVisibilityChange: (visible: boolean) => void;
  onAddFundVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
  onDisconnectWallet: () => void;
  avatarURL?: string;
  balanceObject: Record<string, any>;
  isGettingBalance?: boolean;
  isGettingHComiBalance?: boolean;
  onGetHCOMIBalance: () => void;
  hComiBalance: Record<string, any>;
  user: any;
}

export const BalanceDrawer = (props: BalanceDrawerProps) => {
  const {
    getBalance,
    walletAddress,
    onVisibilityChange,
    visibility,
    onDisconnectWallet,
    onAddFundVisibilityChange,
    avatarURL,
    balanceObject,
    isGettingBalance,
    hComiBalance,
    onGetHCOMIBalance,
    isGettingHComiBalance,
    user,
    ...rest
  } = props;

  const [currentToken, setCurrentToken] = useState<string>(
    process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL as string
  );

  const addFund = () => {
    if (currentToken == 'hCOMI') return;
    onAddFundVisibilityChange(true);
  };

  const links = [
    {
      label: 'Create',
      href: '/assets/create',
      icon: <PlusCircleFilled />,
    },
    {
      label: 'Profile',
      href: '/account',
      icon: <i className={'mc-user-fill mc-1x'} />,
    },
    {
      label: 'Profile Settings',
      href: '/account/settings',
      icon: <SettingFilled />,
    },
    {
      label: 'Logout',
      href: null,
      icon: <PoweroffOutlined />,
      onClick() {
        onVisibilityChange(false);
        onDisconnectWallet();
      },
    },
  ];

  const getFundMetadata = (currentToken: string) => {
    if (currentToken === process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL) {
      getBalance();
      return;
    }

    getBalance(get(APP_TOKENS, [currentToken, 'address']));
  };

  const onUpdateToken = (token: string) => {
    setCurrentToken(() => {
      return token;
    });
  };

  const defaultToken = {
    key: process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL as string,
    label: process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL as string,
    value: process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL as string,
  };

  const tokenList = [
    ...Object.keys(APP_TOKENS).map((token) => ({
      key: toUpper(token),
      label: toUpper(token),
      value: token,
    })),
    // defaultToken,
  ];

  useEffect(() => {
    console.log('USERRRR', user);
    if (user) onGetFundMeta();
  }, [visibility, currentToken]);

  const onGetFundMeta = () => {
    if (visibility && currentToken) {
      if (currentToken === process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL) {
        onGetHCOMIBalance();
        return;
      }
      getFundMetadata(currentToken);
    }
  };

  const tokenBalance = () => {
    if (currentToken === process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL) {
      return toEther(hComiBalance['balance'] ?? '0');
    }
    if (currentToken === process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL) {
      return toEther(balanceObject['default'] ?? '0');
    }
    return toEther(
      balanceObject[get(APP_TOKENS, [currentToken, 'address'])] ?? '0'
    );
  };

  const constructPsbt = async (unspent: any) => {
    const seed = await unlockOrdinalWallet(String(walletAddress));
    const node = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
    const psbt = new Psbt();
    psbt.setVersion(2);
    psbt.setLocktime(0);
    const tweakedChildNodes = [];

    for (var i = 0; i < unspent.length; i++) {
      if (unspent[i].address == walletAddress) {
        var child: any, childNodeXOnlyPubkey, tweakedChildNode, p2pktr;
        
        const path = `m${unspent[i].desc.slice(
          12,
          unspent[i].desc.search(']')
        )}`;

        child = node.derivePath(path);
        childNodeXOnlyPubkey = child.publicKey.slice(1, 33);
        p2pktr = payments.p2tr({
          internalPubkey: childNodeXOnlyPubkey,
          network: bitcoin.networks.bitcoin,
        });

        tweakedChildNode = child.tweak(
          bitcoin.crypto.taggedHash('TapTweak', childNodeXOnlyPubkey)
        );
        tweakedChildNodes.push(tweakedChildNode);

        if (isHandle === 'withdraw') {
          psbt.addInput({
            index: unspent[i].vout,
            hash: Buffer.from(unspent[i].txid, 'hex').reverse(),
            witnessUtxo: {
              script: p2pktr?.output!,
              value: Number((unspent[i].amount * 100000000).toFixed(0)),
            },
            tapInternalKey: childNodeXOnlyPubkey,
          });
        } else if (isHandle === 'ordinal') {
          const sequenceBuffer = Buffer.alloc(4 * 2);
          sequenceBuffer.writeUInt32LE(Number(amount) & 0xffffffff, 0);
          sequenceBuffer.writeUInt32LE(Number(amount) >>> 32, 4);
          const sequence = sequenceBuffer.readUInt32LE(0);
  
          psbt.addInput({
            index: unspent[i].vout,
            hash: Buffer.from(unspent[i].txid, 'hex').reverse(),
            witnessUtxo: {
              script: p2pktr?.output!,
              value: Number((unspent[i].amount * 100000000).toFixed(0)),
            },
            sequence: sequence,
            tapInternalKey: childNodeXOnlyPubkey,
          });
        }
      }
    }

    if (isHandle === 'withdraw') {
      psbt.addOutput({
        address: String(address),
        value: Number((Number(amount) * 100000000).toFixed(0)),
      });
    } else if (isHandle === 'ordinal') {
      psbt.addOutput({
        address: String(address),
        value: 0,
      });
    }

    for (const tweakedChildNode of tweakedChildNodes) {
      psbt.signTaprootInput(0, tweakedChildNode);
    }

    psbt.finalizeAllInputs();

    const signed = psbt.extractTransaction(true).toHex();
    console.log(signed);
    createApiRequest({
      method: 'post',
      url: `/assets/broadcast-raw`,
      data: {
        rawTx: signed,
      },
    }).then((response) => {
      console.log(response, 'response');
    });
  };

  const header = (
    <div className="w-100 meta-flex meta-flex-center meta-flex-s-b">
      <Space size={10} align={'center'}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {isHandle === 'withdraw' && 'Withdraw BTC'}
          {isHandle === 'ordinal' && 'Send Ordinals'}
        </Typography.Title>
      </Space>
      {isMobile && (
        <Space
          align={'center'}
          size={15}
          className="button-list-mobile mobile-list-desktop"
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              className="toggle-menu"
              type="default"
              shape={'circle'}
              size={'small'}
              onClick={() => onVisibilityChange(false)}
              icon={<i className="mc-close-line" />}
            />
          </motion.div>
        </Space>
      )}
    </div>
  );

  const footer = (
    <Space className={'w-100 meta-flex-s-b'} align={'center'}>
      <Space size={10}>
        <Typography.Text></Typography.Text>
      </Space>
      <Button shape={'round'} type={'primary'} onClick={() => sendProcess()}>
        SEND
      </Button>
    </Space>
  );

  return (
    <StyledDrawer
      title={null}
      placement={'bottom'}
      width={500}
      onClose={() => onVisibilityChange(false)}
      visible={visibility}
      height={'62vh'}
      destroyOnClose
      bodyStyle={{
        height: '62vh',
        padding: 24,
      }}
      data-testid={'styled-drawer-container'}
      borderRadius={isDesktop ? '0' : undefined}
      {...omit(rest, ['getTokenName'])}
    >
      <Space className={'w-100 meta-flex-s-b'} align={'center'}>
        <Space align={'center'} size={10}>
          <Avatar
            size={36}
            icon={
              <GradientAvatar size={36} value={walletAddress ?? 'Metacomics'} />
            }
            src={avatarURL}
          />
          <Title level={5} style={{ color: 'var(--text-color-secondary)' }}>
            <Space direction={'vertical'}>
              <span>Your Wallet</span>
              <Paragraph
                copyable={{
                  text: walletAddress,
                  icon: (
                    <CopyFilled
                      style={{
                        paddingLeft: 5,
                        color: 'var(--text-color-secondary)',
                      }}
                    />
                  ),
                  tooltips: false,
                }}
              >
                <Title level={5} style={{ display: 'inline-block' }}>
                  {truncateEthAddress(walletAddress ?? 'N/A')}
                </Title>
              </Paragraph>
            </Space>
          </Title>
        </Space>

        {/*<Paragraph*/}
        {/*  copyable={{*/}
        {/*    text: walletAddress,*/}
        {/*    icon: (*/}
        {/*      <CopyFilled*/}
        {/*        style={{ paddingLeft: 5, color: 'var(--text-color-secondary)' }}*/}
        {/*      />*/}
        {/*    ),*/}
        {/*    tooltips: false,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Title level={4} style={{ display: 'inline-block' }}>*/}
        {/*    {truncateEthAddress(walletAddress ?? 'N/A')}*/}
        {/*  </Title>*/}
        {/*</Paragraph>*/}
      </Space>
      <br />
      <br />
      <StyledCard
        size="default"
        title={null}
        style={{ width: '100%', borderRadius: 12 }}
      >
        <Skeleton loading={false} active>
          <Meta
            avatar={null}
            title={
              <div className="w-100 meta-flex meta-flex-center meta-flex-col">
                <Title
                  level={5}
                  style={{ color: 'var(--text-color-secondary)' }}
                >
                  Total Balance
                </Title>
                <Title level={3}>
                  <Space size={0}>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      {tokenBalance()}
                    </motion.span>
                    <Select
                      value={toUpper(currentToken)}
                      style={{ width: 150 }}
                      bordered={false}
                      options={tokenList}
                      disabled={isGettingBalance || isGettingHComiBalance}
                      loading={isGettingBalance || isGettingHComiBalance}
                      className={'balance-token-selection'}
                      onSelect={onUpdateToken}
                    />
                  </Space>
                </Title>
              </div>
            }
          />
        </Skeleton>
        <br />

        <Button
          type={'primary'}
          block
          disabled={true}
          shape={'round'}
          onClick={() => addFund(true)}
          style={{ marginBottom: 10 }}
        >
          Add {currentToken} (Coming Soon)
        </Button>

        <Button
          disabled={true}
          type={'primary'}
          block
          shape={'round'}
          onClick={() => onAddFundVisibilityChange(true)}
        >
          Withdraw {currentToken} (Coming Soon)
        </Button>
      </StyledCard>
      <br />
      <br />
      <Space
        direction={'vertical'}
        size={20}
        className={'balance-drawer-links'}
      >
        {links.map((link, index) => {
          return (
            <div key={`@@balance-links:${index}`}>
              {link.href && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (index + 1) * 0.1,
                    type: 'spring',
                    damping: 8,
                  }}
                >
                  <Link passHref href={link.href}>
                    <a
                      className="list-item"
                      role="link"
                      onClick={
                        link.onClick
                          ? link.onClick
                          : () => onVisibilityChange(false)
                      }
                    >
                      <Space size={10}>
                        {link.icon && link.icon}
                        <span>{link.label}</span>
                      </Space>
                    </a>
                  </Link>
                </motion.div>
              )}
              {!link.href && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (index + 1) * 0.1,
                    type: 'spring',
                    damping: 8,
                  }}
                >
                  <a
                    className="list-item"
                    role="link"
                    onClick={
                      link.onClick
                        ? link.onClick
                        : () => onVisibilityChange(false)
                    }
                  >
                    <Space size={10}>
                      {link.icon && link.icon}
                      <span>{link.label}</span>
                    </Space>
                  </a>
                </motion.div>
              )}
            </div>
          );
        })}
      </Space>
    </StyledDrawer>
  );
};
