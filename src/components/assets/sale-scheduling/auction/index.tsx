import { DatePicker, Form, InputNumber } from 'antd';
import { HorizontalContainer } from '../index.styled';
// import { SUPPORTED_NETWORKS_TO_LABELS } from '@/web3/utils';
// import { useState } from 'react';

export const Auction = () => {
  // const [chain, setChain] = useState<string | undefined>();
  return (
    <>
      <Form.Item
        label={`Price`}
        name="price"
        rules={[{ required: true, message: 'Please input a number!' }]}
      >
        <InputNumber
          type={'number'}
          step={0.01}
          placeholder="Number of ethers"
          data-testid="price"
        />
      </Form.Item>
      <HorizontalContainer>
        <Form.Item
          label={
            <span className="label-text">
              Royalty on <label>book</label> sale (%)
            </span>
          }
          name="royaltyOnBookSale"
          extra="This is the amount you get whenever a book is sold"
          rules={[{ required: true, message: 'Please input a number!' }]}
        >
          <InputNumber
            min={0}
            max={100}
            type={'number'}
            // formatter={(value) => `${value}%`}
            step={0.01}
            placeholder="Royalty percentage"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="label-text">
              Royalty on <label>SCENE</label> sale (%)
            </span>
          }
          extra="This is the amount you get whenever a book is sold"
          name="royaltyOnSceneSale"
          rules={[{ required: true, message: 'Please input a number!' }]}
        >
          <InputNumber
            min={0}
            max={100}
            type={'number'}
            // formatter={(value) => `${value}%`}
            step={0.01}
            placeholder="Royalty percentage"
          />
        </Form.Item>
      </HorizontalContainer>

      <HorizontalContainer>
        <Form.Item
          className="half-row"
          label="copies available"
          name="copiesAvailable"
          rules={[{ required: true, message: 'Please input a number!' }]}
        >
          <InputNumber
            type={'number'}
            min={1}
            data-testid="copies"
            placeholder="Enter number of copies"
          />
        </Form.Item>
        <span className="ant-row half-row" />
      </HorizontalContainer>

      <HorizontalContainer>
        <Form.Item
          label="start date"
          name="startDate"
          rules={[{ required: true, message: 'Please input a Date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="duration"
          name="duration"
          rules={[{ required: true, message: 'Please input a Date!' }]}
        >
          <DatePicker />
        </Form.Item>
      </HorizontalContainer>

      {/*<Divider />*/}

      {/*<Text className="summary-text">You will be charged 2 ETH</Text>*/}
    </>
  );
};
