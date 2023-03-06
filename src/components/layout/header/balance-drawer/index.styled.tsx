import styled from 'styled-components';
import { Card, Drawer } from 'antd';

export const StyledDrawer = styled(Drawer)<{ borderRadius?: string }>`
  .ant-drawer-header {
    position: fixed !important;
    top: 10px;
    right: 24px;
    background: transparent !important;
    height: 44px;
    width: 44px;
    color: var(--heading-color) !important;
    border-bottom: 0 !important;
  }
  .ant-drawer-close {
    color: var(--heading-color) !important;
  }
  .ant-drawer-content {
    border: none !important;
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : '24px 24px 0 0'} !important;
  }

  .ant-typography {
    margin: 0 !important;
  }

  .balance-drawer-links {
    a {
      color: var(--heading-color) !important;
      font-size: 1.1rem !important;
      font-weight: 500 !important;
    }
  }

  .balance-token-selection {
    .ant-select-selector {
      .ant-select-selection-item {
        color: var(--heading-color);
        font-weight: 600;
        font-size: 24px;
      }
    }
  }
`;

export const StyledCard = styled(Card)`
  border: 1px solid var(--border) !important;

  .ant-card-meta-title {
    margin-bottom: 0 !important;
    h5.ant-typography {
      margin-bottom: 1em !important;
    }
    h3.ant-typography {
      margin-top: 0 !important;
    }
  }
  .ant-avatar {
    background: transparent !important;
  }
`;
