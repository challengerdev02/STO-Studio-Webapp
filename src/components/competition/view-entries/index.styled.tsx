import styled from 'styled-components';
import { Drawer } from 'antd';

export const StyledDrawer = styled(Drawer)<{ borderRadius?: string }>`
  .ant-drawer-close {
    margin-left: auto !important;
    margin-right: 10px !important;
    width: 70px;
    position: absolute;
    right: 0;
  }
  //.ant-drawer-header {
  //  //position: fixed !important;
  //  //top: 10px;
  //  //right: 24px;
  //  display: flex;
  //  align-items: center;
  //  background: var(--header-background) !important;
  //  color: var(--heading-color) !important;
  //  min-height: 100px;
  //  //height: 60px;
  //  padding: 5px;
  //  border: none !important;
  //  position: sticky !important;
  //  top: 0;
  //  backdrop-filter: blur(20px);
  //  z-index: 100;
  //}
  //.ant-drawer-close {
  //  //color: var(--heading-color) !important;
  //  display: none !important;
  //}
  .ant-drawer-body {
    padding: 15px !important;
    flex-grow: unset;
  }
  .ant-drawer-content {
    border: none !important;
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : '24px 24px 0 0'} !important;
  }

  .ant-typography {
    margin: 0 !important;
  }
`;
