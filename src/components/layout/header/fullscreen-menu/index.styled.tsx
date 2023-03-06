import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  max-width: 100vw !important;
  width: 100vw !important;
  margin: 0 !important;
  padding: 0 !important;
  transform: none !important;
  max-height: 100% !important;
  min-height: 100% !important;
  //overflow: hidden !important;

  .ant-modal-content {
    border-radius: 0 !important;
    min-height: 100vh !important;
    height: inherit !important;
    //overflow: hidden !important;

    .modal-menu-links {
      padding: 24px;
      a {
        color: var(--text-color) !important;
        font-size: 1.25rem !important;
        font-weight: 600 !important;
      }
    }

    .meta-menu-footer-btn {
      .ant-space-item {
        width: 50%;
      }
    }

    .meta-menu-socials {
      .ant-btn {
        display: flex !important;
        align-items: center;
        justify-content: center;
        padding: 0 !important;
      }
    }
  }
  .ant-modal-close {
    display: none;
  }
  .ant-modal-footer {
    border-top: 1px solid var(--border) !important;
  }
`;
