import { Typography, List, Input, Button, Form, Checkbox } from 'antd';
const { Text } = Typography;

import Title from 'antd/lib/typography/Title';

interface NotificationsProps {
  onFinish?: (data: any) => void;
}

export const Notifications = ({ onFinish }: NotificationsProps) => {
  const data = [
    {
      title: 'Item Sold',
      description: 'When some purchases on one your items',
    },
    {
      title: 'Bid Activity',
      description: 'When some bids on one your items',
    },
    {
      title: 'Price Change',
      description: 'When item you made on offer on changes',
    },
    {
      title: 'Auction Expiration',
      description: 'When a timed auction you created ends',
    },
    {
      title: 'Outbid',
      description: 'When an offer you placed is exceeded by another user',
    },
    {
      title: 'Owned Item Updates',
      description:
        'When a significant update occurs for one of the items you have purchased',
    },
    {
      title: 'Successful Purchase',
      description: 'When successfully buy an item',
    },
    {
      title: 'Newsletter',
      description: 'Occassional updates from the platform',
    },
  ];
  return (
    <div className="content-notification">
      <Form onFinish={onFinish}>
        <Title level={1} className="title">
          <span>Notification Settings</span>
        </Title>
        <Text className="sub-title">
          Select notification you would like to received
        </Text>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Form.Item name={item.title.replaceAll(' ', '')}>
                    <Checkbox
                      value={item.description}
                      style={{ lineHeight: '32px' }}
                    />
                  </Form.Item>
                }
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <Title level={5} className="bottom-title">
          <span>Minimum Bid Threshold</span>
        </Title>
        <Text className="sub-title">
          Receive notifications only when you receive offers with a value
          greater than or equal to this amount of ETH.
        </Text>
        <Form.Item name={'min-bid'}>
          <Input
            className="buttom-input"
            addonBefore={
              <div className="addonBefore-container">
                <div>
                  <img src="/eth.svg" alt="eth" />
                </div>
                <div>
                  <Text strong>ETH</Text>
                  <Text>Ethreum</Text>
                </div>
              </div>
            }
            defaultValue="0.001"
          />
        </Form.Item>
        <Button className="submit-button" type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};
