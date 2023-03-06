import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 996px;
  min-height: 896px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  padding: 30px 0;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }

  @media (max-width: 413px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const Header = styled.h2`
  width: 100%;
  height: 56px;
  padding: 0 20px 0 0;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 413px) {
    width: 100%;
  }
`;

export const InnerWrapper = styled.div`
  width: 100%;
  min-height: 896px;
  margin-top: 20px;
`;
export const Row = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;
