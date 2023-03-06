import { Col, Divider, Row } from 'antd';
import { TabRow } from './index.styled';

interface InfoTabProps {}

export const BuyTab = (props: InfoTabProps) => {
  const {} = props;
  return (
    <>
      <TabRow>
        <Col span={24}>
          <b>BUY</b>
        </Col>
        <Divider />
        <Row style={{ width: '100%' }}>
          <Col span={12}>
            <p>Creator</p>
            <b>0xbd72485...98f5f1595</b>
          </Col>
          <Col span={12}>
            <p>Owner</p>
            <b>0xbd72485...98f5f1595</b>
          </Col>
          <Col span={12}>col</Col>
        </Row>
        <Divider />
        <Row style={{ width: '80%' }}>
          <Col span={24}>
            <b>Attributes</b>
          </Col>
          <Col span={12}>
            <p>GENRE_OPTIONS</p>
          </Col>
          <Col span={12}>
            <b>Science Fiction</b>
          </Col>
          <Col span={12}>
            <p>Language</p>
          </Col>
          <Col span={12}>
            <b>Japanese</b>
          </Col>
          <Col span={12}>
            <p>Age Rating:</p>
          </Col>
          <Col span={12}>
            <b>23 and above</b>
          </Col>
        </Row>
        <Divider />
        <Row style={{ width: '80%' }}>
          <Col span={12}>
            <b>Artists</b>
          </Col>
          <Col span={12}>
            <b>Characters</b>
          </Col>
          <Col span={12}>
            <p>GENRE_OPTIONS</p>
          </Col>
          <Col span={12}>
            <p>GENRE_OPTIONS</p>
          </Col>
          <Col span={12}>
            <p>Language</p>
          </Col>
          <Col span={12}>
            <p>GENRE_OPTIONS</p>
          </Col>
          <Col span={12}>
            <p>Age Rating:</p>
          </Col>
          <Col span={12}>
            <p>Whizkid</p>
          </Col>
        </Row>
      </TabRow>
    </>
  );
};
