import { Drawer, Menu, Popover } from 'antd';
import styled from 'styled-components';

export const Header = styled.header`
  & {
    width: 100% !important;
    height: 81px !important;
    line-height: 0 !important;
    /* padding:  0px 200px!important; */
    display: flex !important;
    align-items: center;
    justify-content: start;
    /* margin-bottom: 20px; */
    //background: var(--header-background);
    backdrop-filter: blur(20px);
    z-index: 100;
    position: sticky;
    top: 0px;
    left: 0px;
    right: 0px;

    .toggle-menu {
      display: none !important;
      color: var(--heading-color) !important;
      background: transparent !important;
      i {
        font-size: 1.25rem !important;
      }
      .mc-search-line {
        font-size: 1rem !important;
      }
    }

    .button-list-desktop {
      flex-wrap: nowrap !important;
      margin: 0 !important;
    }
    .button-list-desktop-search-overlay {
      padding-top: 0 !important;
    }

    @media only screen and (min-width: 1024px) {
      & {
        padding: 0px 200px !important;
        border-bottom: 1px solid var(--border);
      }

      .mobile-list-desktop {
        display: none !important;
      }
    }
    @media only screen and (min-width: 1024px) and (max-width: 1439px) {
      & {
        padding: 0px 33px !important;
      }
    }
    @media only screen and (min-width: 768px) and (max-width: 1023px) {
      & {
        padding: 0px 33px !important;
        flex-wrap: wrap;
        justify-content: start;
        gap: 2px;
        height: 88px !important;
      }

      .button-list-desktop,
      .link-list,
      .ant-divider-vertical {
        display: none !important;
      }

      .toggle-menu {
        display: block !important;
      }

      .mobile-menu-layout {
        display: flex;
      }
    }
    @media only screen and (min-width: 481px) and (max-width: 767px) {
      & {
        //background: transparent !important;
        padding: 0px 24px !important;
        height: 81px !important;
      }

      .button-list-desktop,
      .link-list,
      .ant-divider-vertical {
        display: none !important;
      }

      .toggle-menu {
        display: block !important;
      }

      .mobile-menu-layout {
        display: flex;
      }
    }
    @media only screen and (max-width: 480px) {
      & {
        //background: transparent !important;
        padding: 0px 24px !important;
        height: 81px !important;
      }

      .button-list-desktop,
      .link-list,
      .ant-divider-vertical {
        display: none !important;
      }

      .toggle-menu {
        display: block !important;
      }

      .mobile-menu-layout {
        display: flex;
      }
    }
  }

  .ant-divider {
    /* border-color:var(--text-color)!important; */
    margin: 0px 16px 0px 32px !important;
    height: 40px !important;
  }

  .button-list {
    display: flex;
    column-gap: 12px;
    margin-left: auto;
    flex-wrap: wrap;
    row-gap: 2px;
    /* height: 40px; */
    align-items: center;

    .ant-form {
      margin-right: 6px !important;
    }

    .ant-input-affix-wrapper {
      padding: 0 0 0 10px;
      /* height: 40px; */
    }

    .ant-form-item-control-input {
      min-height: 10px !important;
    }

    .mc-search-line {
      margin: 0 !important;
    }

    @media only screen and (max-width: 768px) {
      & {
        margin-left: 0px;
        /* margin-top: 10px; */
        margin-left: auto;
      }
    }

    .ant-btn {
      font-weight: 700;
      font-size: 14px;
      //line-height: 16px;
    }
  }
  .button-list-mobile {
    margin-left: auto;
    .ant-btn.ant-btn-custom {
      display: flex !important;
      align-items: center;
      justify-content: center;
      height: 44px !important;
      width: 44px !important;
    }
  }

  .link-list {
    a {
      color: var(--text-color);
      margin: 0px 12px !important;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
    }
  }

  .ant-form-item {
    margin: 0px !important;

    .ant-input {
      border-right: 0 !important;
      //height: 40px;
    }
  }

  .ant-input-group-addon {
    background: transparent !important;
  }

  .ant-input-search-button {
    color: var(--text-color) !important;
    border-left: 0 !important;
    background: transparent !important;
  }

  .ant-input-search {
    width: 256px !important;
  }
`;

export const LogoContainer = styled.div`
  & {
    width: 140px !important;
    /* height: 32px !important; */
    padding: 0;
    //display: relative;
    .md-logo {
      display: block;
    }

    .sm-logo {
      display: none;
      width: 100px !important;
      // height: 32px !important;
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
      & {
        display: flex;
        width: auto !important;
      }

      .md-logo {
        display: none !important;
      }

      .sm-logo {
        display: block;
      }
    }
    @media only screen and (max-width: 480px) and (max-width: 800px) {
      & {
        display: flex;
        width: auto !important;

        .md-logo {
          display: none !important;
        }

        .sm-logo {
          display: block;
        }
      }
    }
  }
`;

export const Image = styled.img`
  & {
    width: 100% !important;

    // @media screen and (max-width: 480px) {
    //   & {
    //     width: 150px !important;
    //     height: 44px !important;
    //   }
    // }
  }
`;

export const HeaderMenu = styled(Menu)`
  &.ant-menu {
    transition: 2s;
    width: 100%;
  }

  &.ant-menu-hide {
    display: none;
  }
`;

export const HeaderDrawer = styled(Drawer)`
  .ant-drawer-content {
    width: 300px !important;
    height: auto !important;
    max-height: 90vh !important;
    padding: 10px 5px;
    border-radius: 20px;
    margin: 5px;
  }

  .ant-drawer-header,
  .ant-menu-root {
    border: 0 !important;
  }

  .ant-menu-title-content {
    font-weight: 700;
    font-size: 15px;
    line-height: 24px;
  }

  .ant-menu-item {
    border-radius: 12px;
    color: var(--picker-header-button);
  }

  .ant-menu-item-active {
    color: var(--text-color) !important;
  }

  .ant-menu-item::after {
    border-right: 0px !important;
  }

  .ant-drawer-body {
    overflow-x: hidden !important;
  }
`;

export const ConnectPopover = styled(Popover)`
  .list-item {
  }
`;
