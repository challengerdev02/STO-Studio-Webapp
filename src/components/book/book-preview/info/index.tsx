import { Col, Divider, Space, Typography } from 'antd';
import { TabRow } from './index.styled';
import { BookNamespace } from '@/shared/namespaces/book';
import { UserNamespace } from '@/shared/namespaces/user';
import { truncateEthAddress } from '@/shared/utils';
import { Attr } from '@/components';
import { SceneNamespace } from '@/shared/namespaces/scene';

const { Paragraph } = Typography;

interface InfoTabProps {
  description: string;
  GENRE_OPTIONS: string;
  ageRating: string;
  isbn?: string;
  numberOfPages: number;
  attributes: BookNamespace.Attribute[];
  user: UserNamespace.User;
  selectedScene?: SceneNamespace.Scene;
}

export const InfoTab = (props: InfoTabProps) => {
  const {
    description,
    GENRE_OPTIONS,
    ageRating,
    isbn,
    numberOfPages,
    attributes,
    user,
    selectedScene,
  } = props;
  return (
    <>
      <TabRow>
        <Col span={24}>
          <Paragraph
            ellipsis={{
              rows: 4,
              expandable: true,
              symbol: 'Read more',
            }}
            test-id="description-p"
          >
            {selectedScene?.description ?? description}
          </Paragraph>
        </Col>
        <Divider />
        <Space
          style={{ width: '100%' }}
          className={'meta-align-center meta-flex-s-b'}
        >
          <div>
            <div>Creator</div>
            <b>
              {truncateEthAddress(
                selectedScene?.walletAddress ?? user.walletAddress
              )}
            </b>
          </div>
          <div className={'meta-flex meta-flex-col'}>
            <div>Owner</div>
            <b>
              {truncateEthAddress(
                selectedScene?.walletAddress ?? user.walletAddress
              )}
            </b>
          </div>
        </Space>
        <Divider />
        <div style={{ width: '100%' }}>
          {selectedScene && (
            <div style={{ marginBottom: '10px' }}>
              <b>Scene Title</b>
            </div>
          )}

          {selectedScene && (
            <Space className={'w-100 meta-align-center meta-flex-s-b'}>
              <div>{selectedScene.title}</div>
            </Space>
          )}
          {!selectedScene && (
            <div style={{ marginBottom: '10px' }}>
              <b>Attributes</b>
            </div>
          )}

          {GENRE_OPTIONS && !selectedScene && (
            <Space className={'w-100 meta-align-center meta-flex-s-b'}>
              <div>GENRE_OPTIONS</div>

              <b>{GENRE_OPTIONS}</b>
            </Space>
          )}

          {ageRating && !selectedScene && (
            <Space className={'w-100 meta-align-center meta-flex-s-b'}>
              <div>Age Rating:</div>

              <b>{ageRating}</b>
            </Space>
          )}

          {isbn && !selectedScene && (
            <Space className={'w-100 meta-align-center meta-flex-s-b'}>
              <div>ISBN</div>

              <b>{isbn}</b>
            </Space>
          )}

          {numberOfPages && !selectedScene && (
            <Space className={'w-100 meta-align-center meta-flex-s-b'}>
              <div>Pages</div>

              <b>{numberOfPages}</b>
            </Space>
          )}
        </div>

        <Divider />
        <Space size={10} wrap style={{ justifyContent: 'space-around' }}>
          {Attr(selectedScene?.attributes ?? attributes)}
        </Space>
      </TabRow>
    </>
  );
};
