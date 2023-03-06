// import { Container } from '@/components/assets/view/index.styled';
import {
  Gallery,
  LoadMoreButton,
} from '@/components/account/profile/index.styled';
import { MarketplaceCard } from '@/components/marketplace';
import { BookNamespace } from '@/shared/namespaces/book';
import { SaleNamespace } from '@/shared/namespaces/sale';
import { useRouter } from 'next/router';
import { Button, Empty, Space, Typography } from 'antd';
import { getSaleTypeActionTitle, toEther } from '../../../blockchain/evm/utils';
import { MainLoader } from '@/components/isomorphic';
import React from 'react';
import { get, isEmpty } from 'lodash';
import { ReloadOutlined } from '@ant-design/icons';

interface SearchProps {
  searchItem: BookNamespace.SearchItem;
  clearSearch: () => void;
  onSearch: (virtualized?: boolean, params?: Record<string, any>) => void;
  loading: boolean;
  pagination: Record<string, any>;
}
export const Search = (props: SearchProps) => {
  const { searchItem, loading, onSearch, pagination, clearSearch } = props;

  const router = useRouter();

  const assets: SaleNamespace.SaleAsset[] = searchItem.assets;

  return (
    <Space
      direction={'vertical'}
      style={{ width: '80%', padding: '40px 0' }}
      size={30}
    >
      <Space direction={'vertical'}>
        <Typography.Title level={3}>Assets results</Typography.Title>
        <Space
          align={'center'}
          className={'meta-flex meta-flex-center'}
          size={10}
        >
          <Button
            size={'small'}
            // type={'text'}
            shape={'circle'}
            onClick={() => {
              clearSearch();
              onSearch(false, {});
            }}
            icon={<ReloadOutlined />}
          />
          <span style={{ fontSize: 16 }}>
            {get(pagination, 'totalCount', 0)} items
          </span>
        </Space>
      </Space>

      {loading && isEmpty(assets) && (
        <Space
          size={20}
          style={{ width: '100%', justifyContent: 'center' }}
          align={'center'}
        >
          <MainLoader height={50} width={50} />
        </Space>
      )}
      {isEmpty(assets) && !loading && (
        <Space
          size={20}
          style={{ width: '100%', justifyContent: 'center' }}
          align={'center'}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={'No results found'}
          />
        </Space>
      )}
      {!isEmpty(assets) && (
        <Gallery data-testid="auctions-gallery">
          {assets?.map((asset: any, index: any) => {
            const data = {
              coverInfo: {
                countDown: '01:52:09 left 🔥',
                startDate: new Date(),
                endDate: new Date(asset.endDate ?? ''),
                coverImg: asset.asset.coverImage ?? '',
                menuItems: [],
              },
              cardData: {
                title: asset.title ?? '',
                actionTitle: getSaleTypeActionTitle(asset.saleType ?? ''),
                placeBid: () => {
                  router.push(`/assets/${asset?._id}/${asset?.saleId}`);
                },
                iconURL:
                  asset.user?.avatar ??
                  'https://robohash.org/0f0383b8d198fb15c0ab7fc729a73028?set=set4&bgset=&size=400x400',
                itemPrice: toEther(asset.price),
                blockchain: asset.blockChain,
                count: asset.asset.likes ?? '0',
                inWishlist: true,
              },
            };
            return <MarketplaceCard key={index} {...data} />;
          })}
        </Gallery>
      )}

      {!isEmpty(assets) && get(pagination, 'next') && (
        <Space
          size={20}
          style={{ width: '100%', justifyContent: 'center' }}
          align={'center'}
        >
          <LoadMoreButton
            data-testid="load-more"
            shape="round"
            onClick={(_) => onSearch(true, { page: get(pagination, 'next') })}
          >
            <span>Load more</span> {loading && <MainLoader />}
          </LoadMoreButton>
        </Space>
      )}
    </Space>
  );
};
