import styled from 'styled-components';
import { Card } from 'antd';

export const Div = styled.div``;

export const Wrapper = styled(Card)`
  & {
    width: 282px !important;
    height: 500px !important;
    border-radius: 16px !important;
    border: 1px solid var(--border);
    cursor: pointer;
  }
  @media only screen and (min-width: 1024px) and (max-width: 1399px) {
    & {
      width: 299.5px !important;
    }
  }
  .ant-card-body {
    padding: 19px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100% !important;
  }
`;

export const StyledI = styled.i`
  font-size: 25px;
  vertical-align: middle;
`;

export const AddDiv = styled.div`
  display: flex;
  justify-content: center;
  background: var(--accent);
  width: 32px;
  height: 32px;
  margin: 0 auto;
  border-radius: 32px !important;
  align-items: center;
`;

export const Text = styled.div`
  color: var(--heading-color);
  font-size: 14px;
  font-weight: 700;
`;

export const AddInfo = styled.div`
  margin-top: 18px;
  color: var(--text-color-secondary) !important;
`;

export const Span = styled.span`
  color: var(--heading-color);
`;
