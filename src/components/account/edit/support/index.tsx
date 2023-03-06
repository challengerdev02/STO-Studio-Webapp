import { Collapse } from 'antd';
const { Panel } = Collapse;

import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';

export const AccountSupport = () => {
  return (
    <div className="content-notification">
      <Title level={1} className="title">
        <span>Account Support</span>
      </Title>
      <Text className="sub-title">
        if you need help related to your account, we can help you
      </Text>
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel header="General help" key="1">
          <p>Visit our help center</p>
        </Panel>
        <Panel header="Contact Meta Support" key="2">
          <p>
            Cannot find an answer you are looking for?
            <br />
            You can submit a request here
          </p>
        </Panel>
        <Panel header="Help with Compromised Account" key="3">
          <p>
            Cannot find an answer you are looking for?
            <br />
            Cannot find an answer you are looking for?
            <br />
            Cannot find an answer you are looking for?
            <br />
            You can submit a request here
          </p>
        </Panel>
      </Collapse>
    </div>
  );
};
