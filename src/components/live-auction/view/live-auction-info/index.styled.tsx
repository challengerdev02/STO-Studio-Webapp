import styled from 'styled-components';
import { Typography } from 'antd';

const { Paragraph } = Typography;

export const AuctionInfo = styled.div`
  width: 100%;
  max-width: 485px;
  height: auto;
  overflow: hidden;
  margin-bottom: 16px;
  .ant-list-item-meta-description {
    color: var(--text-color) !important;
  }
`;

export const AuctionTitle = styled.h2`
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
`;

export const Auctioneer = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  color: var(--text-color-secondary);
`;
export const ItemDescription = styled(Paragraph)`
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 24px !important;
  color: var(--text-color-secondary) !important;
  margin: 16px 0px !important;

  .read_more {
    color: var(--text-color) !important;
    font-weight: normal !important;
    font-size: 16px !important;
    line-height: 24px !important;
  }
`;
