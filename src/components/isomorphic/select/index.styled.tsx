import styled from 'styled-components';
import { Select } from 'antd';

type SelectMenuProps = {
  background?: string;
  border?: string;
  height?: string;
};

export const SelectMenu = styled(Select)<SelectMenuProps>`
  background: ${(props) =>
    props.background || `var(--switch-background-color) !important`};
  border-radius: 100px !important;
  border: ${(props) => props.border || `none`};
  padding: 0 5px !important;
  height: ${(props) => props.height || `40px !important`};
  line-height: 24px !important;
  display: flex !important;
  align-items: center !important;

  .ant-select-arrow {
    color: var(--dropdown-arrow-color) !important;
  }
  .ant-select-selection-item {
    font-weight: 600 !important;
    font-size: 14px !important;
  }

  .down-arrow {
    position: absolute !important;
    top: -7px;
    right: -7px;
  }
`;
