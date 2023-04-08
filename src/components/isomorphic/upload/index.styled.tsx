import styled from 'styled-components';
import { Form, Upload } from 'antd';
const { Dragger } = Upload;

export const UploadDragger = styled(Dragger)`
  border: none !important;
  //padding: 64px, 8px, 64px, 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  //min-height: 182px !important;
  border-radius: 12px !important;
  background: var(--dropdown-background-color-dark) !important;
  height: 260px !important;
  width: 350px !important;
  @media screen and (max-width: 768px) {
    width: 100% !important;
    height: 100% !important;
    //max-height: 257px !important;
  }

  .ant-upload-drag-container {
    //min-width: 640px;
    @media screen and (max-width: 768px) and (min-width: 600px) {
      //width: 380px;
    }
  }
`;

export const StyledI = styled.i`
  font-size: 25px;
`;

export const Texts = styled.div`
  color: var(--heading-color);
  font-size: 12px;
`;

export const Wrapper = styled<any>(Form.Item)`
  & {
    border-radius: 12px !important;
    min-height: 260px !important;
  }
  .ant-form-item-control-input-content {
    min-height: 260px !important;
    span:nth-of-type(1) {
      width: ${(props) => (props.cropperFullWidth ? '100%' : 'unset')};
      .ant-upload-drag {
        width: ${(props) =>
          props.cropperFullWidth ? '100% !important' : 'unset'};
      }
    }
  }

  .ant-upload {
    padding: 0 !important;
    height: max-content !important;
  }

  .ant-image {
    display: block !important;
    height: 100% !important;
    //border: 2px solid var(--border);
    //min-height: 260px !important;
  }

  .ant-image-img {
    // aspect-ratio: 1/1;
  }

  .upload-link-placeholder {
    height: 260px !important;
    width: 350px !important;
    justify-content: center;
    @media screen and (max-width: 768px) {
      width: 100% !important;
    }
  }

  .ant-upload.ant-upload-drag .ant-upload-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
`;
