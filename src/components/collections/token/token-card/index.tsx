import { Button, Card, Space, Typography } from 'antd';
import React from 'react';
import { CryptoIcons, toEther } from '../../../../blockchain/evm/utils';
import { get, toLower } from 'lodash';
import { isMobile } from 'react-device-detect';

interface TokenSaleCardProps {
  onMakeOffer: () => void;
  onCreateSale: () => void;
  price: string;
  currency?: string;
  queryingContract?: boolean;
  isOwner?: boolean;
  assetType?: string;
  onPreviewBook?: () => void;
}
export const TokenSaleCard = (props: TokenSaleCardProps) => {
  const {
    onMakeOffer,
    price,
    currency,
    queryingContract,
    isOwner,
    onCreateSale,
    assetType,
    onPreviewBook,
  } = props;

  // utcToZonedTime(new Date())
  return (
    <Card
      id={'meta-bid-list-component'}
      title={
        <Space
          direction={'vertical'}
          size={5}
          className={`${
            isMobile
              ? 'meta-flex-s-c meta-flex-center sale-asset-price-container w-100'
              : ''
          }`}
        >
          {price != '0' && (
            <>
              <span
                style={{ color: 'var(--text-color-secondary)', fontSize: 16 }}
              >
                Current price
              </span>
              <Space
                size={15}
                align={'center'}
                className={'sale-asset-price-container'}
              >
                {get(CryptoIcons, toLower(currency ?? 'bnb'), CryptoIcons.bnb)}
                <Typography.Title style={{ margin: 0 }} level={1}>
                  {toEther(price)}
                </Typography.Title>
              </Space>
            </>
          )}
        </Space>
      }
      style={{ width: '100%' }}
    >
      <Space
        direction={'vertical'}
        size={20}
        className={`${isMobile ? 'meta-flex-s-c meta-flex-center w-100' : ''}`}
      >
        <Space
          size={20}
          align={'center'}
          className={`${
            isMobile ? 'w-100 meta-flex-col meta-flex-s-c meta-flex-center' : ''
          }`}
        ></Space>
      </Space>
    </Card>
  );
};
