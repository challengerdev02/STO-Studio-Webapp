import { Button, Space, Typography } from 'antd';
import { get, toLower } from 'lodash';
import {
  CryptoIcons,
  SUPPORTED_USD_TOKENS,
  toEther,
} from '../../../../blockchain/evm/utils';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { UserNamespace } from '@/shared/namespaces/user';
import { truncateEthAddress } from '@/shared/utils';
import { TokenAssetContainerKey } from '../../../../containers/collections/token';

export const enumerateUser = (
  assetUser: UserNamespace.User
): { link: string; name: string } => {
  //console.log(assetUser);
  if (assetUser?.walletAddress === process.env.NEXT_PUBLIC_ADDRESS_ZERO) {
    return {
      link: '/NullAddress',
      name: 'NullAddress',
    };
  }
  const name =
    assetUser?.username ??
    (assetUser?.walletAddress
      ? truncateEthAddress(assetUser?.walletAddress)
      : undefined) ??
    '';

  return {
    name,
    link: `/${assetUser?.walletAddress}`,
  };
};

export const biddingColumn = [
  {
    title: 'Price',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: string, record: Record<string, any>) => {
      const token = SUPPORTED_USD_TOKENS[record.chainId];
      return (
        <Space
          size={15}
          align={'center'}
          className={'sale-asset-price-container'}
        >
          {token?.['icon']}
          <Typography.Title level={5} style={{ margin: 0 }}>
            {toEther(amount)} {token?.['symbol']}
          </Typography.Title>
        </Space>
      );
    },
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt: string) => {
      return (
        <span>
          {createdAt
            ? format(new Date(createdAt), 'MMM dd, yyyy hh:mm a z')
            : '-'}
        </span>
      );
    },
  },
  {
    title: 'From',
    dataIndex: 'user',
    key: 'user',
    render: (user: any) => {
      const from = enumerateUser(user ?? {});
      return (
        <Link href={from.link} passHref>
          <a target={'_blank'}>{from.name}</a>
        </Link>
      );
    },
  },
];

export const offersColumn = (config: {
  onAcceptOffer: (values: Record<string, any>) => void;
  isOwner?: boolean;
  uiLoaders: Record<string, any>;
}) => {
  const defaultColumns = [
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string, record: Record<string, any>) => {
        const token = SUPPORTED_USD_TOKENS[record.chainId];
        return (
          <Space
            size={15}
            align={'center'}
            className={'sale-asset-price-container'}
          >
            {token?.['icon']}
            <Typography.Title level={5} style={{ margin: 0 }}>
              {toEther(price)} {token?.['symbol']}
            </Typography.Title>
          </Space>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => {
        return (
          <span>
            {createdAt
              ? format(new Date(createdAt), 'MMM dd, yyyy hh:mm a z')
              : '-'}
          </span>
        );
      },
    },
    {
      title: 'From',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => {
        const from = enumerateUser(user ?? {});
        return (
          <Link href={from.link} passHref>
            <a target={'_blank'}>{from.name}</a>
          </Link>
        );
      },
    },
  ];

  if (config.isOwner) {
    return [
      ...defaultColumns,
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_: string, record: Record<string, any>) => {
          const offerSignature = get(record, 'offerSignature');
          const key = `${TokenAssetContainerKey}/accept-offer/${offerSignature}`;
          const loading = get(config.uiLoaders, key, false);
          return (
            <Button
              type={'default'}
              onClick={() => {
                config.onAcceptOffer(record);
              }}
              shape={'round'}
              size={'small'}
              loading={loading}
            >
              Accept
            </Button>
          );
        },
      },
    ];
  }

  return defaultColumns;
};

