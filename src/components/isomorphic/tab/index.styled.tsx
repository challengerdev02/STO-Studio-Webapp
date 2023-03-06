import styled from 'styled-components';
import { Tabs } from 'antd';

type TabsProps = {
  border?: string;
  height?: string;
  padding?: string;
  maxWidth?: string;
};

type WrapperProps = {
  maxWidth?: string;
};

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  max-width: ${(props) => props.maxWidth || '485px'};
  padding: 6px 6px 0px 6px !important;
  display: flex;

  @media (max-width: 1112px) {
    width: 150% !important;
  }
  @media (max-width: 768px) {
    width: 75%;
  }
  @media (max-width: 413px) {
    width: 100%;
  }
`;
export const Tab = styled(Tabs)<TabsProps>`
  width: 100%;
  color: var(--text-color-secondary) !important;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

  .ant-tabs-tab {
    border: none !important;
    background: transparent !important;
  }

  .ant-tabs-nav {
    .ant-tabs-nav-list {
      border: ${(props) => props.border || `2px solid !important`};
      border-radius: 36px !important;
      padding: ${(props) => props.padding || `6px !important`};
      height: ${(props) => props.height || `55px !important`};
    }
  }
  .ant-tabs-nav::before {
    border: none !important;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: var(--foreground) !important;
    }

    &.ant-tabs-tab {
      border: none !important;
      background: rgba(230, 232, 236, 1) !important;
      border-radius: 100px !important;
    }
  }
`;
