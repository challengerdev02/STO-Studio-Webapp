import React, { Fragment } from 'react';
import {
  AutoComplete,
  Button,
  Col,
  Form,
  FormInstance,
  Image,
  Row,
  Space,
  Tooltip,
} from 'antd';
import { IsomorphicUpload } from '../../isomorphic/upload';
import { AttributesCard } from '../../attribute';
import {
  AntSwitch,
  Arrow,
  BoldText,
  Heading,
  InputField,
  Line,
  MainWrapper,
  StyledButton,
  StyledCol,
  StyledI,
  Text,
  TextAreaField,
  Title,
  Wrapper,
} from '../../book/create-book/index.styled';
import { getRandomColorByString, normalizeFileUpload } from '@/shared/utils';
import { PlusOutlined } from '@ant-design/icons';
import { MainLoader } from '../../isomorphic/loader';
import { SeriesDiv } from './index.styled';
import { DraggerProps } from 'antd/es/upload';
import { BookNamespace } from '@/shared/namespaces/book';
import { ImageOverlay } from '@/components';
import { capitalize, get } from 'lodash';
import { isMobile } from 'react-device-detect';

interface CreateSceneProps {
  onSubmit: (form: Record<string, any>) => void;
  onAttributeModalVisibilityChange: (visibility: boolean) => void;
  book?: BookNamespace.Book;
  loading: boolean;
  attributes: Record<string, any>[];
  allArtists: Record<string, any>[];
  draggerProps: DraggerProps;
  uploadedFile?: Record<string, any>;
  initialValues?: Record<string, any>;
  form: FormInstance;
  title: string;
  assetDomain: 'revise' | 'create';
  goBack: () => void;
}