export const ownersColumn = [
  {
    title: 'Buyer',
    dataIndex: 'user',
    key: 'user',
    render: (user: any, record: Record<string, any>) => {
      const link = `/collection/${user?.walletAddress}/${record.token_address}/${record.token_id}`;
      const from = enumerateUser(user ?? {});
      from.link = link;
      return (
        <Link href={from.link} passHref>
          <a target={'_blank'}>{from.name}</a>
        </Link>
      );
    },
  },

  {
    title: 'Asset Token ID',
    dataIndex: 'token_id',
    key: 'token_id',
    render: (tokenID: any, record: Record<string, any>) => {
      const link = `/collection/${record.token_address}/${tokenID}`;
      return (
        <Link href={link} passHref>
          <a target={'_blank'}>{tokenID}</a>
        </Link>
      );
    },
  },
  {
    title: 'Quantity',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: string) => {
      return <span>{amount}</span>;
    },
  },
];

export const tokenActivityColumns = [
  {
    title: 'From',
    dataIndex: 'formerOwner',
    key: 'formerOwner',
    render: (formerOwner: any, record: Record<string, any>) => {
      const from = enumerateUser(
        formerOwner ?? { walletAddress: get(record, 'from_address') }
      );
      return (
        <Link href={from.link} passHref>
          <a target={'_blank'}>{from.name}</a>
        </Link>
      );
    },
  },
  {
    title: 'To',
    dataIndex: 'newOwner',
    key: 'newOwner',
    render: (newOwner: any, record: Record<string, any>) => {
      const from = enumerateUser(
        newOwner ?? { walletAddress: get(record, 'to_address') }
      );
      return (
        <Link href={from.link} passHref>
          <a target={'_blank'}>{from.name}</a>
        </Link>
      );
    },
  },
  {
    title: 'Date',
    dataIndex: 'block_timestamp',
    key: 'block_timestamp',
    render: (syncedAt: string, record: Record<string, any>) => {
      return (
        <Button
          type={'link'}
          target={'_blank'}
          href={`${
            process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_EXPLORER_URL
          }/tx/${get(record, 'transaction_hash')}`}
        >
          <div style={{ gap: 10 }} className={'meta-flex meta-flex-center'}>
            <span>
              {syncedAt
                ? format(new Date(syncedAt), 'MMM dd, yyyy hh:mm a z')
                : '-'}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill={'currentColor'}
                d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z"
              />
            </svg>
          </div>
        </Button>
      );
    },
  },
];

export const priceHistoryColumn = [
  {
    title: 'Price (USD)',
    dataIndex: 'price',
    key: 'price',
    render: (amount: string, record: Record<string, any>) => {
      return (
        <Space
          size={15}
          align={'center'}
          className={'sale-asset-price-container'}
        >
          {get(CryptoIcons, toLower(record.token ?? 'bnb'), CryptoIcons.bnb)}
          <Typography.Title level={5} style={{ margin: 0 }}>
            {parseFloat(toEther(amount)).toFixed(2)}
          </Typography.Title>
        </Space>
      );
    },
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    render: (seller: any) => {
      const from = enumerateUser({
        walletAddress: seller,
      } as UserNamespace.User);
      return (
        <Link href={from.link} passHref>
          <a target={'_blank'}>{from.name}</a>
        </Link>
      );
    },
  },
  {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    render: (buyer: any) => {
      const to = enumerateUser({ walletAddress: buyer } as UserNamespace.User);
      return (
        <Link href={to.link} passHref>
          <a target={'_blank'}>{to.name}</a>
        </Link>
      );
    },
  },
  {
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (syncedAt: string) => {
      return (
        <span>
          {syncedAt
            ? format(
                new Date(Number(syncedAt) * 1000).getTime(),
                'MMM dd, yyyy hh:mm a z'
              )
            : '-'}
        </span>
      );
    },
  },
];

export const evaluatePriceHistory = (history = []) => {
  return history.reduce(
    (
      accumulator: Record<string, any>[],
      [price, from, to, timestamp, tokenId]: string[]
    ) => {
      if (tokenId === '0') {
        return accumulator;
      }
      return [
        ...accumulator,
        {
          price,
          from,
          to,
          timestamp: Number(timestamp),
        },
      ];
    },
    []
  );
};
