import { Row } from 'antd';
import styled from 'styled-components';

export const TabRow = styled(Row)`
  b {
    color: var(--heading-color) !important;
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
  }
`;
