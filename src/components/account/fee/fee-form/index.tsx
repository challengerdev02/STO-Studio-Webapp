import { Col, Form, FormProps, Input, Row, Space } from 'antd';
import { cleanInput, truncateEthAddress } from '@/shared/utils';
import { toEther } from '../../../../blockchain/evm/utils';

interface FeeFormProps extends FormProps {
  offerToken: string;
  offerTokenBalance: string;
}

export const FeeForm = (props: FeeFormProps) => {
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
        initialValues={{ tip: 2 }}
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
