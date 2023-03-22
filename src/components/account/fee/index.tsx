import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { isDesktop, isMobile } from 'react-device-detect';
import { useContext, useEffect, useState } from 'react';
import { useApiRequest } from 'src/hooks/useApiRequest';
import { APP_URL } from '@/shared/constants';
import { BaseWeb3Context } from 'src/blockchain/base';
import {
  getChangeAddresses,
  getOrdinalAddress,
  getOrdinalAddresses,
  getReceivingAddresses,
  signRawTransaction,
} from 'src/blockchain/bitcoin';
import { StyledModal } from '@/components/layout/header/fullscreen-menu/index.styled';
import { UserNamespace } from '@/shared/namespaces/user';
import { cleanInput } from '@/shared/utils';
import QRCode from 'react-qr-code';

interface GetFeeProps {
  contractAddress?: string;
  chainId?: string;
  onVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
  onPay: (data: Record<string, any>) => void;
  loading?: boolean;
  tokenId?: number;
  assetId?: string;
  user?: UserNamespace.User;
  account?: string;
}
export const GetFee = (props: GetFeeProps) => {
  const { makeApiRequest } = useApiRequest({ key: '@@fee-request' });
  const { unlockOrdinalWallet } = useContext(BaseWeb3Context);
  const {
    onVisibilityChange,
    visibility,
    tokenId,
    // onPay,
    chainId,
    contractAddress,
    user,
    account,
    //  queryingContract,
  } = props;
  const [loading, setLoading] = useState(false);
  const [feeData, setFeeData] = useState<Record<string, any>>();
  const [tip, setTip] = useState<string>('2');
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [lowBalance, setLowBalance] = useState<number>(0);
  const [selectedFee, setSelectedFee] = useState<string>('medium');
  const [loadWallet, setLoadWallet] = useState(false);
  let timeout: any = null;

  const getInscriptionFee = () => {
    setLoading(true);

    makeApiRequest(
      `${APP_URL.assets.get_inscription_fee}`,
      'post',
      {
        contractAddress,
        tokenId,
        chainId,
      },
      {
        onFinish: (d) => {
          // console.log('FEEES', d);
          setFeeData(d);
          setLoading(false);
          // if(timeout) {
          //   clearTimeout(timeout);
          // }
          if (visibility) {
            //   timeout = setTimeout(() => {
            //     console.log('making api request....');
            //   getInscriptionFee();
            // }, 20000);
          } else {
            if (timeout) clearTimeout(timeout);
          }
        },
        onError: (e) => {
          // if(timeout) {
          //   clearTimeout(timeout);
          //   timeout = null;
          // }
          // if (visibility && e) timeout = setTimeout(() => getInscriptionFee(), 10000);
          setLoading(false);
        },
      }
    );
  };
  const getCommitTx = async () => {
    setLoading(true);
    const seed = await unlockOrdinalWallet(String(account));
    const changeAddresses = await getChangeAddresses(seed);
    const ordinalAddress = await getOrdinalAddress(seed);
    console.log('DESTINATION', ordinalAddress);
    makeApiRequest(
      `${APP_URL.assets.get_commit_tx}`,
      'post',
      {
        contractAddress,
        tokenId,
        chainId,
        fee: feeData?.fees[selectedFee],
        tip: Number(cleanInput(tip ?? 0)),
        stage: 'commit',
        changeAddresses,
        destination: ordinalAddress,
      },
      {
        onFinish: async (d) => {
          try {
            const signed = signRawTransaction(d.data.transaction, seed);
            console.log('dddd', signed);
            inscribe(d.data.id, signed, ordinalAddress);
            // sign the error
          } catch (e) {
            console.log('ERRRORR', e);
          }
          setLoading(false);
        },
        onError: (e) => {
          setLoading(false);
        },
      }
    );
  };

  const inscribe = (
    id: string,
    signedCommitTransactionHex: string,
    destination?: string
  ) => {
    setLoading(true);
    makeApiRequest(
      `${APP_URL.assets.inscribe}`,
      'post',
      {
        id,
        signedCommitTransactionHex,
        destination,
      },
      {
        onFinish: async (d) => {
          console.log('post raw', d);
          setLoading(false);
        },
        onError: (e) => {
          setLoading(false);
        },
      }
    );
  };

  // const onFormValueChange = ((changes, formValues)=> {
  //   if(changes.tip) {
  //     setTip(changes.tip);
  //   }
  // })

  useEffect(() => {
    if (feeData?.unspent) {
      let balance = 0;
      feeData.unspent.forEach((d: any) => {
        if (d.amount * 100000000 > 10000) balance += d.amount;
      });
      console.log('fEEDAATA', feeData);
      setWalletBalance(balance);
    } // else setWalletBalance(0);
  }, [feeData?.unspent]);

  useEffect(() => {
    form.setFieldsValue({ tip: cleanInput(tip) });
    if (!feeData || !selectedFee) return;
    let tip_sat = 0;
    let tipUSD = Number(cleanInput(tip ?? 0));
    if (tipUSD > 0) {
      tip_sat = (tipUSD / feeData.btcPrice.usd) * 100000000;
    }
    setLowBalance(
      Math.max(
        feeData.fees?.[selectedFee].network_sat +
          tip_sat +
          feeData.fees?.[selectedFee].platform_sat -
          walletBalance * 100000000,
        0
      )
    );
    // if((feeData.fees?.[selectedFee].network_sat + tip_sat + feeData.fees?.[selectedFee].platform_sat)>(walletBalance*100000000)) {
    //   setLowBalance(true);
    // } else {
    //   setLowBalance(0)
    // }
  }, [walletBalance, selectedFee, tip]);

  const feeDescriptions = {
    slow: 'Hours to Days',
    medium: 'An hour or more',
    fast: 'Less than an hour',
    custom: 'Based on amount',
  };
  useEffect(() => {
    if (!visibility && timeout) clearInterval(timeout);
    if (visibility) {
      getInscriptionFee();
    }
  }, [visibility]);

  const [form] = Form.useForm();

  const header = (
    <div className="w-100 meta-flex meta-flex-center meta-flex-s-b">
      <Space size={10} align={'center'}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Choose Transaction Fee
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

  const componentBody = (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.08 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <Form
          form={form}
          onFinish={() => getCommitTx()}
          layout={'horizontal'}
          scrollToFirstError
          initialValues={{ tip: 2 }}
          requiredMark={false}
        >
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
          {!loading && (
            <>
              <Row style={{ textAlign: 'center' }}>
                {['slow', 'medium', 'fast'].map((speed: string) => (
                  <Col lg={{ span: 7, offset: 1 }} key={`speed${speed}`}>
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
                        padding: 14,
                        borderRadius: '15%',
                      }}
                      direction="vertical"
                    >
                      <Typography.Title style={{ color: 'grey' }} level={5}>
                        <strong>{speed}</strong>
                      </Typography.Title>
                      <Typography.Title level={3}>
                        $
                        {(
                          Number(feeData?.fees?.[speed]?.network_usd) +
                          feeData?.fees?.[speed]?.platform_usd
                        ).toFixed(2)}
                      </Typography.Title>
                      {/* <Typography.Text><span  style={{fontSize: 10}}>Surcharge: ${feeData?.fees?.[speed]?.platform_usd.toFixed(2)}</span></Typography.Text>  */}
                      <Typography.Text>
                        <span style={{ fontSize: 10 }}>
                          Service fee included
                        </span>
                      </Typography.Text>

                      <Typography.Text>
                        {feeDescriptions[speed]}
                      </Typography.Text>
                    </Space>
                  </Col>
                ))}
              </Row>
              <Row style={{ marginTop: 30 }}>
                <Col span={24} style={{ textAlign: 'center', padding: 30 }}>
                  <Space>
                    <Form.Item
                      name="tip"
                      initialValue={tip}
                      label={'Tip Satoshi Studio ($)'}
                    >
                      <Input onChange={(v) => setTip(v.target.value)} />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
              {lowBalance > 0 && (
                <Row>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <Typography.Text style={{ color: 'red' }}>
                      Low wallet btc balance!{' '}
                      <b>{(lowBalance / 100000000 + 0.00000001).toFixed(8)}</b>{' '}
                      more BTC required{' '}
                    </Typography.Text>
                  </Col>
                </Row>
              )}
              {lowBalance > 0 && !loadWallet && (
                <Button
                  shape={'round'}
                  type={'primary'}
                  disabled={loading || !lowBalance}
                  loading={loading}
                  onClick={() => setLoadWallet(!loadWallet)}
                >
                  Load Wallet
                </Button>
              )}
              {loadWallet && lowBalance > 0 && (
                <motion.div
                  initial={{ scale: 0.08 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                >
                  <Row>
                    <Col
                      span={24}
                      style={{ textAlign: 'center', marginBottom: 10 }}
                    >
                      {user?.btcAccounts?.[0]?.address}
                    </Col>
                    <Col span={24} style={{ textAlign: 'center' }}>
                      {' '}
                      <QRCode
                        size={256}
                        value={`bitcoin:${
                          user?.btcAccounts?.[0]?.address
                        }?amount=${(
                          lowBalance / 100000000 +
                          0.00000001
                        ).toFixed(8)}`}
                        viewBox={`0 0 256 256`}
                      />
                    </Col>
                  </Row>
                </motion.div>
              )}
            </>
          )}
          {/* <FeeForm
          form={form}
          offerToken={tipToken.symbol}
          offerTokenBalance={tipToken.balance as string}
          onFinish={onPay}
          onValuesChange={(changedValues) => {
            // //console.log(changedValues, value);
            if (
              changedValues['amount'] &&
              !(
                parseFloat(changedValues['amount']) >
                parseFloat(toEther(tipToken.balance))
              )
            ) {
              setTipAmountTyped(true);
            } else {
              setTipAmountTyped(false);
            }
          }}
        /> */}
        </Form>
      </motion.div>
    </AnimatePresence>
  );

  const footer = (
    <Space className={'w-100 meta-flex-s-b'} align={'center'}>
      <Space size={10}>
        <Typography.Text>
          Wallet Balance: <b>{walletBalance} BTC</b>
        </Typography.Text>
        {/* {lowBalance > 0 && <Button
          shape={'round'}
          type={'primary'}
          disabled={loading || !lowBalance}
          loading={loading}
          onClick={() => setLoadWallet(!loadWallet)}
        >
          Load Wallet
        </Button>} */}
      </Space>
      <Button
        shape={'round'}
        type={'primary'}
        disabled={loading || lowBalance > 0}
        loading={loading}
        onClick={form.submit}
      >
        Inscribe
      </Button>
    </Space>
  );
  return (
    <>
      {isDesktop && (
        <Modal
          title={header}
          visible={visibility}
          onCancel={() => onVisibilityChange(false)}
          destroyOnClose
          centered={isMobile}
          width={'45vw'}
          footer={footer}
        >
          {componentBody}
        </Modal>
      )}
      {isMobile && (
        <StyledModal
          title={header}
          centered
          visible={visibility}
          // onOk={() => setVisible(false)}
          onCancel={() => onVisibilityChange(false)}
          width={'100vw'}
          bodyStyle={{
            overflow: 'hidden',
            height: 'calc(100vh - 145px)',
            padding: 24,
            paddingTop: 5,
          }}
          mask={false}
          destroyOnClose
          footer={footer}
        >
          {componentBody}
        </StyledModal>
      )}
    </>
  );
};
