import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  // Select,
  // Space,
} from 'antd';
import { HorizontalContainer } from '../index.styled';
import { SaleScheduleType } from '../../../../containers/assets/sale-schedule';
// import { SelectField } from '@/components/book/create-book/index.styled';
import {
  // SUPPORTED_NETWORKS,
  // SUPPORTED_NETWORKS_TO_LABELS,
} from '../../../../blockchain/evm/utils';
// import { CryptoIcons } from '../../../../blockchain/evm/utils/icons';
import React, { useEffect, useState } from 'react';
import { cleanInput } from '@/shared/utils';
// import { get } from 'lodash';

interface BuyNowProps {
  isAuction: boolean;
  disabled: boolean;
  scheduleType: SaleScheduleType;
  currentChainId?: string | number;
}
export const BuyNow = (props: BuyNowProps) => {
  const { isAuction, disabled, scheduleType, currentChainId } = props;
  const [chain, setChain] = useState<number | undefined>();

  // const onSetChain = (value: number) => setChain(value);

  useEffect(() => {
    //console.log('CURRENTCHAIN', currentChainId);
    if (currentChainId) setChain(Number(currentChainId));
  }, [currentChainId]);

  return (
    <>
      <Row gutter={15}>
        {/* <Col
          style={{
            display: scheduleType == SaleScheduleType.Resale ? 'none' : '',
          }}
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
        >
          <Form.Item
            label={'Blockchain'}
            rules={[{ required: false }]}
            name={'blockchain'}
            initialValue={chain}
          >
            <SelectField
              placeholder={
                SUPPORTED_NETWORKS_TO_LABELS.find(
                  (n: any) => String(n.value) == String(chain)
                )?.label ?? 'Select blockchain'
              }
              data-testid="blockchain"
              value={String(currentChainId)}
              onSelect={(value: any) => {
                onSetChain(value);
              }}

              // disabled
            >
              {SUPPORTED_NETWORKS_TO_LABELS.map((network) => {
                return (
                  <Select.Option key={network.value} value={network.value}>
                    <Space
                      direction={'horizontal'}
                      className={'meta-flex-j- w-100'}
                      size={10}
                      align={'center'}
                    >
                      <div className="meta-flex meta-flex-center">
                        {CryptoIcons[network.chain.toLowerCase()]}
                      </div>
                      <div>{network.label}</div>
                    </Space>
                  </Select.Option>
                );
              })}
            </SelectField>
          </Form.Item>
        </Col> */}

        <Col
          xs={24}
          sm={24}
          md={scheduleType != SaleScheduleType.Resale ? 16 : 24}
          lg={scheduleType != SaleScheduleType.Resale ? 16 : 24}
          xl={scheduleType != SaleScheduleType.Resale ? 16 : 24}
        >
          <Form.Item
            label="price"
            name="price"
            normalize={(value) => cleanInput(value)}
            rules={[{ required: true, message: 'Please enter the price!' }]}
          >
            <InputNumber
              // prefix={
              //   chain ? (
              //     <div style={{ width: 34, height: 24, paddingRight: 10 }}>
              //       {get(SUPPORTED_NETWORKS, [chain, 'usdToken', 'icon'])}
              //     </div>
              //   ) : (
              //     chain
              //   )
              // }
              data-testid={'input-N'}
              placeholder="Sell Price"
              disabled={disabled}
              min={0}
            />
          </Form.Item>
        </Col>
      </Row>

      <HorizontalContainer
        style={{
          display: scheduleType === SaleScheduleType.Resale ? 'none' : '',
        }}
      >
        <Form.Item
          label={<span className="label-text">Receiving Address</span>}
          name="recipient"
          // normalize={(value) => cleanInput(value)}
          // normalize={(value) =>
          //   isEmpty(value) ? '' : clamp(parseFloat(cleanInput(value)), 0, 10)
          // }
          rules={[
            {
              required: false,
              message: 'Please enter a Receiving Address!',
            },
            // { max: 10 },
          ]}
        >
          <Input
            data-testid={'royalty-on-sale'}
            placeholder="Royalty percentage"
            disabled={disabled || scheduleType === SaleScheduleType.Resale}
          />
        </Form.Item>
        {/* <Form.Item
          label="copies available"
          name="maxSupply"
          normalize={(value) => cleanInput(value)}
          rules={[
            { required: true, message: 'Please enter a maximum supply!' },
          ]}
          style={{ display: isAuction ? 'none' : '' }}
        >
          <Input
            placeholder="Enter number of copies"
            disabled={
              disabled || isAuction || scheduleType === SaleScheduleType.Resale
            }
          />
        </Form.Item> */}
      </HorizontalContainer>

      <HorizontalContainer>
        <Form.Item
          label="Start date/time"
          name="startDate"
          rules={[{ required: true, message: 'Please input a Date!' }]}
        >
          <DatePicker
            showTime
            disabled={disabled}
            disabledDate={(date) => date.isBefore(new Date())}
          />
        </Form.Item>
        <Form.Item
          label="End date"
          name="endDate"
          rules={[{ required: true, message: 'Please input a Date!' }]}
        >
          <DatePicker
            showTime
            disabled={disabled}
            disabledDate={(date) => date.isBefore(new Date())}
          />
        </Form.Item>
        {/*<Form.Item*/}
        {/*    label="duration"*/}
        {/*    name="duration"*/}
        {/*    rules={[{ required: true, message: 'Please input a Date!' }]}*/}
        {/*>*/}
        {/*    <DatePicker />*/}
        {/*</Form.Item>*/}
      </HorizontalContainer>
    </>
  );
};
