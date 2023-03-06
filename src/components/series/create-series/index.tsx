import {
  Button,
  Col,
  Form,
  FormInstance,
  Image,
  Modal,
  Row,
  Select,
  Space,
} from 'antd';
import { DraggerProps } from 'antd/es/upload';
import { get } from 'lodash';
import {
  BoldText,
  Heading,
  InputField,
  MainWrapper,
  Text,
  TextAreaField,
  Title,
} from '@/components/book/create-book/index.styled';
import { ImageOverlay, IsomorphicUpload } from '@/components';
import React from 'react';
import { normalizeFileUpload, tagRender } from '@/shared/utils';
import { isDesktop, isMobile } from 'react-device-detect';
import { StyledModal } from '@/components/layout/header/fullscreen-menu/index.styled';

interface CreateSeriesProps {
  loading: boolean;
  visibility: boolean;
  onVisibilityChange: (visibility: boolean) => void;
  title: string;
  domain: string;
  initialValues?: Record<string, any>;
  uploadedFile?: Record<string, any>;
  form: FormInstance;
  onSubmit: (form: Record<string, any>) => void;
  draggerProps: DraggerProps;
  onGENRE_OPTIONSChange: (options: string[]) => void;
  categories: Record<string, any>[];
}
export const CreateSeries = (props: CreateSeriesProps) => {
  const {
    uploadedFile,
    title,
    onSubmit,
    form,
    initialValues,
    draggerProps,
    onGENRE_OPTIONSChange,
    categories,
    loading,
    onVisibilityChange,
    visibility,
    domain,
  } = props;

  const coverImage = get(uploadedFile, 'response.data.file.url');

  const formBody = (
    <MainWrapper
      className={'meta-form-container'}
      data-testid="wrapper"
      style={{ width: '100%' }}
    >
      {/*<Wrapper>*/}
      <Form
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
        form={form}
        initialValues={initialValues}
      >
        <Row gutter={8}>
          <Col sm={24} md={24} lg={24} xl={10} xxl={10}>
            <Form.Item noStyle>
              <IsomorphicUpload
                allowCrop={true}
                cropperProps={{
                  cropSize: {
                    width: 500,
                    height: 500,
                  },
                }}
                description={
                  <Space direction={'vertical'} size={10}>
                    <span>Drag file here or Click to upload</span>
                    <span style={{ color: 'var(--text-secondary-color)' }}>
                      Must be at least 500x500 pixels
                    </span>
                  </Space>
                }
                label={
                  <div>
                    <Title>Cover Image</Title>
                    <Text>Supported: JPG, PNG, GIF, SVG, GLB, GLTF.</Text>
                  </div>
                }
                draggerProps={draggerProps}
                name={'coverImage'}
                required
                hasFeedback
                getValueFromEvent={normalizeFileUpload}
                valuePropName="file"
              >
                {coverImage && (
                  <div>
                    <ImageOverlay
                      width={'100%'}
                      height={'100%'}
                      style={{ borderRadius: 12 }}
                    >
                      <i
                        className="mc-pencil-fill"
                        style={{ fontSize: '1.5em' }}
                      />
                    </ImageOverlay>
                    <Image
                      // width={'100%'}
                      //  className={'book-cover-image'}
                      preview={false}
                      src={coverImage}
                      fallback={uploadedFile?.thumbUrl}
                      placeholder={true}
                      alt=""
                    />
                  </div>
                )}
              </IsomorphicUpload>
            </Form.Item>
          </Col>
          <Col sm={24} md={24} lg={24} xl={14} xxl={14}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label={<BoldText>TITLE</BoldText>}
                  rules={[{ required: true, message: 'Please input title' }]}
                  hasFeedback
                  name="title"
                >
                  <InputField
                    placeholder='e. g. "Redeemable One Comic”'
                    data-testid="inputVal"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={<BoldText>Categories (Select only 2)</BoldText>}
                  name="genres"
                  rules={[
                    {
                      required: true,
                      message: 'Please a select genres',
                    },
                  ]}
                  hasFeedback
                >
                  <Select
                    tagRender={tagRender}
                    options={categories}
                    onChange={onGENRE_OPTIONSChange as never}
                    mode="multiple"
                    showArrow
                    placeholder="Select only 2 genres"
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      height: '48px',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={<BoldText>DESCRIPTION</BoldText>}
                  rules={[
                    { required: true, message: 'Please input a description' },
                  ]}
                  name="description"
                >
                  <TextAreaField
                    rows={7}
                    placeholder="Provide a detailed description of your item"
                    data-testid="textArea"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          {/*<Col span={24}>*/}
          {/*  <Form.Item>*/}
          {/*    <div className={'meta-flex meta-align-center meta-flex-j-f-e '}>*/}
          {/*      <Button*/}
          {/*        type={'primary'}*/}
          {/*        htmlType={'submit'}*/}
          {/*        shape={'round'}*/}
          {/*        loading={loading}*/}
          {/*      >*/}
          {/*        Create*/}
          {/*      </Button>*/}
          {/*    </div>*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}
        </Row>
      </Form>
      {/*</Wrapper>*/}
    </MainWrapper>
  );

  const header = <Heading style={{ fontSize: 30 }}>{title}</Heading>;

  const footer = (
    <Space className={'w-100 meta-flex-j-f-e'} align={'center'}>
      <Button
        shape={'round'}
        type={'primary'}
        disabled={loading}
        loading={loading}
        onClick={form.submit}
      >
        {domain == 'revise' ? 'Update' : 'Create'}
      </Button>
    </Space>
  );

  return (
    <>
      {isDesktop && (
        <Modal
          title={header}
          visible={visibility}
          onCancel={() => onVisibilityChange(false)}
          destroyOnClose
          centered={isMobile}
          width={'75vw'}
          footer={footer}
        >
          {formBody}
        </Modal>
      )}
      {isMobile && (
        <StyledModal
          title={header}
          centered
          visible={visibility}
          onCancel={() => onVisibilityChange(false)}
          width={'100vw'}
          bodyStyle={{
            overflow: 'hidden',
            height: 'calc(100vh - 145px)',
            padding: 24,
            paddingTop: 5,
          }}
          mask={false}
          destroyOnClose
          footer={footer}
        >
          {formBody}
        </StyledModal>
      )}
    </>
  );
};
