import {
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Space,
  TimePicker,
} from 'antd';
import {
  BIDDING_TOKENS,
  BiddingTokensInterface,
  toEther,
} from '../../../../blockchain/evm/utils';
import { get } from 'lodash';
import { add } from 'date-fns';
import BN from 'bn.js';
import Web3 from 'web3';
import { cleanInput, debugLog } from '@/shared/utils';
import { OFFER_EXPIRATION } from '@/shared/constants';
import { useState } from 'react';
// import { DatePicker, TimePicker } from '@/components';

// import { dynCryptoIconImport } from '@/shared/utils';

interface OfferFormProps extends FormProps {
  offerToken: string;
  offerTokenBalance: string;
  onOfferTokenChange: (value: BiddingTokensInterface) => void;
}

export const OfferForm = (props: OfferFormProps) => {
  const {
    offerToken,
    onOfferTokenChange,
    offerTokenBalance,
    form,
    ...formProps
  } = props;
  const tokenList = Object.values(BIDDING_TOKENS);
  const [pickerType, setPickerType] = useState<'date' | 'time'>('date');

  const onPickTypeChange = (value: 'date' | 'time') => {
    if (form) {
      debugLog('onPickTypeChange')(value);
      form.setFieldsValue({
        // expirationDate: new Date().toISOString(),
      });
    }

    setPickerType(value);
  };

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
        hideRequiredMark
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Offer amount"
              name={'amount'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your offer amount!',
                },
                () => ({
                  validator(_, value) {
                    if (
                      !value ||
                      new BN(new Web3().utils.toWei(cleanInput(value))).lte(
                        new BN(offerTokenBalance)
                      )
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Offer amount is greater than your balance.')
                    );
                  },
                }),
              ]}
              normalize={(value) => cleanInput(value)}
            >
              <Input
                style={{ width: '100%' }}
                placeholder="Enter Offer"
                addonBefore={
                  <Form.Item noStyle name={'token'}>
                    <Select
                      value={offerToken}
                      style={{ width: 120 }}
                      onSelect={(value: string) => {
                        onOfferTokenChange(
                          get(
                            BIDDING_TOKENS,
                            value,
                            BIDDING_TOKENS.WBNB
                          ) as BiddingTokensInterface
                        );
                      }}
                      bordered={false}
                    >
                      {tokenList.map((token) => (
                        <Select.Option key={token.address} value={token.symbol}>
                          <Space align={'center'} size={10}>
                            {/*{dynCryptoIconImport(token.icon)}*/}
                            <span
                              style={{
                                fontWeight: 500,
                                color: 'var(--heading-color)',
                              }}
                            >
                              {token.symbol}
                            </span>
                          </Space>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                }
              />
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

          <Col span={24}>
            <Form.Item label={'Offer Expiration'}>
              <Row gutter={20}>
                <Col md={24} sm={24} lg={8} xl={8}>
                  <Form.Item name={'expirationDuration'}>
                    <Select
                      placeholder="Select Expiration"
                      style={{ width: '100%' }}
                      options={OFFER_EXPIRATION}
                      onChange={(value: string | number) => {
                        onPickTypeChange(value === 0 ? 'date' : 'time');
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col md={24} sm={24} lg={16} xl={16}>
                  <Form.Item name={'expirationDate'}>
                    {pickerType === 'date' ? (
                      <DatePicker
                        placeholder="Set Custom Date"
                        format={'YYYY-MM-DD'}
                        style={{ width: '100%' }}
                        disabledDate={(current) => {
                          return (
                            current.isAfter(add(new Date(), { days: 30 })) ||
                            current.isBefore(new Date())
                          );
                        }}
                      />
                    ) : (
                      <TimePicker
                        placeholder="Set Expiration Time"
                        format={'HH:mm'}
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};