export const CreateScene = (props: CreateSceneProps) => {
  const {
    onSubmit,
    onAttributeModalVisibilityChange,
    attributes,
    allArtists,
    loading,
    draggerProps,
    uploadedFile,
    initialValues,
    form,
    title,
    assetDomain,
    goBack,
  } = props;

  const renderAllAttributes = attributes.map((attribute, key) => {
    return (
      <Col key={key} xs={24} sm={24} md={12} lg={8}>
        <AttributesCard
          backgroundColor={getRandomColorByString(attribute.title)}
          title={attribute.title ?? ''}
          bottomText={attribute.value ?? ''}
        />
      </Col>
    );
  });

  const coverImage = get(uploadedFile, 'response.data.file.url');

  return (
    <MainWrapper
      className={'meta-form-container'}
      data-testid="create-scene-container"
    >
      <Space wrap>
        <Tooltip title={'Go Back'}>
          <Button
            icon={
              <i
                className={'mc-arrow-left-2-line mc-3x'}
                style={{ fontSize: '2em' }}
              />
            }
            type={'text'}
            onClick={goBack}
          />
        </Tooltip>
        <Heading style={{ fontSize: '30px' }} data-testid="scene-header">
          {title}
        </Heading>
      </Space>

      <Wrapper>
        <Form
          layout="vertical"
          form={form}
          requiredMark={false}
          onFinish={onSubmit}
          initialValues={initialValues}
        >
          <Form.Item noStyle>
            <IsomorphicUpload
              label={
                <div>
                  <Title>Scene/Bonus Art Image</Title>
                  <Text>
                    Supported: JPG, PNG, GIF, SVG, GLB, GLTF. Max size: 2MB
                  </Text>
                </div>
              }
              allowCrop
              cropperProps={{
                cropSize: {
                  width: 500,
                  height: 500,
                },
              }}
              draggerProps={draggerProps}
              name={'coverImage'}
              required
              hasFeedback
              getValueFromEvent={normalizeFileUpload}
              valuePropName="file"
            >
              {coverImage && (
                <div className={'w-100 h-100'}>
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
                    width={'100%'}
                    className={'book-cover-image'}
                    preview={false}
                    src={coverImage}
                    fallback={uploadedFile?.thumbUrl}
                    placeholder={true}
                    alt={''}
                  />
                </div>
              )}
            </IsomorphicUpload>
          </Form.Item>

          <Form.Item
            label={<BoldText>TITLE</BoldText>}
            rules={[{ required: true, message: 'Please input title' }]}
            name="title"
            hasFeedback
          >
            <InputField placeholder="e. g. Redeemable One" />
          </Form.Item>

          <Form.Item
            label={
              <BoldText style={{ marginTop: 40 }}> DESCRIBE SCENE</BoldText>
            }
            rules={[{ required: true, message: 'Please input description' }]}
            name="description"
            hasFeedback
          >
            <TextAreaField
              rows={7}
              placeholder="Provide a detailed description of your item"
            />
          </Form.Item>

          <Form.Item>
            <Row gutter={[16, 16]} justify={'center'} align={'middle'} wrap>
              <Col span={18}>
                <Title>Explicit or sensitive content</Title>
              </Col>

              <Col span={6}>
                <Title style={{ textAlign: 'right' }}>
                  <Form.Item
                    noStyle
                    name="explicitContent"
                    valuePropName={'checked'}
                  >
                    <AntSwitch data-testid="explicit-content-switch" />
                  </Form.Item>
                </Title>
              </Col>
            </Row>
          </Form.Item>
          <Line />

          <Form.List name="artists">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Fragment key={key}>
                    <Form.Item label={<BoldText>ARTISTS</BoldText>}>
                      <Row style={{ display: 'flex' }} gutter={[16, 0]}>
                        <Col xs={20} sm={20} md={20} lg={22} xl={22}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Artist name is required',
                              },
                            ]}
                            {...restField}
                            name={[name, 'name']}
                            hasFeedback
                          >
                            <AutoComplete
                              style={{ width: '100%' }}
                              options={allArtists.map((artist, k) => ({
                                ...artist,
                                value: artist.name,
                                key: k,
                              }))}
                              placeholder="Artist Name"
                              filterOption={(
                                inputValue: string,
                                option: any
                              ) => {
                                if (!option!.name) {
                                  return false;
                                }
                                return (
                                  option!.name
                                    .toUpperCase()
                                    .indexOf(inputValue.toUpperCase()) !== -1
                                );
                              }}
                              onSelect={(inputValue: any, option: any) => {
                                let newData = form.getFieldsValue([
                                  'artists',
                                ]).artists;
                                newData[index] = {
                                  ...newData[index],
                                  address: option.walletAddress,
                                  name: inputValue,
                                };
                                form.setFieldsValue({ artists: newData });
                              }}
                            />
                          </Form.Item>
                        </Col>

                        {/*<Col xs={24} sm={24} md={7} lg={7} xl={7}>*/}
                        {/*  <Form.Item*/}
                        {/*    rules={[*/}
                        {/*      {*/}
                        {/*        required: true,*/}
                        {/*        message: 'Artist url is required',*/}
                        {/*      },*/}
                        {/*    ]}*/}
                        {/*    hasFeedback*/}
                        {/*    {...restField}*/}
                        {/*    name={[name, 'url']}*/}
                        {/*  >*/}
                        {/*    <InputField placeholder="Artist URL" />*/}
                        {/*  </Form.Item>*/}
                        {/*</Col>*/}

                        {/*<Col*/}
                        {/*  xs={isMobile ? 24 : 20}*/}
                        {/*  sm={isMobile ? 24 : 20}*/}
                        {/*  md={8}*/}
                        {/*  lg={8}*/}
                        {/*  xl={8}*/}
                        {/*>*/}
                        {/*  <Form.Item*/}
                        {/*    rules={[*/}
                        {/*      {*/}
                        {/*        required: true,*/}
                        {/*        message: 'Artist Wallet Address is required',*/}
                        {/*      },*/}
                        {/*    ]}*/}
                        {/*    hasFeedback*/}
                        {/*    {...restField}*/}
                        {/*    name={[name, 'address']}*/}
                        {/*  >*/}
                        {/*    <InputField placeholder="Wallet Address" />*/}
                        {/*  </Form.Item>*/}
                        {/*</Col>*/}
                        <Col
                          sm={isMobile ? 24 : 4}
                          md={isMobile ? 24 : 4}
                          lg={isMobile ? 24 : 2}
                          xl={isMobile ? 24 : 2}
                          className={'w-100'}
                        >
                          <Form.Item noStyle className={'w-100'}>
                            <div
                              className={
                                'meta-flex-center meta-flex w-100 h-100'
                              }
                            >
                              {' '}
                              <Tooltip title="Remove Artist" arrowPointAtCenter>
                                <Button
                                  type={isMobile ? 'default' : 'text'}
                                  onClick={() => remove(name)}
                                  danger
                                  shape="round"
                                  block={isMobile}
                                  icon={
                                    !isMobile && (
                                      <i
                                        className={'mc-close-line mc-2x'}
                                        style={{ fontSize: '1.5rem' }}
                                      />
                                    )
                                  }
                                >
                                  {isMobile ? 'Remove Artist' : ' '}
                                </Button>
                              </Tooltip>
                            </div>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Fragment>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    shape={'round'}
                    icon={<PlusOutlined />}
                    data-testid="btn2"
                  >
                    Add Artist Wallet Address
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Line />

          <Form.Item
            label={
              <div>
                <Title style={{ marginTop: 32 }}>Attributes</Title>
                <Text>Textual traits that show up as rectangles</Text>
              </div>
            }
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={8}>
                <StyledCol
                  className="ant-btn"
                  onClick={() => onAttributeModalVisibilityChange(true)}
                  data-testid="attributes-card"
                >
                  <AttributesCard
                    bottomText={'Add/Edit Attribute'}
                    icon={<StyledI className=" mc-plus-2-line" />}
                    backgroundColor="var(--heading-color)"
                  />
                </StyledCol>
              </Col>

              {renderAllAttributes}
            </Row>
          </Form.Item>

          <Form.Item>
            <SeriesDiv>
              <StyledButton
                data-testid="create-btn"
                shape="round"
                type="primary"
                htmlType="submit"
              >
                <Space size={10} align={'center'}>
                  <span>{capitalize(assetDomain)} Item</span>

                  {loading ? (
                    <MainLoader />
                  ) : (
                    <Arrow className="mc-arrow-right-2-line" />
                  )}
                </Space>
              </StyledButton>
              {/*<Title>*/}
              {/*  <span style={{ marginRight: 10 }}>Auto Saving</span>*/}
              {/*  <Image alt="img" src={AutoSaving} />*/}
              {/*</Title>*/}
            </SeriesDiv>
          </Form.Item>
        </Form>
      </Wrapper>
    </MainWrapper>
  );
};
