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
import { signRawTransaction } from 'src/blockchain/bitcoin';
import { StyledModal } from '@/components/layout/header/fullscreen-menu/index.styled';
import { UserNamespace } from '@/shared/namespaces/user';

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
  const [fees, setFees] = useState<Record<string, any>>();
  const [tip, setTip] = useState<number>(2.0);
  const [selectedFee, setSelectedFee] = useState<string>('medium');
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
          setFees(d);
          setLoading(false);
        },
        onError: (e) => {
          setLoading(false);
        },
      }
    );
  };
  const getCommitTx = () => {
    setLoading(true);
    makeApiRequest(
      `${APP_URL.assets.get_commit_tx}`,
      'post',
      {
        contractAddress,
        tokenId,
        chainId,
        fee: fees?.fees[selectedFee],
        tip: Number(form.getFieldValue('tip') ?? 0),
        stage: 'commit',
      },
      {
        onFinish: async (d) => {
          try {
            const seed = await unlockOrdinalWallet({
              walletAddress: String(account),
              user: String(user?._id),
            });
            console.log('DATATA', d.data);
            const signed = signRawTransaction(d.data.transaction, String(seed));
            console.log('dddd', signed);
            inscribe(d.data.id, signed);
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

  const inscribe = (id: string, signedCommitTransactionHex: string) => {
    setLoading(true);
    makeApiRequest(
      `${APP_URL.assets.inscribe}`,
      'post',
      {
        id,
        signedCommitTransactionHex,
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

  const feeDescriptions = {
    slow: 'Hours to Days',
    medium: 'An hour or more',
    fast: 'Less than an hour',
    custom: 'Based on amount',
  };
  useEffect(() => {
    if (visibility) getInscriptionFee();
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
                          Number(fees?.fees?.[speed]?.network_usd) +
                          fees?.fees?.[speed]?.platform_usd
                        ).toFixed(2)}
                      </Typography.Title>
                      {/* <Typography.Text><span  style={{fontSize: 10}}>Surcharge: ${fees?.fees?.[speed]?.platform_usd.toFixed(2)}</span></Typography.Text>  */}
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
                      initialValue={2}
                      label={'Tip Satoshi Studio ($)'}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
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
    <Space className={'w-100 meta-flex-j-f-e'} align={'center'}>
      <Button
        shape={'round'}
        type={'primary'}
        disabled={loading}
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
