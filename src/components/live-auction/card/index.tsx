import React from 'react';
import {
  Card,
  Row,
  CardInfo,
  CardContent,
  CardImage,
  CardImageContainer,
  Hr,
  RowCell,
  Logo,
  OptionsInner,
} from './index.styled';
import HeartIcon from '../../../../public/heart-icon.svg';
import { truncate } from 'lodash';
import CryptoLogo from '../../../../public/eth-logo.svg';

interface LiveAuctionCardProps {
  itemCoverImage: any;
  itemName: string;
  bestOffer: string;
  lastOffer: string;
  likes: string;
  onClick: () => any;
}

export const LiveAuctionCard = (props: LiveAuctionCardProps) => {
  const { itemCoverImage, itemName, bestOffer, lastOffer, likes, onClick } =
    props;
  return (
    <Card data-testid="live-auction-card">
      <CardImageContainer>
        <CardImage alt="" src={itemCoverImage} />
      </CardImageContainer>
      <CardContent>
        <div className="card-content-inner">
          <div className="left-col">
            <span className="left-col-row" title={`${itemName}`}>
              {' '}
              {truncate(`${itemName}`, {
                length: 20,
              })}
            </span>
            <span
              data-testid="item-name"
              className="left-col-row left-col-row-variant"
              title={`${itemName}`}
            >
              {truncate(`${itemName}`, {
                length: 20,
              })}
            </span>
          </div>

          <div className="right-col">
            <div className="row-wrapper">
              <span className="right-col-row">
                <RowCell>Best Offer</RowCell>
              </span>
              <span className="right-col-row ">
                <CardInfo data-testid="best-offer">
                  <span className="last-typeof-right-col-row">
                    <Logo alt="" src={CryptoLogo} />
                    {bestOffer}
                  </span>
                </CardInfo>
              </span>
            </div>
            <div className="row-wrapper">
              <CardInfo data-testid="last-offer">
                <RowCell>Last</RowCell>{' '}
                <span className="last-typeof-right-col-row">
                  {' '}
                  <Logo alt="" src={CryptoLogo} />
                  {lastOffer}
                </span>
              </CardInfo>
            </div>
          </div>
        </div>

        <Hr />
        <Row>
          <CardInfo>
            <OptionsInner data-testid="options-widget" onClick={onClick}>
              ...
            </OptionsInner>
          </CardInfo>{' '}
          <CardInfo data-testid="likes">
            {' '}
            <span className="last-typeof-right-col-row likes">
              <Logo src={HeartIcon} />
              {likes}
            </span>
          </CardInfo>
        </Row>
      </CardContent>
    </Card>
  );
};
