import { Row } from 'antd';
import styled from 'styled-components';

export const TabRow = styled(Row)`
  b {
    color: var(--heading-color) !important;
    font-size: 16px !important;
    line-height: 24px !important;
  }
  h2 {
    font-weight: 600 !important;
    font-size: 24px !important;
    line-height: 32px !important;
  }
  .ant-tabs-nav-list {
    width: 100%;
  }
  p {
    margin-bottom: 0 !important;
    font-size: 14px !important;
    line-height: 24px !important;
  }

  .ant-tag-geekblue {
    background: var(--accent2) !important;
    border-color: var(--accent2) !important;
    padding: 5px !important;
    border-radius: 6px !important;
    //backdrop-filter: opacity(0.5);
  }
`;
