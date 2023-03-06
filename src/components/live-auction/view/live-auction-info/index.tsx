import React, { useState } from 'react';
import {
  ItemDescription,
  AuctionInfo,
  AuctionTitle,
  Auctioneer,
} from './index.styled';

interface LiveAuctionInfoProps {
  title: string;
  auctioneer: string;
  itemDescription: string;
}

export const LiveAuctionInfo = (props: LiveAuctionInfoProps) => {
  const { title, auctioneer, itemDescription } = props;
  const [ellipsis] = useState(true);

  return (
    <AuctionInfo data-testid="live-auction-info">
      <AuctionTitle data-testid="bid-title">{title}</AuctionTitle>
      <Auctioneer data-testid="bid-auctioneer">by @{auctioneer}</Auctioneer>
      <ItemDescription
        data-testid="item-description"
        ellipsis={
          ellipsis
            ? {
                rows: 3,
                expandable: true,
                symbol: <span className="read_more">Read More</span>,
              }
            : false
        }
      >
        {itemDescription}
      </ItemDescription>
    </AuctionInfo>
  );
};
