import React, { ReactChildren, ReactNode, useState } from 'react';
import { Space } from 'antd';
import { StyledI, Texts, UploadDragger, Wrapper } from './index.styled';
import { FormItemProps } from 'antd/es/form';
import ImgCrop from 'antd-img-crop';
import { CropperProps } from 'react-easy-crop';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const MultiImageUploader = (props: { draggerProps: any }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { draggerProps } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(draggerProps.fileList);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    setFileList(info.fileList);
    draggerProps.onChange(info);
  };

  const uploadButton = (
    <div style={{ padding: 27 }}>
      <PlusOutlined />
      <div style={{ marginTop: 4 }}>Upload</div>
    </div>
  );
  const onBeforeUpload = async (file: RcFile) => {
    return (await draggerProps.beforeUpload(file)) || Upload.LIST_IGNORE;
  };

  return (
    <>
      <Upload
        beforeUpload={onBeforeUpload}
        action={draggerProps.action}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept={draggerProps.accept}
      >
        {fileList.length >= Number(process.env.NEXT_PUBLIC_MAX_PAGES ?? 100)
          ? null
          : uploadButton}
      </Upload>
      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

interface IsomorphicUploadProps extends FormItemProps {
  children?: ReactNode | ReactChildren;
  draggerProps: any;
  allowCrop?: boolean;
  description?: string | ReactNode;
  cropperProps?: Partial<CropperProps>;
  multiImage?: boolean;
  // onChange?: (info: any) => void;
}

export const IsomorphicUpload = (props: IsomorphicUploadProps) => {
  const {
    children,
    draggerProps,
    allowCrop,
    description,
    cropperProps,
    multiImage,
    ...formItemProps
  } = props;

  const dragger = (
    <UploadDragger {...draggerProps}>
      {children ? (
        children
      ) : (
        <Space
          direction="vertical"
          align="center"
          size="middle"
          className={'upload-link-placeholder'}
        >
          <StyledI className="mc-file-upload-line" />
          <Texts>{description ?? 'Drag file here or Click to upload'}</Texts>
        </Space>
      )}
    </UploadDragger>
  );

  return (
    <>
      {multiImage && (
        <Wrapper {...formItemProps}>
          {MultiImageUploader({ draggerProps })}
        </Wrapper>
      )}
      {!multiImage && (
        <>
          {allowCrop && (
            <Wrapper {...formItemProps}>
              <ImgCrop
                quality={1}
                // aspect={1 / 1}
                grid
                rotate
                minZoom={1}
                maxZoom={3}
                modalTitle={'Crop'}
                modalWidth={'50vw'}
                cropperProps={cropperProps}
                // beforeCrop={allowCrop}
              >
                {dragger}
              </ImgCrop>
            </Wrapper>
          )}
          {!allowCrop && <Wrapper {...formItemProps}>{dragger}</Wrapper>}
        </>
      )}
    </>
  );
};
