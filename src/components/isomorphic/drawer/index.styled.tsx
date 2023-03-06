import styled from 'styled-components';
import { Drawer } from 'antd';

export const CustomDrawer = styled(Drawer)`
  .ant-drawer-header,
  .ant-drawer-content {
    background: transparent !important;
    border: 0 !important;
  }
  .ant-drawer-header {
    padding: 44px 24px !important;
  }
  .ant-drawer-body {
    background: var(--drawer-bg);
    border-radius: 40px;
  }
  .ant-drawer-content-wrapper {
    //height: 100% !important;
  }
  .ant-drawer-close {
    border: 1px solid var(--text-color-secondary) !important;
    border-radius: 48px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    color: var(--heading-color) !important;
    &:focus {
      color: var(--text-color-secondary) !important;
    }
  }

  @media only screen and (min-width: 1440px) {
    .ant-drawer-close {
      margin: 20px 54px;
      width: 40px;
      height: 40px;
    }
  }

  @media only screen and (min-width: 1024px) and (max-width: 1439px) {
    .ant-drawer-close {
      margin: 20px 40px;
    }
    .ant-drawer-body {
      margin: 21px 40px !important;
      padding: 40px 51.5px !important;
    }
  }
  @media only screen and (min-width: 480px) and (max-width: 1023px) {
    .ant-drawer-close {
      margin: 20px 40px;
    }
    .ant-drawer-body {
      margin: 21px 40px !important;
      padding: 40px 51.5px !important;
    }
  }
  @media only screen and (max-width: 479px) {
    .ant-drawer-close {
      //margin: 20px 40px;
      display: none !important;
    }
    .ant-drawer-body {
      margin: 0px !important;
      border-radius: 40px 40px 0 0;
      padding: 32px 24px !important;
    }
    .ant-drawer-header {
      padding: 15px 24px !important;
    }
  }
`;
