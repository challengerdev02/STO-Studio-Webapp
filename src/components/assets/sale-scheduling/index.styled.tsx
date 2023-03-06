import styled, { keyframes } from 'styled-components';
import Text from 'antd/lib/typography/Text';
import { Card } from 'antd';

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const FormWrapperContainer = styled.div`
  & {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    gap: 50px;
  }
  input::placeholder,
  .ant-form-item-extra,
  .ant-picker-suffix {
    color: var(--text-color-secondary) !important;
  }
  .ant-form-item-explain-error {
    color: var(--danger) !important;
  }
  .label-text label {
    color: var(--item-hover-bg) !important;
  }
  .ant-radio-group.ant-radio-group-outline {
    overflow-x: auto;
    overflow-y: visible;
    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }
  .ant-radio-wrapper {
    color: var(--text-color-secondary) !important;
    span {
      white-space: nowrap !important;
    }
  }
  .ant-radio-wrapper-checked {
    color: var(--heading-color) !important;
  }
  .ant-radio-group {
    display: flex !important;
  }
  .ant-radio-inner::after {
    top: 7px !important;
    left: 7px !important;
    width: 16px !important;
    height: 16px !important;
  }

  .ant-form-item-label {
    font-weight: 700;
    font-size: 12px;
    line-height: 12px;
    text-transform: uppercase;
  }

  .ant-picker,
  .ant-input-number {
    width: 100% !important;
  }

  .ant-form-item-extra {
    font-weight: 400;
    font-size: 12px !important;
    line-height: 20px !important;
  }

  .ant-divider {
    border-top-color: var(--border) !important;
  }

  .ant-divider-horizontal {
    margin: 30px 0 40px 0 !important;
  }

  .summary-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  .submit-row {
    margin: 50px 0 !important;

    .ant-form-item-control-input-content {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      /* flex-wrap: wrap; */

      .ant-typography {
        font-weight: 700;
        font-size: 16px;
        line-height: 16px;
      }

      .ant-btn {
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        border-radius: 90px;
        display: flex;
        align-items: center;
        width: fit-content !important;
      }

      i {
        margin-left: 12px !important;
      }

      .auto-container {
        display: flex;
        align-items: center !important;
      }

      span.spin {
        /* animation: ${rotate} 2s linear infinite; */
        margin-left: 12px;

        i {
          margin: 0px !important;
          padding: 0px !important;
        }
      }
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    & {
      gap: 40px !important;
    }
  }

  @media only screen and (max-width: 480px) {
    & {
      gap: 40px !important;
      width: 100% !important;
    }
  }

  @media only screen and (max-width: 1439px) {
    & {
      width: 100%;
      padding: 24px;
    }
  }

  @media only screen and (min-width: 1440px) {
    & {
      padding-top: 50px;
    }
  }
`;

export const FormTitle = styled(Text)`
  color: var(--heading-color) !important;
  & {
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    letter-spacing: -0.02em;
  }

  @media only screen and (min-width: 1024px) {
    & {
      /* padding: 50px 277px!important; */
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    & {
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.01em;
    }
  }
  @media only screen and (max-width: 480px) {
    & {
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.01em;
    }
  }
`;

export const FormCard = styled(Card)`
  & {
    border: 0 !important;
    border-radius: 16px !important;
  }

  .ant-card-body {
    /* padding: 0px!important; */
  }

  @media only screen and (min-width: 1440px) {
    & {
      padding: 50px 160px !important;
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    & {
      padding: 64px !important;
    }
  }
  @media only screen and (max-width: 480px) {
    & {
      padding: 24px 16px !important;
    }
  }
`;

export const HorizontalContainer = styled.div`
  & {
    display: flex;
    gap: 20px;
  }

  .ant-row {
    flex-grow: 1;
  }

  .half-row {
    width: 50% !important;
  }

  @media only screen and (min-width: 1024px) {
    & {
      /* padding: 50px 277px!important; */
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    & {
      display: block;
    }

    .half-row {
      width: 100% !important;
    }
  }
  @media only screen and (max-width: 480px) {
    & {
      display: block;
    }

    .half-row {
      width: 100% !important;
    }
  }
`;
