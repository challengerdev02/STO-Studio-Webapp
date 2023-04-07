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
import {
  cleanInput,
  copyToClipboard,
  truncateEthAddress,
} from '@/shared/utils';
import {
  CheckCircleFilled,
  CopyFilled,
  PlusCircleFilled,
  PoweroffOutlined,
  SettingFilled,
} from '@ant-design/icons';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { isDesktop, isMobile } from 'react-device-detect';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { useEffect, useState, useContext } from 'react';
import { get, omit, toUpper } from 'lodash';
import { APP_TOKENS, toEther } from '../../../../blockchain/evm/utils';
import { ActionOption } from '../../../../redux/types';
import QRCode from 'react-qr-code';
import { createApiRequest } from '@/shared/utils/api';
import * as bitcoin from 'bitcoinjs-lib';
import { bip32 } from '@/shared/utils/secp';
import { BaseWeb3Context } from 'src/blockchain/base';
import axios from 'axios';
import { useAccount } from '@/hooks';
import { useApiRequest } from 'src/hooks/useApiRequest';
import {
  btcToDollar,
  calculateTransactionFee,
  constructTransferPsbt,
} from 'src/blockchain/bitcoin';

const { Psbt, payments } = bitcoin;
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
    process.env.NEXT_PUBLIC_BTC_TOKEN_SYMBOL as string
  );
  const [isHandle, setIsHandle] = useState('none');
  const [selectedFee, setSelectedFee] = useState<string>('medium');
  const [feeData, setFeeData] = useState<{
    fee: any;
    price: Record<string, number>;
  }>();
  const [amount, setAmount] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState<number>(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | undefined>();
  const [form] = Form.useForm();

  const { unlockOrdinalWallet } = useContext(BaseWeb3Context);
  const { getBtcFees } = useApiRequest({ key: '@@fee-request' });
  const handle = (val: string) => {
    setIsHandle(val);
    if (currentToken == 'BTC') return;
    // onAddFundVisibilityChange(true);
  };

  const {
    btcBalance,
    getBtcBalance,
    unspent: unspentTransactions,
  } = useAccount({ key: '@@btc-balance' });

  const getTransactionFee = (speed: string) => {
    return calculateTransactionFee(
      unspentTransactions.filter((d) => !d.isOrdinal)?.length ?? 0,
      2,
      Number(feeData?.fee[speed])
    );
  };

  useEffect(() => {
    setSent(undefined);
    setSending(false);
    getBtcBalance();
    setAddress('');
    form.resetFields();
  }, [user?.btcAccounts, isHandle]);

  useEffect(() => {
    if (isHandle == 'withdraw' || isHandle == 'ordinal') {
      getBtcFees().then((v) => setFeeData(v));
    }
  }, [isHandle]);
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
    if (user) onGetFundMeta();
    tokenBalance();
  }, [visibility, currentToken]);

  useEffect(() => {
    form.setFieldsValue({ amount });
  }, [amount]);

  useEffect(() => {
    if (isHandle == 'ordinal');
    setAmount('');
    form.setFieldsValue({ amount: '' });
  }, [isHandle]);

  const onGetFundMeta = () => {
    if (visibility && currentToken) {
      if (currentToken === process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL) {
        onGetHCOMIBalance();
        return;
      }
      console.log(currentToken);
      getFundMetadata(currentToken);
    }
  };

  const tokenBalance = async () => {
    var balanceData = '0';
    if (currentToken === process.env.NEXT_PUBLIC_HCOMI_TOKEN_SYMBOL) {
      balanceData = toEther(hComiBalance['balance'] ?? '0');
    } else if (currentToken === process.env.NEXT_PUBLIC_BTC_TOKEN_SYMBOL) {
      balanceData = String(btcBalance);
    } else if (currentToken === process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL) {
      balanceData = toEther(balanceObject['default'] ?? '0');
    } else {
      balanceData = toEther(
        balanceObject[get(APP_TOKENS, [currentToken, 'address'])] ?? '0'
      );
    }
    setBalance(parseFloat(balanceData));
  };

  const canSubmit = () => {
    if (isHandle == 'withdraw' && Number(amount ?? 0) == 0) return false;
    if (isHandle == 'withdraw' && Number(amount ?? 0) > btcBalance)
      return false;
    if (isHandle == 'ordinal' && !amount?.endsWith('i0')) return false;

    if (!address?.startsWith('bc1p')) return false;
    if (!selectedFee) return false;
    if (address == user?.btcAccounts?.[0]) return false;
    if (sending) return false;
    return true;
  };

  const constructPsbt = async (unspentInputs: any[], outputs?: any[]) => {
    try {
      const seed = await unlockOrdinalWallet(String(walletAddress));
      const transactionFee = getTransactionFee(selectedFee);
      const signed = constructTransferPsbt(
        seed,
        transactionFee,
        {
          amount: String(amount),
          to: String(address),
          changeAddress: String(user?.btcAccounts[0]?.address),
        },
        unspentInputs,
        outputs
      );

      createApiRequest({
        method: 'post',
        url: `/assets/broadcast-raw`,
        data: {
          rawTx: signed.hex,
        },
      })
        .then((response) => {
          console.log('SENT', response);
          setSent(signed.id);
          setSending(false);
        })
        .catch((e) => {
          console.log('EEEE', e);
          setSending(false);
          setSent(undefined);
        });
    } catch (e) {
      setSending(false);
      setSending(false);
      console.log(e);
    }
  };

  const sendProcess = async () => {
    setSending(true);
    if (isHandle === 'none') {
      return;
    }
    if (isHandle === 'withdraw') {
      constructPsbt(unspentTransactions.filter((d) => !d.isOrdinal));
    } else {
      createApiRequest({
        method: 'post',
        url: `/assets/send-ordinal`,
        data: {
          address: user?.btcAccounts?.[0]?.address,
          feeRate: feeData?.fee?.[selectedFee],
          ordinalId: isHandle === 'ordinal' ? amount : undefined,
        },
      })
        .then((response) => {
          console.log(response, 'response');
          const unspentInputs: any[] = response.data.input.map((d: any) => {
            if (!d.txid) {
              d = {
                ...d,
                ...unspentTransactions.find((dd) => dd.txid == d.hash),
              };
            }
            return d;
          });
          constructPsbt(unspentInputs, response.data.output);
        })
        .catch((e) => {
          setSending(false);
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
        loading={sending}
        disabled={!canSubmit()}
        shape={'round'}
        type={'primary'}
        onClick={() => sendProcess()}
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
              <GradientAvatar
                size={36}
                value={walletAddress ?? 'Satoshi Studio'}
              />
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
                      {balance}
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
          onClick={() => handle(isHandle == 'deposit' ? 'none' : 'deposit')}
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
                <Space size={2}>
                  {truncateEthAddress(user?.btcAccounts?.[0]?.address)}
                  <Button
                    onClick={() =>
                      copyToClipboard(user?.btcAccounts?.[0]?.address)
                    }
                    type="link"
                  >
                    <CopyFilled />
                  </Button>
                </Space>
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
              {!sent && (
                <motion.div
                  initial={{ scale: 0.08 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                >
                  <Form
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    // onFinish={() => getCommitTx()}
                    layout={'horizontal'}
                    scrollToFirstError
                    initialValues={{ amount: undefined }}
                    requiredMark={false}
                  >
                    <Row style={{ marginTop: 10 }} justify="space-between">
                      <Col span={24}>
                        <Form.Item
                          shouldUpdate={(prevValues, curValues) =>
                            prevValues.amount !== curValues.amount
                          }
                          name="amount"
                          label={
                            isHandle === 'withdraw'
                              ? 'Amount'
                              : 'Inscription Id'
                          }
                          initialValue={amount}
                        >
                          {isHandle === 'withdraw' && (
                            <Space>
                              <Input
                                value={amount}
                                onChange={(v) =>
                                  setAmount(cleanInput(v.target.value))
                                }
                                style={{ maxWidth: 300 }}
                              />
                              Balance:{' '}
                              <Button
                                style={{ padding: 0, margin: 0 }}
                                onClick={() => {
                                  setAmount(String(btcBalance));
                                }}
                                type="link"
                              >
                                {btcBalance}
                              </Button>
                              BTC
                            </Space>
                          )}
                          {isHandle === 'ordinal' && (
                            <Input
                              value={amount}
                              onChange={(v) => setAmount(v.target.value)}
                              style={{ maxWidth: 300 }}
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={24}>
                        <Form.Item
                          name="address"
                          label="Receiving Address"
                          initialValue={address}
                        >
                          <Input
                            placeholder="bc1p..."
                            style={{ maxWidth: 300 }}
                            onChange={(v) => setAddress(v.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between" align="middle">
                      <Col span={24}>
                        <Form.Item label="Fee Rate">
                          <Space direction="horizontal">
                            {['slow', 'medium', 'fast'].map(
                              (speed: string, index) => (
                                <div style={{ width: 130 }}>
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
                                      minWidth: '200 !important',
                                      cursor: 'pointer',
                                      padding: 8,
                                      borderRadius: '15%',
                                      textAlign: 'center',
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
                                      $
                                      {btcToDollar(
                                        getTransactionFee(speed) ?? 0,
                                        Number(feeData?.price?.usd ?? 0)
                                      ).toFixed(2)}
                                    </Typography.Title>
                                    <Typography.Text>
                                      <span style={{ fontSize: 10 }}>
                                        Service fee included
                                      </span>
                                    </Typography.Text>

                                    <Typography.Text style={{ fontSize: 12 }}>
                                      {feeDescriptions[index]}
                                    </Typography.Text>
                                  </Space>
                                </div>
                              )
                            )}
                          </Space>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </motion.div>
              )}
              {sent && (
                <motion.div
                  initial={{ scale: 0.08 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                >
                  <Row style={{ textAlign: 'center' }}>
                    <Col span={24} style={{ textAlign: 'center', padding: 30 }}>
                      <Space direction="vertical" size={20}>
                        <CheckCircleFilled style={{ fontSize: '2.5em' }} />
                        {/* <Typography.Text>Commit Transaction</Typography.Text>
                <Typography.Text style={{ color: '#fff' }}>
                  <b>{ordinalData?.commitTx}</b>
                </Typography.Text> */}
                        <Typography.Text>
                          <b>Transaction has been sent!</b>
                        </Typography.Text>
                        <Space size={1} direction="vertical">
                          <Typography.Text>Transaction Id</Typography.Text>
                          <Space size={2}>
                            <Typography.Text style={{ color: '#fff' }}>
                              <b>{sent}</b>
                            </Typography.Text>
                            <Button
                              onClick={() => copyToClipboard(sent)}
                              type="link"
                            >
                              <CopyFilled />
                            </Button>
                          </Space>
                        </Space>
                      </Space>
                    </Col>
                  </Row>
                </motion.div>
              )}
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
