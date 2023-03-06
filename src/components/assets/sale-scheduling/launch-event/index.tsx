import { DatePicker, Divider, Form, Input, InputNumber } from 'antd';
import Text from 'antd/lib/typography/Text';
import { HorizontalContainer } from '../index.styled';

export const LaunchEvent = () => {
  return (
    <>
      <HorizontalContainer>
        <Form.Item
          label="copies to be sold"
          name="copiesAvailable"
          rules={[{ required: true, message: 'Please input a number!' }]}
        >
          <InputNumber
            placeholder="Enter number of copies"
            min={1}
            type={'number'}
          />
        </Form.Item>
        <Form.Item
          label="Proposed launch price"
          name="price"
          rules={[{ required: true, message: 'Please input a number!' }]}
        >
          <InputNumber
            step={0.01}
            placeholder="Number of ethers"
            data-testid={'proposed-price'}
            min={0}
            type={'number'}
          />
        </Form.Item>
      </HorizontalContainer>
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
            // formatter={(value) => `${value}%`}
            step={0.01}
            type={'number'}
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
            // formatter={(value) => `${value}%`}
            step={0.01}
            type={'number'}
            placeholder="Royalty percentage"
          />
        </Form.Item>
      </HorizontalContainer>

      <HorizontalContainer>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { message: 'Please input a email!', required: true },
            { type: 'email' },
          ]}
        >
          <Input
            type="email"
            placeholder={'Enter email address'}
            data-testid="email"
          />
        </Form.Item>
        <Form.Item
          label="phone number"
          name="phone"
          rules={[{ message: 'Please input a phone number!', required: true }]}
        >
          <Input type="phone" placeholder={'Enter phone number'} />
        </Form.Item>
      </HorizontalContainer>

      <Divider />

      <HorizontalContainer>
        <Form.Item
          className="half-row"
          label="PROPOSED LAUNCH DATE"
          name="startDate"
          rules={[{ required: true, message: 'Please input a Date!' }]}
        >
          <DatePicker placeholder="Auction will begin" />
        </Form.Item>
        <span className="ant-row half-row" />
      </HorizontalContainer>

      <Text className="summary-text" />
    </>
  );
};
