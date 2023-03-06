import React from 'react';
import { List } from 'antd';
import { truncate } from 'lodash';
import { format } from 'date-fns';
import {
  CurrencyWrapper,
  DateWrapper,
  Ellipse,
  EllipseInner,
  Img,
  Row,
} from './index.styled';

interface LiveAuctionListProps {
  data: Record<string, any>[];
}

export const LiveAuctionList = (props: LiveAuctionListProps) => {
  const { data } = props;
  return (
    <List
      data-testid="live-auction-list"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Ellipse>
                <EllipseInner>
                  {' '}
                  <Img
                    src={item.userAvatar}
                    alt=""
                    width="26px"
                    height="28px"
                  />
                </EllipseInner>
              </Ellipse>
            }
            title={
              <Row>
                <span data-testid="crypto_value">{item.cryptoValue}</span>{' '}
                <CurrencyWrapper data-testid="currency_type">
                  {item.cryptoCurrency}
                </CurrencyWrapper>{' '}
                <span>by </span>{' '}
                <span title={item.user} data-testid="user">
                  {truncate(`${item.user}`, {
                    length: 20,
                  })}
                </span>
              </Row>
            }
            description={
              <DateWrapper data-testid="date">
                {format(new Date(item.date), 'yyyy-MM-dd, HH:mm aaa')}
              </DateWrapper>
            }
          />
        </List.Item>
      )}
    />
  );
};
