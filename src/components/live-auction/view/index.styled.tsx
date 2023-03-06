import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 955px;
  min-height: 859px;
  margin: auto;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;

  @media (max-width: 1112px) {
    column-gap: 30px;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }

  @media (max-width: 413px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const Col = styled.div`
  width: 50%;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 413px) {
    width: 100%;
  }
`;
export const TabWrapper = styled.div`
  margin-bottom: 10px;

  @media (max-width: 1112px) {
    width: 63% !important;
  }

  @media (max-width: 768px) {
    width: 130% !important;
  }

  @media (max-width: 413px) {
    width: 100% !important;
  }
`;
export const AuctionsListWrapper = styled.div`
  margin: 22px 0px 32px 0px !important;
`;
