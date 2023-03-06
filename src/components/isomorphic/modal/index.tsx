import styled from 'styled-components';
import { Modal } from 'antd';

export const IsomorphicModal = styled(Modal)`
  .ant-modal-close-x {
    width: 32px !important;
    height: 32px !important;
    line-height: 0 !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: 50%;
  }

  .ant-modal-header {
    height: 100px;
    padding-top: 32px !important;
    padding-left: 60px !important;
    padding-right: 60px !important;
    border-bottom: none !important;
    border-radius: 20px 20px 0 0 !important;
  }

  .ant-modal-close {
    top: 32px !important;
    right: 60px !important;
    //transform: translateY(-50%);
    color: var(--heading-color) !important;
  }

  .ant-modal-title {
    height: 32px;
    display: flex;
    align-items: center;
    font-size: 32px !important;
  }

  .ant-modal-body {
    padding: 24px 60px 60px 60px !important;
  }

  .ant-modal-content {
    border-radius: 20px !important;
  }
  @media (max-width: 480px) {
    .ant-modal-header,
    .ant-modal-body {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }
    .ant-modal-close {
      right: 20px !important;
    }
    .ant-modal-footer {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
`;
