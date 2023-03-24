import {
  Avatar,
  Button,
  Col,
  Row,
  Card,
  DrawerProps,
  Select,
  Skeleton,
  Input,
  Space,
  Typography,
  Form,
  Modal,
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
import { motion, AnimatePresence } from 'framer-motion';
import { isDesktop, isMobile } from 'react-device-detect';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { useEffect, useState } from 'react';
import { get, omit, toUpper } from 'lodash';
import { APP_TOKENS, toEther } from '../../../../blockchain/evm/utils';
import { ActionOption } from '../../../../redux/types';
import QRCode from 'react-qr-code';
import { createApiRequest } from '@/shared/utils/api';
import * as bitcoin from 'bitcoinjs-lib';
import { bip32, ECPair } from '@/shared/utils/secp';

const { Psbt } = bitcoin;
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
  const [isHandle, setIsHandle] = useState('none');
  const [selectedFee, setSelectedFee] = useState<string>('medium');
  // const [feeData, setFeeData] = useState<Record<string, any>>();
  const [amount, setAmount] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [form] = Form.useForm();
  const handle = (val: string) => {
    setIsHandle(val);
    if (currentToken == 'BTC') return;
    // onAddFundVisibilityChange(true);
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

  const feeDescriptions = [
    'Hours to Days',
    'An hour or more',
    'Less than an hour',
    'Based on amount',
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

  // const defaultToken = {
  //   key: process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL as string,
  //   label: process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL as string,
  //   value: process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL as string,
  // };

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

  const sendProcess = (handleVal: string) => {
    if (handleVal === 'none') {
      return;
    }
    if (handleVal === 'withdraw') {
      createApiRequest({
        method: 'post',
        url: `/assets/send-btc`,
        data: {
          address: user?.btcAccounts?.[0]?.address,
          amount,
          feeRate: '15',
        },
      }).then((response) => {
        console.log(response, 'response');
        constructPsbt(response.data);
      });
    } else if (handleVal === 'ordinal') {
      createApiRequest({
        method: 'post',
        url: `/assets/send-btc`,
        data: {
          address: user?.btcAccounts?.[0]?.address,
          ordinalId: amount,
          feeRate: '15',
        },
      }).then((response) => {
        console.log(response, 'response');
        constructPsbt(response.data);
      });
    }
  };

  const constructPsbt = async (unspent: any) => {
    const psbt = new Psbt();
    psbt.setVersion(1);
    psbt.setLocktime(0);
    const tweakedChildNodes = [];
    var childNode;
    const keyPair = ECPair.fromWIF('private_key...');
    if (keyPair.privateKey) {
      const chainCode = bip32.fromSeed(keyPair.privateKey).chainCode;
      const node = bip32.fromPrivateKey(keyPair.privateKey, chainCode);
      console.log('BIP32 extended private key:', node.toBase58());

      for (var i = 0; i < unspent.length; i++) {
        if (user?.btcAccounts?.[0]?.address === unspent[i].address) {
          const path = `m${unspent[i].desc.slice(
            12,
            unspent[i].desc.search(']')
          )}`;
          childNode = node.derivePath(path);
          if (childNode.privateKey) {
            tweakedChildNodes.push(unspent[i].vout);

            psbt.addInput({
              index: unspent[i].vout,
              hash: Buffer.from(unspent[i].txid, 'hex').reverse(),
              witnessUtxo: {
                script: Buffer.from(unspent[i].scriptPubKey, 'hex'),
                value: Number((unspent[i].amount * 100000000).toFixed(0)),
              },
            });
          }
        }
      }

      psbt.addOutput({
        address: String(address),
        value: Number((Number(amount) * 100000000).toFixed(0)),
      });

      for (const tweakedChildNode of tweakedChildNodes) {
        psbt.signInput(tweakedChildNode, keyPair);
      }

      psbt.finalizeAllInputs();

      const signed = psbt.extractTransaction(true);
      createApiRequest({
        method: 'post',
        url: `/assets/broadcast-raw`,
        data: {
          rawTx: signed.toHex(),
        },
      }).then((response) => {
        console.log(response, 'response');
      });
    }
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
      <Button
        shape={'round'}
        type={'primary'}
        onClick={() => sendProcess(isHandle)}
      >
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
          shape={'round'}
          onClick={() => handle('deposit')}
          style={{ marginBottom: 10 }}
        >
          ADD {currentToken}
        </Button>

        {isHandle === 'deposit' && (
          <motion.div
            initial={{ scale: 0.08 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            style={{ marginBottom: 10 }}
          >
            <Row>
              <Col span={24} style={{ textAlign: 'center', marginBottom: 10 }}>
                {user?.btcAccounts?.[0]?.address}
              </Col>
              <Col span={24} style={{ textAlign: 'center' }}>
                {' '}
                <QRCode
                  value={`bitcoin:${user?.btcAccounts?.[0]?.address}?amount=${(
                    100000000 / 100000000 +
                    0.00000001
                  ).toFixed(8)}`}
                />
              </Col>
            </Row>
          </motion.div>
        )}

        <Button
          type={'primary'}
          block
          shape={'round'}
          onClick={() => handle('withdraw')}
          style={{ marginBottom: 10 }}
        >
          WITHDRAW {currentToken}
        </Button>

        {(isHandle === 'withdraw' || isHandle === 'ordinal') && (
          <Modal
            title={header}
            visible={visibility}
            onCancel={() => handle('none')}
            destroyOnClose
            centered={isMobile}
            width={'50vw'}
            footer={footer}
          >
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0.08 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <Form
                  form={form}
                  // onFinish={() => getCommitTx()}
                  layout={'horizontal'}
                  scrollToFirstError
                  initialValues={{ amount: undefined }}
                  requiredMark={false}
                >
                  <Row style={{ marginTop: 10 }} justify="space-between">
                    <Col span={6}>
                      <Row justify="end" align="middle">
                        <Typography.Text
                          style={{ fontSize: 16, textAlign: 'right' }}
                        >
                          {isHandle === 'withdraw' && 'Amount'}
                          {isHandle === 'ordinal' && 'Ordinal Id'}:
                        </Typography.Text>
                      </Row>
                    </Col>
                    <Col span={17}>
                      <Form.Item name="amount" initialValue={amount}>
                        <Input onChange={(e) => setAmount(e.target.value)} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col span={6}>
                      <Row justify="end">
                        <Typography.Text style={{ fontSize: 16 }}>
                          Receiving Address:
                        </Typography.Text>
                      </Row>
                    </Col>
                    <Col span={17}>
                      <Form.Item name="address" initialValue={address}>
                        <Input onChange={(v) => setAddress(v.target.value)} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="space-between" align="middle">
                    <Col span={6}>
                      <Row justify="end">
                        <Typography.Text style={{ fontSize: 16 }}>
                          Fee Rates:
                        </Typography.Text>
                      </Row>
                    </Col>
                    <Col span={17}>
                      <Row
                        style={{ textAlign: 'center' }}
                        justify="space-between"
                      >
                        {['slow', 'medium', 'fast'].map(
                          (speed: string, index) => (
                            <Col lg={{ span: 7.5 }} key={`speed${speed}`}>
                              <Space
                                onClick={() => setSelectedFee(speed)}
                                size={1}
                                style={{
                                  border: '2px solid',
                                  borderColor:
                                    selectedFee == speed
                                      ? 'rgba(55, 73, 233, 1)'
                                      : '#eeeeeedf',
                                  width: '100%',
                                  cursor: 'pointer',
                                  padding: 8,
                                  borderRadius: '15%',
                                }}
                                direction="vertical"
                              >
                                <Typography.Title
                                  style={{ color: 'grey' }}
                                  level={5}
                                >
                                  <strong>{speed}</strong>
                                </Typography.Title>
                                <Typography.Title level={3}>
                                  $2.46
                                </Typography.Title>
                                <Typography.Text>
                                  <span style={{ fontSize: 10 }}>
                                    Service fee included
                                  </span>
                                </Typography.Text>

                                <Typography.Text>
                                  {feeDescriptions[index]}
                                </Typography.Text>
                              </Space>
                            </Col>
                          )
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </motion.div>
            </AnimatePresence>
          </Modal>
        )}

        <Button
          type={'primary'}
          block
          shape={'round'}
          onClick={() => handle('ordinal')}
        >
          SEND ORDINALS
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
