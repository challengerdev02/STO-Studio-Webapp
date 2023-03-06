import styled from 'styled-components';
import { Button, Card, Divider } from 'antd';

export const Wrapper = styled(Card)`
  width: 100% !important;
  max-width: 485px !important;
  min-height: 345px !important;
  display: flex !important;
  flex-wrap: wrap !important;
  padding: 10px !important;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 64px 64px -48px rgba(31, 47, 70, 0.12) !important;
  border-radius: 16px !important;
  .ant-card-body {
    width: inherit !important;
  }
  @media (max-width: 413px) {
    padding: 10px 0px !important;
  }
`;

export const Row = styled.div`
  width: 100% !important;
  height: auto;
  display: flex;
  gap: 15px;

  @media (max-width: 413px) {
    flex-direction: column;
  }
`;

export const Col = styled.div`
  height: 74px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Ellipse = styled.div`
  width: 48px;
  height: 48px;
  background: var(--dropdown-background-color-dark);
  border-radius: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EllipseInner = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerTopRow = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  @media (max-width: 413px) {
    justify-content: center;
  }
`;
export const InnerBottomRow = styled.div`
  width: 100%;
  height: auto;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  @media (max-width: 413px) {
    justify-content: center;
  }
`;

export const BidBy = styled.span`
  color: var(--text-color-secondary);
  font-weight: 500 !important;
  font-size: 16px;
  line-height: 24px;
`;

export const user = styled.span`
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 24px;
  color: var(--text-color-primary) !important;
  margin: 0px 5px;
`;

export const CryptoValue = styled.span`
  font-weight: 500 !important;

  @media (max-width: 826px) {
    font-size: 20px;
  }
  @media (max-width: 413px) {
    font-size: 16px;
  }
`;

export const PriceEquivalent = styled.span`
  color: var(--text-color-secondary);
  margin: 0px 12px;
  font-weight: 500 !important;

  @media (max-width: 826px) {
    font-size: 20px;
  }
  @media (max-width: 413px) {
    font-size: 16px;
  }
`;

export const Hr = styled(Divider)`
  margin: 32px 0px !important;
  background: rgba(53, 57, 69, 1) !important;
`;

export const BidButton = styled(Button)`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 90px !important;
  font-weight: 700 !important;
  margin-top: 50px !important;
`;

export const TimeBlock = styled.div`
  height: auto;
  font-weight: 500 !important;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;
export const TimeValue = styled.span`
  height: auto;
  width: 100%;
  font-weight: 500 !important;
  display: flex;
  @media (max-width: 413px) {
    font-size: 18px;
    justify-content: center;
  }
`;

export const TimeLabel = styled.span`
  height: auto;
  width: 100%;
  color: var(--text-color-secondary);
  font-size: 16px;
  font-weight: 500 !important;
  display: flex;
  padding: 0 !important;
  @media (max-width: 413px) {
    justify-content: center;
  }
`;

export const Img = styled.img`
  width: 100%;
  object-fit: cover;
  min-height: 100%;
`;
