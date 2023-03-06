import styled from 'styled-components';

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
export const Img = styled.img`
  width: 100%;
  object-fit: cover;
  min-height: 100%;
`;

export const CurrencyWrapper = styled.span`
  color: rgba(69, 178, 107, 1) !important;
  text-transform: uppercase;
`;
export const DateWrapper = styled.span`
  color: var(--text-color-secondary);
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
`;

export const Row = styled.span`
  @media (max-width: 768px) {
    font-size: 14px !important;
  }
`;
