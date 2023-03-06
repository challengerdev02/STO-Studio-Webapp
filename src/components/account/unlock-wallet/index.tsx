import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { isDesktop, isMobile } from 'react-device-detect';
import { StyledModal } from '@/components/layout/header/fullscreen-menu/index.styled';

import { useContext, useEffect, useState } from 'react';
import { useApiRequest } from 'src/hooks/useApiRequest';

import { LoadingOutlined } from '@ant-design/icons';
import { useAccount } from '@/hooks';
import { loadWallet } from 'src/blockchain/bitcoin';
import { BaseWeb3Context } from 'src/blockchain/base';

interface UnlockProps {
  contractAddress?: string;
  onVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
  onUnlockWallet: (wallet: any) => void;
  loading?: boolean;
}
export const UnlockWallet = (props: UnlockProps) => {
  const { makeApiRequest } = useApiRequest({ key: '@@fee-request' });
  const { accounts } = useContext(BaseWeb3Context);
  const { visibility, onVisibilityChange, onUnlockWallet, address } = props;

  const accountKey = '@@user-account';
  const { user, setPassphrase } = useAccount({
    key: accountKey,
    autoFetch: true,
  });

  const [loading, setLoading] = useState(false);
  const unlockWallet = () => {
    setLoading(true);
    if (accounts?.[0] && form.getFieldValue('password')) {
      try {
        const privateKey = loadWallet(
          accounts?.[0],
          form.getFieldValue('password')
        );
        onUnlockWallet({});
      } catch (e) {
        console.log(e.message);
      }
      setLoading(false);
    }
  };

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
          onFinish={() => unlockWallet()}
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
              <Row style={{ marginTop: 30 }}>
                <Col span={24} style={{ textAlign: 'center', padding: 30 }}>
                  <Space>
                    <Form.Item
                      name="password"
                      initialValue={2}
                      label={'Enter wallet password'}
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
        Continue
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
