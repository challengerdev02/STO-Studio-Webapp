import styled from 'styled-components';
import { Card } from 'antd';

export const Wrapper = styled(Card)`
  border-radius: 16px !important;
  height: 108px;
  padding: 0 !important;
  background: var(--dropdown-background-color-dark) !important;

  .ant-card-body {
    //padding: 0 0 0 20px !important;
    //display: flex;
    //align-items: center;
    //justify-content: center;
    height: 100%;
  }
`;

export const Circle = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.div`
  font-weight: 700;
  color: var(--text-color);
  font-size: 12px;
`;
