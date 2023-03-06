import React from 'react';
import { LiveAuctionCard } from './live-auction-card';
import { BidCard } from '../../assets';
import { LiveAuctionInfo } from './live-auction-info';
import { IsomorphicTab } from '../../isomorphic/tab';
import { LiveAuctionList } from './live-auction-list';
import { Tabs } from 'antd';
import { AuctionsListWrapper, Col, TabWrapper, Wrapper } from './index.styled';

const { TabPane } = Tabs;

interface LiveAuctionWrapperProps {
  GENRE_OPTIONS: string;
  language: string;
  ageRating: string;
  characters: Array<string>;
  imageSrc: any;
  title: string;
  auctioneer: string;
  itemDescription: string;
  data: Record<string, any>[];
  user: string;
  cryptoValue: string;
  priceEquivalent: string;
  startDate: string | Date;
  endDate: string | Date;
  userAvatar: any;
}

const LiveAuction = (props: LiveAuctionWrapperProps) => {
  const {
    GENRE_OPTIONS,
    language,
    ageRating,
    characters,
    imageSrc,
    title,
    auctioneer,
    itemDescription,
    userAvatar,
    user,
    cryptoValue,
    priceEquivalent,
    startDate,
    endDate,
    data,
  } = props;

  return (
    <Wrapper>
      <Col>
        <LiveAuctionCard
          GENRE_OPTIONS={GENRE_OPTIONS}
          language={language}
          ageRating={ageRating}
          characters={characters}
          imageSrc={imageSrc}
        />
      </Col>
      <Col>
        <LiveAuctionInfo
          title={title}
          auctioneer={auctioneer}
          itemDescription={itemDescription}
        />
        <TabWrapper>
          <IsomorphicTab>
            {' '}
            <TabPane tab="Bids" key="1">
              <AuctionsListWrapper>
                <LiveAuctionList data={data} />
              </AuctionsListWrapper>
            </TabPane>
            <TabPane tab="Details" key="2" />
            <TabPane tab="History" key="3" />
          </IsomorphicTab>
        </TabWrapper>

        <BidCard
          user={user}
          cryptoValue={cryptoValue}
          priceEquivalent={priceEquivalent}
          startDate={startDate}
          endDate={endDate}
          userAvatar={userAvatar}
        />
      </Col>
    </Wrapper>
  );
};
export default LiveAuction;
