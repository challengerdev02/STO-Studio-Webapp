import Form from 'antd/lib/form/Form';
import styled from 'styled-components';

export const AddAttributesForm = styled(Form)`
  & {
    width: 100%;
  }
  .ant-form-item {
    display: inline-flex !important;
    margin: 0 6px !important;
  }
  .ant-form-item-label {
    font-weight: 700;
    line-height: 12px;
    font-size: 12px;
  }

  .ant-form-text {
    display: block !important;
    width: 416px !important;
    font-size: 12px !important;
    font-weight: 400 !important;
    line-height: 20px !important;
    color: var(--text-color-secondary) !important;
    margin: -40px 0 40px 0 !important;
  }
  .ant-form-item-explain-error {
    color: var(--danger);
  }

  //.ant-form-item-name {
  //  width: 154px !important;
  //}
  //.ant-form-item-value {
  //  width: 113px !important;
  //}
  //.ant-form-item-type {
  //  width: 135px !important;
  //}
  //.remove-row {
  //  margin-left: auto;
  //  margin-bottom: 5px;
  //}
  .add-more-btn {
    margin-top: 10px;
    width: 120px !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 16px !important;
  }
  .ant-divider {
    border-color: var(--text-color) !important;
  }
  .form-unit-row {
    width: 100%;
    //display: flex;
    //margin-bottom: 12px;
    //align-items: start !important;
  }
  .ant-form-item-required::before {
    display: none !important;
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    .ant-form-text {
      margin: -40px 0 40px 0 !important;
      line-height: 20px;
      font-weight: 700;
    }
  }
  @media only screen and (max-width: 480px) {
    .ant-form-text {
      width: 300px !important;
      font-size: 12px;
      line-height: 12px;
      font-weight: 700;
    }

    .form-unit-row {
      //column-gap: 0 !important;
      //.ant-form-item {
      //  width: 100px !important;
      //  margin: 0 !important;
      //  padding: 5px !important;
      //}
    }
    .ant-row {
    }
  }
`;

export const FormFooter = styled.div`
  & {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px auto !important;
  }
  .ant-btn {
    width: 178px;
  }

  span {
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
  }
`;
