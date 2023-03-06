import styled from 'styled-components';

export const Create = styled.div`
  font-size: 48px;
  color: var(--text-color);
  font-weight: 700;

  @media (max-width: 400px) {
    font-size: 20px;
    width: 100%;
  }

  @media only screen and (min-width: 400px) and (max-width: 1024px) {
    font-size: 30px;
  }
`;

export const SeriesDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  flex-wrap: wrap;
  gap: 10px;
`;
