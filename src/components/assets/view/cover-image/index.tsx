import { Badge, Button, Space, Typography } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ImageView } from '@/components/isomorphic/image-viewer[thumbnail]/main-view';
import React from 'react';
import { SUPPORTED_NETWORKS } from '../../../../blockchain/evm/utils';
import { get } from 'lodash';

const { Text } = Typography;
interface AssetViewCoverImageProps {
  coverImage?: string;
  thumbnail?: string;
  likes: number;
  blockchain?: string;
  disableLiking?: boolean;
  onLike?: () => void;
  liked?: boolean;
  likingAsset?: boolean;
  startDateTimestamp?: number | string;
  edition?: number | string;
  published?: boolean;
  hidePublishedBadge?: boolean;
  hideLikes?: boolean;
}
export const AssetViewCoverImage = (props: AssetViewCoverImageProps) => {
  const { published } = props;
  const chain: any = props.blockchain
    ? get(SUPPORTED_NETWORKS, Number(props.blockchain)) ??
      SUPPORTED_NETWORKS[97]
    : null;

  // alert(props.thumbnail);
  return (
    <div
      className="image-wrapper"
      style={{ maxHeight: '450px', overflow: 'hidden' }}
    >
      {props?.edition && (
        <Badge.Ribbon
          text={`Edition ${props?.edition ?? 1} | Released ${new Date(
            Number(props.startDateTimestamp) * 1000
          ).toLocaleDateString('en-US', {
            month: 'numeric',
            year: 'numeric',
            day: 'numeric',
          })}`}
          color={'green'}
        />
      )}
      {!props?.edition && !props.hidePublishedBadge && (
        <Badge.Ribbon
          style={{ marginLeft: '100px' }}
          text={published ? 'Published' : 'Not Published'}
          color={published ? 'blue' : 'red'}
        ></Badge.Ribbon>
      )}
      <div
        className="image-wrapper-header meta-flex w-100 meta-align-center "
        style={{ paddingLeft: 10, paddingRight: 10, minHeight: 40 }}
      >
        {props.blockchain ? chain!['icon'] : null}

        {!props.hideLikes && (
          <Space size={1}>
            <Button
              className={'image-wrapper-header-like-btn'}
              size={'small'}
              style={
                props.blockchain
                  ? { marginLeft: 10, paddingLeft: 10, paddingRight: 10 }
                  : {}
              }
              icon={
                props.liked ? (
                  <HeartFilled className={'liked'} />
                ) : (
                  <HeartOutlined />
                )
              }
              // icon={<HeartFilled />}
              onClick={props.onLike}
              type={'text'}
              // loading={props.likingAsset}
              disabled={props.disableLiking || props.likingAsset}
            />
            <Text>{props.likes}</Text>
          </Space>
        )}
      </div>
      <ImageView
        style={{
          opacity: published || props.hidePublishedBadge ? 1 : 0.5,
          // width: '100%',
          height: '100%',
          // aspectRatio: '1/1',
        }}
        src={props.thumbnail ?? props.coverImage ?? ''}
      />
    </div>
  );
};
