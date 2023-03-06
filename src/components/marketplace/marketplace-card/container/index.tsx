import { Card } from 'antd';
import styled from 'styled-components';
import { CoverComponent } from '../cover';

export interface MarketplaceCardContainerType {
  coverImg?: string;
  countDown?: string;
  menuItems?: string[];
  cover?: any;
  startDate?: Date | string | undefined;
  endDate?: Date | string | undefined;
  token_address?: string;
  token_id?: string;
  amount?: string;
  owner_of?: string;
  token_hash?: string;
  block_number_minted?: string;
  block_number?: string;
  contract_type?: string;
  name?: string;
  symbol?: string;
  token_uri?: string;
  metadata?: Record<string, any>;
  synced_at?: string;
  last_token_uri_sync?: string;
  last_metadata_sync?: string;
  cardType?: string;
  genres?: string[];
}

export const SpacedFlexContainer = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${(props: { width?: string }) => props.width || '100%'};
  }
`;
export const CoverCountDown = styled.div`
  & {
    background-color: var(--background-primary);
    display: inline;
    padding: 4px 10px;
    border-radius: 30px;
    line-height: 20px;
  }
`;

export const CurrencyIconContainer = styled.div<{ size?: number }>`
  & {
    svg {
      height: ${(props) => (props?.size ?? 18) + 'px'};
      width: ${(props) => (props?.size ?? 18) + 'px'};
    }
  }
`;

export const CustomStyledBox = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props: {
      width?: string;
      height?: string;
      borderRadius?: string;
      backgroundColor?: string;
      margin?: string;
      padding?: string;
    }) => props.width || 'inherit'};
    height: ${(props) => props.height || 'inherit'};
    border-radius: ${(props) => props.borderRadius || 'inherit'};
    margin: ${(props) => props.margin || 'inherit'};
    padding: ${(props) => props.padding || 'inherit'};
    background-color: ${(props) => props.backgroundColor || 'inherit'};
  }
`;

export const CustomCardColoredStyledBox = styled(CustomStyledBox)`
  & {
    background-color: var(--card-icon-background-color);
    left: -${(props: { position?: number }) => (props.position ? props.position * 10 : 0)}px;
  }
`;

export const MarketplaceCardContainer = styled(Card).attrs(
  (props: MarketplaceCardContainerType) => {
    return {
      cover:
        props.cover ||
        CoverComponent(
          props.menuItems ?? [],
          new Date(),
          (props.startDate! ?? new Date()) <= new Date()
            ? props.endDate!
            : props.startDate!,
          props.cardType
        ),
    };
  }
)`
  &.ant-card {
    border-radius: 16px !important;
    min-width: 250px;
  }

  .ant-card-cover {
    width: 100% !important;
    height: 177px !important;
    background-image: url(${(props: MarketplaceCardContainerType) =>
      props.coverImg ??
      props?.metadata!?.thumbnail ??
      props?.metadata!?.image});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    //border-radius: 16px 16px 0 0 !important;
    border-radius: ${(props: MarketplaceCardContainerType) =>
      props.cardType === 'series'
        ? '0 !important'
        : '16px 16px 0 0 !important'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    position: relative;
    padding: 18px 14px;
    margin: 0px !important;
  }
  .ant-card-body {
    width: 100% !important;
    height: ${(props: MarketplaceCardContainerType) =>
      props.cardType === 'series' ? '90px' : '143px'} !important;
    border-radius: 0 0 16px 16px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 18px 16px !important;
    gap: 5px;
  }

  .ant-dropdown-button {
    .ant-btn {
      display: none !important;
    }
    .ant-btn-icon-only {
      display: inline-block !important;
      border-radius: 200px !important;
      border: 0;
      color: var(--background-primary);

      background: var(--dropdown-background-color);
    }
  }

  .ant-divider-horizontal {
    border-top-color: var(--border) !important;
    margin: 12px 0 !important;
  }
  .anticon-heart {
    color: var(--accent-pink) !important;
  }
`;

export const StackImageContainer = styled(SpacedFlexContainer)`
  & {
    position: relative;
  }
  .stacked-img {
    border: 2px solid var(--background-primary);
    overflow: hidden;
    position: relative;
  }
`;
