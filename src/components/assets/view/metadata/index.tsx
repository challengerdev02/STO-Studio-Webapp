import { Col, Collapse, Row, Space, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Attr } from '@/components';
import { BookNamespace } from '@/shared/namespaces/book';
import formatNumber from 'format-number';

const { Panel } = Collapse;
const { Title, Text } = Typography;

interface AssetViewMetadataProps {
  user: { name: string; link: string };
  description: string;
  infoLink: string;
  attributes: BookNamespace.Attribute[];
  GENRE_OPTIONS: string[];
  ageRating: string;
  maxSupply?: number;
  isOwned?: boolean;
}

export const AssetViewMetadata = (props: AssetViewMetadataProps) => {
  const { user, maxSupply } = props;
  const format = formatNumber();

  return (
    <div className="attribute-container">
      <Collapse defaultActiveKey={['1', '3']} expandIconPosition={'right'}>
        <Panel header={<Title level={4}>Description</Title>} key="1">
          <div>{props.description}</div>
          <br />
          <Title level={5} style={{ color: 'var(--heading-color)' }}>
            {/*{isOwned ? 'Owned' : 'Created'} by{' '}*/}
            Created by <Link href={user.link}>{user.name}</Link>
          </Title>
        </Panel>
        <Panel header={<Title level={4}>Links</Title>} key="2">
          {props?.infoLink && (
            <Text>
              <a href={props.infoLink} target={'_blank'} rel={'noreferrer'}>
                {props?.infoLink}
              </a>
            </Text>
          )}
        </Panel>
        <Panel header={<Title level={4}>Attributes</Title>} key="3">
          <Space size={[10, 10]} wrap style={{ width: '100%' }}>
            {Attr(props.attributes)}
          </Space>
        </Panel>
        <Panel header={<Title level={4}>Details</Title>} key="4">
          <Space size={10} direction={'vertical'} style={{ width: '100%' }}>
            <Row justify={'space-between'} style={{ width: '100%' }}>
              <Col>
                <Text className="left">GENRE_OPTIONS:</Text>
              </Col>
              <Col>
                <Title level={5} className="right">
                  {props.GENRE_OPTIONS}
                </Title>
              </Col>
            </Row>
            <Row justify={'space-between'} style={{ width: '100%' }}>
              <Col>
                <Text className="left">Age Rating:</Text>
              </Col>
              <Col>
                <Title level={5} className="right">
                  {props.ageRating}
                </Title>
              </Col>
            </Row>
            {maxSupply && (
              <Row justify={'space-between'} style={{ width: '100%' }}>
                <Col>
                  <Text className="left">Total Supply:</Text>
                </Col>
                <Col>
                  <Title level={5} className="right">
                    {format(Number(maxSupply))}
                  </Title>
                </Col>
              </Row>
            )}
          </Space>
        </Panel>
      </Collapse>
    </div>
  );
};
