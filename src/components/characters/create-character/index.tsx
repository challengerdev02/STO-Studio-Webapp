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
import { AttributesCard, IsomorphicUpload, MainLoader } from '@/components';
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
import { SeriesDiv } from './index.styled';
import { DraggerProps } from 'antd/es/upload';
import { BookNamespace } from '@/shared/namespaces/book';
import { ImageOverlay } from '@/components/account/edit/profile';
import { capitalize, get } from 'lodash';
import { isMobile } from 'react-device-detect';

interface CreateCharacterProps {
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

export const CreateCharacter = (props: CreateCharacterProps) => {
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
    <MainWrapper className={'meta-form-container'}>
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
        <Heading>{title}</Heading>
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
                  <Title>Character Image</Title>
                  <Text>
                    File types supported: JPG, PNG, GIF, SVG, GLB, GLTF. Max
                    size: 100 MB
                  </Text>
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
                    alt=""
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
            <InputField placeholder='e. g. "Redeemable One Comic Sence One' />
          </Form.Item>

          <Form.Item
            label={
              <BoldText style={{ marginTop: 40 }}> DESCRIBE CHARACTER</BoldText>
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
                    <AntSwitch />
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
                    <Form.Item
                      label={<BoldText>ARTISTS</BoldText>}
                      // extra={
                      //   <Text>
                      //     You will be provided a link that allows artists sign this book
                      //     to verify their contribution
                      //   </Text>
                      // }
                    >
                      <Row style={{ display: 'flex' }} gutter={[16, 0]}>
                        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
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
                                // //console.log(
                                //   `form.getFieldsValue('artists')`,
                                //   form.getFieldsValue(['artists'])
                                // );
                              }}
                            />
                            {/* <InputField placeholder="Name" /> */}
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Artist url is required',
                              },
                            ]}
                            hasFeedback
                            {...restField}
                            name={[name, 'url']}
                          >
                            <InputField placeholder="Artist URL" />
                          </Form.Item>
                        </Col>

                        <Col
                          xs={isMobile ? 24 : 20}
                          sm={isMobile ? 24 : 20}
                          md={8}
                          lg={8}
                          xl={8}
                        >
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: 'Artist Wallet Address is required',
                              },
                            ]}
                            hasFeedback
                            {...restField}
                            name={[name, 'address']}
                          >
                            <InputField placeholder="Wallet Address" />
                          </Form.Item>
                        </Col>
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
                                  // block
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
                    {fields.length > 1 && index !== fields.length - 1 && (
                      <Line />
                    )}
                  </Fragment>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    shape={'round'}
                    icon={<PlusOutlined />}
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
              <StyledButton shape="round" type="primary" htmlType="submit">
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
