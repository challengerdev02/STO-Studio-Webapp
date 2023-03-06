import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { useTimer, useUIState } from '@/hooks';
import {
  BolderText,
  BolderTextWhite,
  TimeBlock,
  TimeLabel,
  TimeValue,
} from '../index.styled';
import React from 'react';
import { SUPPORTED_NETWORKS, toEther } from '../../../../blockchain/evm/utils';
import { isMobile } from 'react-device-detect';
import Countdown from 'react-countdown';
// import { useRouter } from 'next/router';
import { get, toLower } from 'lodash';
import { SaleNamespace } from '@/shared/namespaces/sale';
import { useContract } from '../../../../blockchain/evm/hooks';

interface SaleCardProps {
  onMakeBid: () => void;
  onMakeOffer: () => void;
  onBuyNow: () => void;
  endDate: string | Date;
  startDate: string | Date;
  price: string;
  blockchain: string;
  saleType: string;
  queryingContract?: boolean;
  isPurchasable?: boolean;
  canMakeOffer?: boolean;
  seller: string;
  walletAddress: string;
  onBuyAuction: () => void;
  latestBid: SaleNamespace.Bid;
  onCountdownFinished?: () => void;
  maxSupply?: string | number;
  soldCount?: number;
}
export const SaleCard = (props: SaleCardProps) => {
  // const key = '@@view-sale-asset-container';
  const {
    onMakeBid,
    onBuyAuction,
    // onMakeOffer,
    maxSupply,
    onBuyNow,
    endDate,
    startDate,
    price,
    blockchain,
    saleType,
    queryingContract,
    isPurchasable,
    canMakeOffer,
    seller,
    walletAddress,
    latestBid,
    onCountdownFinished,
    soldCount,
  } = props;

  const claimingBidKey = `@@view-sale-asset-container/claim-winning-bid`;
  const { uiLoaders } = useUIState();
  const claimingBid = uiLoaders[claimingBidKey];

  const { contractFromAddress } = useContract({
    address: process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS,
    options: { key: '@@view-sale-asset-container' },
  });

  const isClaimedBid = !!get(contractFromAddress, [
    String(process.env.NEXT_PUBLIC_MC_TRADER_CONTRACT_ADDRESS),
    'claimedAuction',
  ]);

  const chain =
    SUPPORTED_NETWORKS[blockchain] ??
    SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_ID as string];

  const { seconds, minutes, hours, days, isActive } = useTimer(
    new Date(),
    endDate,
    onCountdownFinished
  );

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <strong>Sale Ended!</strong>;
    } else {
      return (
        <BolderText>
          {days}D : {hours}H : {minutes}M : {seconds}S
        </BolderText>
      );
    }
  };

  // const humanReadableEndDate = `Sale ends ${<Countdown date={new Date(endDate).getTime()} />}`;
  //
  // const humanReadableStartDate = `Auction begins ${format(
  //   new Date(endDate),
  //   'PPPp z'
  // )}`;

  // utcToZonedTime(new Date())
  return (
    <Card
      id={'meta-bid-list-component'}
      title={
        !isActive ? null : (
          <>
            <Row style={{ width: '100%' }} justify="space-between">
              <Col
                className={`${
                  isMobile
                    ? 'meta-flex-s-c meta-flex-center sale-asset-price-container'
                    : ''
                }`}
                // direction={'vertical'}
                // size={10}
              >
                {saleType !== 'Auction' &&
                new Date(startDate) <= new Date() &&
                new Date(endDate) > new Date() ? (
                  <span>
                    <span style={{ fontWeight: 'normal', color: 'grey' }}>
                      Sale ends in{' '}
                    </span>
                    <Countdown
                      date={new Date(endDate).getTime()}
                      renderer={renderer}
                    />
                  </span>
                ) : (
                  ''
                )}

                {new Date(startDate) > new Date() ? (
                  <span
                    style={{
                      color: 'var(--text-color-secondary)',
                      fontSize: isMobile ? 14 : '1.2rem',
                    }}
                  >
                    NFT Sale begins in{' '}
                    <Countdown
                      date={new Date(startDate).getTime()}
                      renderer={renderer}
                    />
                  </span>
                ) : (
                  ''
                )}

                {saleType === 'Auction' &&
                  (isPurchasable || seller == walletAddress) &&
                  new Date(startDate) < new Date() && (
                    <Space>
                      {parseInt(days) > 0 && (
                        <TimeBlock
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <TimeValue data-testid="days-timeblock">
                            {days ?? '00'}
                          </TimeValue>{' '}
                          <TimeLabel>Days</TimeLabel>{' '}
                        </TimeBlock>
                      )}
                      <TimeBlock
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <TimeValue data-testid="hours-timeblock">
                          {hours ?? '00'}
                        </TimeValue>{' '}
                        <TimeLabel>Hours</TimeLabel>{' '}
                      </TimeBlock>
                      <TimeBlock
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <TimeValue data-testid="minutes-timeblock">
                          {minutes ?? '00'}
                        </TimeValue>{' '}
                        <TimeLabel>Minutes</TimeLabel>{' '}
                      </TimeBlock>
                      <TimeBlock
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <TimeValue data-testid="seconds-timeblock">
                          {seconds ?? '00'}
                        </TimeValue>{' '}
                        <TimeLabel>Seconds</TimeLabel>{' '}
                      </TimeBlock>
                    </Space>
                  )}
              </Col>

              <Col>
                {/*{Number(maxSupply ?? 0) != 0 && Number(maxSupply ?? 0) == Number(soldCount ?? 0) && <BolderTextWhite>Sold Out!</BolderTextWhite>}*/}
                {/*{Number(maxSupply ?? 0) != Number(soldCount ?? 0) && <span>*/}
                <span>
                  {Number(maxSupply ?? 0) - Number(soldCount ?? 0) < 5 && (
                    <span>Only </span>
                  )}
                  <span>
                    {' '}
                    <BolderTextWhite>
                      {Number(maxSupply ?? 0) - Number(soldCount ?? 0)}
                    </BolderTextWhite>{' '}
                    of <BolderTextWhite>{maxSupply}</BolderTextWhite> items left
                  </span>
                </span>
              </Col>
            </Row>
          </>
        )
      }
      style={{ width: '100%' }}
    >
      <Space
        direction={'vertical'}
        size={20}
        className={`${isMobile ? 'meta-flex-s-c meta-flex-center w-100' : ''}`}
      >
        <Space
          direction={'vertical'}
          size={5}
          className={`${
            isMobile
              ? 'meta-flex-s-c meta-flex-center sale-asset-price-container w-100'
              : ''
          }`}
        >
          <span style={{ color: 'var(--text-color-secondary)', fontSize: 16 }}>
            Current price
          </span>
          <Space
            size={15}
            align={'center'}
            className={'sale-asset-price-container'}
          >
            <span style={{ width: 38 }}>{chain.usdToken.icon}</span>
            {/*{get(CryptoIcons, toLower(currency ?? 'bnb'), CryptoIcons.bnb)}*/}
            <Typography.Title style={{ margin: 0 }} level={1}>
              {toEther(price)} {chain.usdToken.symbol}
            </Typography.Title>
          </Space>
        </Space>

        {(isPurchasable || canMakeOffer) && (
          <Space
            size={20}
            align={'center'}
            className={`${
              isMobile
                ? 'w-100 meta-flex-col meta-flex-s-c meta-flex-center'
                : ''
            }`}
          >
            {saleType && saleType === 'BuyNow' && isActive && isPurchasable && (
              <>
                <Button
                  disabled={
                    Number(maxSupply ?? 0) != 0 &&
                    Number(maxSupply ?? 0) == Number(soldCount ?? 0)
                  }
                  onClick={onBuyNow}
                  style={!isMobile ? { width: 200 } : {}}
                  type={'primary'}
                  shape={'round'}
                  block={isMobile}
                  loading={queryingContract}
                >
                  {Number(maxSupply ?? 0) != 0 &&
                  Number(maxSupply ?? 0) == Number(soldCount ?? 0)
                    ? 'Sold Out!'
                    : 'Buy Now'}
                </Button>
              </>
            )}

            {/*{saleType !== 'Auction' && canMakeOffer && (*/}
            {/*  <Button*/}
            {/*    block={isMobile}*/}
            {/*    onClick={onMakeOffer}*/}
            {/*    style={!isMobile ? { width: 200 } : {}}*/}
            {/*    shape={'round'}*/}
            {/*  >*/}
            {/*    Make offer*/}
            {/*  </Button>*/}
            {/*)}*/}
            {saleType === 'Auction' && isActive && isPurchasable && (
              <Button
                onClick={onMakeBid}
                style={!isMobile ? { width: 300 } : {}}
                type={'primary'}
                block={isMobile}
                shape={'round'}
              >
                Place Bid
              </Button>
            )}
          </Space>
        )}

        {saleType === 'Auction' &&
          !isClaimedBid &&
          latestBid?.bidder &&
          new Date(endDate) < new Date() &&
          (seller == walletAddress ||
            toLower(String(latestBid.bidder)) == walletAddress) && (
            <Button
              loading={claimingBid}
              onClick={onBuyAuction}
              style={!isMobile ? { width: 300 } : {}}
              type={'primary'}
              block={isMobile}
              shape={'round'}
            >
              {seller == walletAddress
                ? 'Finalize Auction'
                : 'Claim Your Asset'}
            </Button>
          )}
      </Space>
    </Card>
  );
};
