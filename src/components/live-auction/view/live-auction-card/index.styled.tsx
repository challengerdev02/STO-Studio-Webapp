import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 414.11px;
  height: auto;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 497px;
  border-radius: 10px;
  overflow: hidden;
`;

export const AuctionCardImage = styled.img`
  width: 100%;
  object-fit: cover;
  min-height: 100%;
  border-radius: 10px;
`;

export const AuctionCardContent = styled.div`
  padding: 15px 0px;
`;

export const AuctionCardContentRow = styled.div`
  width: 100%;
  margin-bottom: 30px;
  margin-top: 10px;
`;
export const RowHeader = styled.h5`
  margin: 0;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

export const Details = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 413px) {
    width: 80%;
  }
`;

export const Detail = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 30px;
  margin: 2px 0 !important;
`;
export const Cell = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-color-secondary);
  display: flex;
  justify-content: flex-start;
`;
