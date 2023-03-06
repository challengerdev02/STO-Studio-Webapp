import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { isDesktop, isMobile } from 'react-device-detect';
import { StyledModal } from '@/components/layout/header/fullscreen-menu/index.styled';
import { cleanInput, truncateEthAddress } from '@/shared/utils';
import { toEther } from '../../../blockchain/evm/utils';
import Link from 'next/link';
import { useState } from 'react';

interface TipAccountProps {
  username: string;
  walletAddress?: string;
  onVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
  onTip: (data: Record<string, any>) => void;
  loading?: boolean;
  tipToken: Record<string, any> & { balance: string };
  queryingContract: boolean;
}
export const TipAccount = (props: TipAccountProps) => {
  const {
    username,
    onVisibilityChange,
    visibility,
    onTip,
    tipToken,
    loading,
    queryingContract,
  } = props;
  const [form] = Form.useForm();
  const [tipAmountTyped, setTipAmountTyped] = useState(false);

  const header = (
    <div className="w-100 meta-flex meta-flex-center meta-flex-s-b">
      <Space size={10} align={'center'}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Tip <Link href={`/${username}`}>{truncateEthAddress(username)}</Link>
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
        <TipForm
          form={form}
          offerToken={tipToken.symbol}
          offerTokenBalance={tipToken.balance as string}
          onFinish={onTip}
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
        />
      </motion.div>
    </AnimatePresence>
  );

  const footer = (
    <Space className={'w-100 meta-flex-j-f-e'} align={'center'}>
      <Button
        shape={'round'}
        type={'primary'}
        disabled={
          queryingContract ||
          loading ||
          tipToken.balance === '0' ||
          !tipToken.balance ||
          !tipAmountTyped
        }
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

interface TipFormProps extends FormProps {
  offerToken: string;
  offerTokenBalance: string;
}

export const TipForm = (props: TipFormProps) => {
  const { offerToken, offerTokenBalance, form, ...formProps } = props;

  return (
    <Space
      size={30}
      direction={'vertical'}
      className="bidding-container w-100"
      // align={'center'}
    >
      <Form
        {...formProps}
        form={form}
        layout={'vertical'}
        scrollToFirstError
        requiredMark={false}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Amount"
              name={'amount'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your tip!',
                },
                // () => ({
                //   validator(_, value) {
                //     if (
                //       !value ||
                //       new BN(new Web3().utils.toWei(cleanInput(value))).lte(
                //         new BN(offerTokenBalance)
                //       )
                //     ) {
                //       return Promise.resolve();
                //     }
                //     return Promise.reject(
                //       new Error('Tip is greater than your balance.')
                //     );
                //   },
                // }),
              ]}
              normalize={(value) => cleanInput(value)}
            >
              <Input style={{ width: '100%' }} placeholder="Enter Amount" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space
              align={'center'}
              className={'w-100 meta-flex-j-f-e'}
              style={{ fontWeight: 500 }}
            >
              Available: {toEther(offerTokenBalance ?? '0')}
              {offerToken}
            </Space>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};
