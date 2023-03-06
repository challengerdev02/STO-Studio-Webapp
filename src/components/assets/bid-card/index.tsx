import React from 'react';
import {
  BidButton,
  BidBy,
  Col,
  CryptoValue,
  Ellipse,
  EllipseInner,
  Hr,
  Img,
  InnerBottomRow,
  InnerTopRow,
  PriceEquivalent,
  Row,
  TimeBlock,
  TimeLabel,
  TimeValue,
  user,
  Wrapper,
} from './index.styled';
import { useTimer } from '../../../hooks/useTimer';
import { truncateEthAddress } from '@/shared/utils';

interface PropType {
  user: string;
  cryptoValue: string;
  priceEquivalent: string;
  startDate: string | Date;
  endDate: string | Date;
  userAvatar: any;
}

export const BidCard = (props: PropType) => {
  const { userAvatar, user, cryptoValue, priceEquivalent, startDate, endDate } =
    props;
  const { seconds, minutes, hours, days } = useTimer(startDate, endDate);

  return (
    <Wrapper data-testid="bid-card">
      <Row>
        <Col>
          <Ellipse>
            <EllipseInner>
              {' '}
              <Img
                src={userAvatar}
                alt=""
                width="26px"
                height="28px"
                data-testid="user-avatar"
              />
            </EllipseInner>
          </Ellipse>
        </Col>
        <Col>
          <InnerTopRow>
            <BidBy>Highest bid by</BidBy>{' '}
            <user data-testid="block-chain-address" title={user}>
              {truncateEthAddress(user)}
            </user>
          </InnerTopRow>
          <InnerBottomRow>
            <CryptoValue data-testid="crypto-value">{cryptoValue}</CryptoValue>
            <PriceEquivalent data-testid="price-equivalent">
              {priceEquivalent}
            </PriceEquivalent>
          </InnerBottomRow>
        </Col>
      </Row>
      <Hr />

      <Row>
        <Col>
          <Ellipse>
            <EllipseInner>
              {' '}
              <Img
                src={userAvatar}
                alt=""
                width="26px"
                height="28px"
                data-testid="user-avatar-2"
              />
            </EllipseInner>
          </Ellipse>
        </Col>
        <Col>
          <InnerTopRow>
            <BidBy>Auction ends in</BidBy>
          </InnerTopRow>
          <InnerBottomRow>
            <TimeBlock>
              <TimeValue data-testid="days-timeblock">{days}</TimeValue>{' '}
              <TimeLabel>Days</TimeLabel>{' '}
            </TimeBlock>
            <TimeBlock>
              <TimeValue data-testid="hours-timeblock">{hours}</TimeValue>{' '}
              <TimeLabel>Hours</TimeLabel>{' '}
            </TimeBlock>
            <TimeBlock>
              <TimeValue data-testid="minutes-timeblock">{minutes}</TimeValue>{' '}
              <TimeLabel>Minutes</TimeLabel>{' '}
            </TimeBlock>
            <TimeBlock>
              <TimeValue data-testid="seconds-timeblock">{seconds}</TimeValue>{' '}
              <TimeLabel>Seconds</TimeLabel>{' '}
            </TimeBlock>
          </InnerBottomRow>
        </Col>
      </Row>
      <BidButton type="primary" block>
        Place a bid
      </BidButton>
    </Wrapper>
  );
};
