import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Image,
  // InputNumber,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { AttributesCard } from '@/components/attribute';
import { IsomorphicUpload } from '../../isomorphic/upload';
import {
  determineFileType,
  getRandomColorByString,
  normalizeFileUpload,
} from '@/shared/utils';
import { MainLoader } from '../../isomorphic/loader';
import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons';
import { DraggerProps } from 'antd/es/upload';
import { ImageOverlay } from '@/components';
import { capitalize, get } from 'lodash';
import {
  AntSwitch,
  Arrow,
  BoldText,
  Heading,
  InputField,
  Line,
  MainWrapper,
  SelectField,
  SeriesDiv,
  StyledButton,
  StyledCol,
  StyledI,
  Text,
  TextAreaField,
  Title,
  Wrapper,
} from './index.styled';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';
import { CheckCircleOutline } from 'antd-mobile-icons';
import { DraggerPropsParameters } from '@/containers';
import { VideoPlayer } from '@/components/video-player';

interface CreateItemProps {
  onSubmit: (form: Record<string, any>) => void;
  onSubmitInvitationCode: (values: Record<string, any>) => void;
  onAttributeModalVisibilityChange: (visibility: boolean) => void;
  onSeriesModalVisibilityChange: (visibility: boolean) => void;
  form: FormInstance;
  onGENRE_OPTIONSChange: (options: string[]) => void;
  ageOptions: Record<string, any>[];
  // GENRE_OPTIONSOptions: Record<string, any>[];
  seriesOptions: Record<string, any>[];
  // allArtists: Record<string, any>[];
  attributes: Record<string, any>[];
  uploadedFile?: Record<string, any>;
  initialValues?: Record<string, any>;
  loading: boolean;
  loadingUser: boolean;
  checkingInvitationCode: boolean;
  canCreate?: boolean;
  draggerProps: (options: DraggerPropsParameters) => DraggerProps;
  title: string;
  assetDomain: string;
  uploadedThumbnail?: Record<string, any>;
  goBack: () => void;
}

export const CreateItem = (props: CreateItemProps) => {
  const {
    onSubmit,
    form,
    // onGENRE_OPTIONSChange,
    // GENRE_OPTIONSOptions,
    ageOptions,
    seriesOptions,
    onAttributeModalVisibilityChange,
    attributes,
    loading,
    // allArtists,
    uploadedFile,
    draggerProps,
    initialValues,
    title,
    assetDomain,
    goBack,
    canCreate,
    // onSubmitInvitationCode,
    // checkingInvitationCode,
    loadingUser,
    onSeriesModalVisibilityChange,
    uploadedThumbnail,
  } = props;

  const [bookFileType, setItemFileType] = useState('image');

  const { query } = useRouter();

  const referredType = get(query, 'REFERRED_TYPE');

  const [assetType, setAssetType] = useState<null | 'book' | 'art' | 'others'>(
    'art'
  );

  const onAssetTypeChange = (type: null | 'book' | 'art' | 'others') => {
    setAssetType(type);
  };

  const renderAllAttributes = attributes?.map((attribute, key) => {
    return (
      <Col key={key} xs={24} sm={24} md={12} lg={8}>
        <AttributesCard
          backgroundColor={getRandomColorByString(attribute?.title)}
          title={attribute?.title ?? ''}
          bottomText={attribute?.value ?? ''}
        />
      </Col>
    );
  });

  const coverImage = get(uploadedFile, 'response.data.file.url');
  const thumbnail = get(uploadedThumbnail, 'response.data.file.url');
  useEffect(() => {
    if (assetDomain == 'revise') {
      onAssetTypeChange('book');
    }
  }, [assetDomain]);

  useEffect(() => {
    if (referredType === '1') {
      onAssetTypeChange('book');
    }
  }, [referredType]);

  const coverImageFileType = determineFileType(coverImage);
  useEffect(() => {
    if (coverImage) {
      setItemFileType(String(coverImageFileType));
    }
  }, [coverImage]);

  return (
    <MainWrapper className={'meta-form-container'} data-testid="wrapper">
      {loadingUser && !canCreate && (
        <Wrapper>
          {' '}
          <Space
            size={20}
            style={{ width: '100%', justifyContent: 'center' }}
            align={'center'}
          >
            <MainLoader height={50} width={50} />
          </Space>
        </Wrapper>
      )}
      {/*{!canCreate && !loadingUser && (*/}
      {/*  <Wrapper>*/}
      {/*    <Form*/}
      {/*      layout="vertical"*/}
      {/*      onFinish={onSubmitInvitationCode}*/}
      {/*      requiredMark={false}*/}
      {/*    >*/}
      {/*      <Typography.Title level={2}>*/}
      {/*        Enter your invitation code to continue.*/}
      {/*        <br />*/}
      {/*        <a*/}
      {/*          style={{ fontSize: '14px' }}*/}
      {/*          target={'_blank'}*/}
      {/*          href="https://zw25dm9hb9k.typeform.com/to/RPjfbMqq"*/}
      {/*          rel="noreferrer"*/}
      {/*        >*/}
      {/*          <Typography.Link>*/}
      {/*            Get a creator invitation code &#8594;*/}
      {/*          </Typography.Link>*/}
      {/*        </a>*/}
      {/*      </Typography.Title>*/}
      {/*      <Form.Item*/}
      {/*        // label={'Code'}*/}
      {/*        rules={[*/}
      {/*          {*/}
      {/*            required: true,*/}
      {/*            message: 'Please enter your invitation code',*/}
      {/*          },*/}
      {/*        ]}*/}
      {/*        hasFeedback*/}
      {/*        name="inviteCode"*/}
      {/*      >*/}
      {/*        <InputField*/}
      {/*          placeholder="Your code"*/}
      {/*          data-testid="invitation-code"*/}
      {/*        />*/}
      {/*      </Form.Item>*/}

      {/*      <Form.Item>*/}
      {/*        <SeriesDiv>*/}
      {/*          <StyledButton*/}
      {/*            shape="round"*/}
      {/*            type="primary"*/}
      {/*            style={{*/}
      {/*              display: 'flex',*/}
      {/*              alignItems: 'center',*/}
      {/*              justifyContent: 'center',*/}
      {/*              gap: '10px',*/}
      {/*            }}*/}
      {/*            htmlType="submit"*/}
      {/*            disabled={checkingInvitationCode}*/}
      {/*          >*/}
      {/*            <Space size={10} align={'center'}>*/}
      {/*              <span>Continue</span>*/}

      {/*              {checkingInvitationCode ? (*/}
      {/*                <MainLoader data-testid="loader" />*/}
      {/*              ) : (*/}
      {/*                <Arrow className="mc-arrow-right-2-line" />*/}
      {/*              )}*/}
      {/*            </Space>*/}
      {/*          </StyledButton>*/}
      {/*        </SeriesDiv>*/}
      {/*      </Form.Item>*/}
      {/*    </Form>*/}
      {/*  </Wrapper>*/}
      {/*)}*/}

      {assetType == null && canCreate && assetDomain != 'revise' && (
        <Wrapper>
          <div>
            <Typography.Title level={2}>
              What do you want to create?
            </Typography.Title>
            <Space
              style={{ paddingTop: 30 }}
              direction={'vertical'}
              size={30}
              className={'w-100'}
            >
              <Button
                style={{ width: '70%' }}
                shape={'round'}
                onClick={() => onAssetTypeChange('book')}
              >
                <div className="meta-flex meta-align-center meta-flex-s-b">
                  <span>Entire Item</span>
                  <Arrow className="mc-arrow-right-2-line" />
                </div>
              </Button>
              <Button
                style={{ width: '70%' }}
                shape={'round'}
                disabled
                onClick={() => onAssetTypeChange('others')}
              >
                <div className="meta-flex meta-align-center meta-flex-s-b">
                  <span>Character/Scene Art</span>
                  <span style={{ color: 'var(--text-color-secondary)' }}>
                    Coming soon
                  </span>
                  {/*<Arrow className="mc-arrow-right-2-line" />*/}
                </div>
              </Button>
            </Space>
          </div>
        </Wrapper>
      )}

      {['book', 'art'].includes(String(assetType)) && canCreate && (
        <>
          <Space wrap>
            {assetDomain !== 'create' && (
              <Tooltip title={'Go Back'}>
                <Button
                  icon={
                    <i
                      className={'mc-arrow-left-2-line mc-3x'}
                      style={{ fontSize: '1.2em' }}
                    />
                  }
                  type={'text'}
                  onClick={goBack}
                />
              </Tooltip>
            )}
            <Heading>{title}</Heading>
          </Space>
          <Wrapper>
            <Form
              layout="vertical"
              onFinish={onSubmit}
              requiredMark={false}
              form={form}
              initialValues={initialValues}
            >
              {assetDomain == 'create' && (
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                    <Form.Item
                      label={<BoldText>COLLECTION</BoldText>}
                      rules={[
                        {
                          required: true,
                          message: 'Please select a collection/series',
                        },
                      ]}
                      name={'assetCollection'}
                    >
                      <SelectField
                        placeholder="Select collection/series"
                        options={seriesOptions}
                        data-testid="selectSeries"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={' '}>
                      <Button
                        type={'dashed'}
                        shape={'round'}
                        htmlType={'button'}
                        // href={'/assets/series/create?referrer=/assets/create'}
                        icon={<PlusOutlined />}
                        onClick={() => onSeriesModalVisibilityChange(true)}
                      >
                        Create New Collection
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              )}
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Form.Item noStyle>
                    <IsomorphicUpload
                      className={'thumbnailUpload'}
                      allowCrop={true}
                      cropperProps={{
                        cropSize: {
                          width: 500,
                          height: 500,
                        },
                      }}
                      description={
                        <span>
                          Drag file here or click to upload.
                          <br />
                        </span>
                      }
                      label={
                        <div>
                          <Title>Thumbnail</Title>
                          <Text>
                            File types supported: JPG, JPEG, PNG, GIF, SVG,
                            WEBP.
                          </Text>
                        </div>
                      }
                      draggerProps={draggerProps({
                        key: 'uploadThumbnail',
                        fileSize: 50000000,
                        // maxDimensions: [2500, 2500],
                        minDimensions: [500, 500],
                        type: 'image',
                      })}
                      name={'thumbnail'}
                      required
                      hasFeedback
                      getValueFromEvent={normalizeFileUpload}
                      valuePropName="file"
                    >
                      {thumbnail && (
                        <div>
                          <ImageOverlay
                            width={'100%'}
                            height={'100%'}
                            style={{ borderRadius: 12, overflow: 'hidden' }}
                          >
                            <i
                              className="mc-pencil-fill"
                              style={{ fontSize: '1.5em' }}
                            />
                          </ImageOverlay>
                          <Image
                            width={isMobile ? '100%' : '100%'}
                            // height={'250px'}
                            //  className={'item-cover-image'}
                            preview={false}
                            src={thumbnail}
                            fallback={uploadedThumbnail?.thumbUrl}
                            placeholder={true}
                            alt=""
                          />
                        </div>
                      )}
                    </IsomorphicUpload>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                  <Form.Item noStyle>
                    <IsomorphicUpload
                      multiImage={bookFileType == 'image'}
                      allowCrop={false}
                      cropperProps={{
                        cropSize: {
                          width: 20,
                          height: 7000,
                        },
                      }}
                      className={'coverUpload'}
                      label={
                        <div>
                          <Title>Cover/Strip/Scenes</Title>
                          {assetDomain != 'revise' && (
                            <Space>
                              <Button
                                onClick={() => setItemFileType('image')}
                                style={{
                                  fontWeight:
                                    bookFileType == 'image' ? 'bold' : '',
                                }}
                                type={'text'}
                              >
                                <Space>
                                  {bookFileType == 'image' ? (
                                    <CheckCircleFilled />
                                  ) : (
                                    <CheckCircleOutline />
                                  )}
                                  Image
                                </Space>
                              </Button>
                              <Button
                                onClick={() => setItemFileType('video')}
                                style={{
                                  fontWeight:
                                    bookFileType == 'video' ? 'bold' : '',
                                }}
                                type={'text'}
                              >
                                <Space>
                                  {bookFileType == 'video' ? (
                                    <CheckCircleFilled />
                                  ) : (
                                    <CheckCircleOutline />
                                  )}
                                  Video
                                </Space>
                              </Button>
                            </Space>
                          )}
                          <Text>
                            <span>
                              File types supported:{' '}
                              {bookFileType == 'image'
                                ? 'JPG, JPEG, WEBP, PNG, GIF.'
                                : ' MP4, AVI, MOV, WEBM, WMV, MKV, FLV'}
                              .{' '}
                              <a
                                target={'_blank'}
                                href={
                                  'https://metacomic.tawk.help/article/how-to-create-a-new-asset'
                                }
                                rel="noreferrer"
                              >
                                See example
                              </a>
                            </span>
                          </Text>
                        </div>
                      }
                      draggerProps={draggerProps({
                        key: 'upload',
                        fileSize: bookFileType == 'image' ? 100000 : 100000,
                        type: bookFileType,
                        minDimensions:
                          bookFileType == 'image' ? [800, 500] : undefined,
                        maxDimensions:
                          bookFileType == 'image'
                            ? [5240, 70000000000]
                            : undefined,
                        accept: bookFileType == 'image' ? undefined : 'video/*',
                        multiple: bookFileType == 'image',
                      })}
                      name={'coverImage'}
                      required
                      hasFeedback
                      getValueFromEvent={normalizeFileUpload}
                      valuePropName="file"
                    >
                      {coverImage && (
                        <div>
                          {/*{coverImageFileType == 'image' && (*/}
                          <ImageOverlay
                            width={'100%'}
                            //height={'100%'}
                            style={{
                              borderRadius: 12,
                              overflow: 'hidden',
                              maxHeight: '100%',
                            }}
                          >
                            <i
                              className="mc-pencil-fill"
                              style={{ fontSize: '1.5em' }}
                            />
                          </ImageOverlay>
                          {/*)}*/}
                          {coverImageFileType === 'video' && (
                            <VideoPlayer
                              src={coverImage}
                              style={{ maxHeight: '300px' }}
                              poster={uploadedFile?.thumbUrl}
                              // style={{ maxHeight: '500px' }}
                            />
                          )}
                          {/*{coverImageFileType === 'image' && (*/}
                          {/*  <Image*/}
                          {/*    // width={'100%'}*/}
                          {/*    style={{ maxHeight: '500px' }}*/}
                          {/*    //  className={'book-cover-image'}*/}
                          {/*    preview={false}*/}
                          {/*    src={coverImage}*/}
                          {/*    fallback={uploadedFile?.thumbUrl}*/}
                          {/*    placeholder={true}*/}
                          {/*    alt=""*/}
                          {/*  />*/}
                          {/*)}*/}
                        </div>
                      )}
                    </IsomorphicUpload>
                  </Form.Item>
                </Col>
              </Row>

              <Title style={{ margin: '40px 0 32px' }}>
                Item/Episode Details
              </Title>
              <Row gutter={[20, 20]}>
                <Col sm={24} md={24} lg={16} xl={16}>
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
                <Col sm={24} md={24} lg={8} xl={8}>
                  <Form.Item
                    label={<BoldText>INFO LINK/WEBSITE</BoldText>}
                    rules={[
                      { required: false, message: 'Please input info link' },
                      { type: 'url', message: 'Please input valid url' },
                    ]}
                    name="infoLink"
                    hasFeedback
                  >
                    <InputField placeholder="e. g. “https://your-url.com”" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label={<BoldText> DESCRIBE BOOK</BoldText>}
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
              <Line />
              <Row gutter={[16, 16]}>
                {/*<Col xs={24} sm={24} md={12} lg={12} xl={12}>*/}
                {/*  <Form.Item*/}
                {/*    label={<BoldText>GENRE_OPTIONS</BoldText>}*/}
                {/*    name="genres"*/}
                {/*    rules={[*/}
                {/*      { required: true, message: 'Please a select GENRE_OPTIONS' },*/}
                {/*    ]}*/}
                {/*    hasFeedback*/}
                {/*  >*/}
                {/*    <SelectField*/}
                {/*      tagRender={tagRender}*/}
                {/*      options={GENRE_OPTIONSOptions}*/}
                {/*      onChange={onGENRE_OPTIONSChange as never}*/}
                {/*      mode="multiple"*/}
                {/*      showArrow*/}
                {/*      placeholder="Select GENRE_OPTIONS"*/}
                {/*    />*/}
                {/*  </Form.Item>*/}
                {/*</Col>*/}

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    label={<BoldText>AGE RATING</BoldText>}
                    name="ageRating"
                    hasFeedback
                    rules={[
                      { required: true, message: 'Please a select age rating' },
                    ]}
                  >
                    <SelectField
                      placeholder="Select age rating"
                      options={ageOptions}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Line />

              <Form.List name="artists">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => {
                      //console.log(restField, [name, 'name'], key);
                      return (
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
                                  name={[index, 'name']}
                                  {...restField}
                                  hasFeedback
                                >
                                  <InputField
                                    style={{ width: '100%' }}
                                    placeholder="Artist Name"
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
                                <Form.Item className={'w-100'} label={''}>
                                  <div
                                    className={
                                      'meta-flex-center meta-flex w-100 h-100'
                                    }
                                  >
                                    {' '}
                                    <Tooltip
                                      title="Remove Artist"
                                      arrowPointAtCenter
                                    >
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
                      );
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        shape={'round'}
                        icon={<PlusOutlined />}
                        data-testid="btn2"
                      >
                        Add another artist
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Line />

              <Form.Item>
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  justify={'center'}
                  align={'middle'}
                  wrap
                >
                  <Col span={18} style={{ height: '100%' }}>
                    <Title>Explicit or sensitive content</Title>
                  </Col>

                  <Col span={6} className={'meta-flex meta-flex-center'}>
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

              <Form.Item>
                <SeriesDiv>
                  <StyledButton
                    shape="round"
                    type="primary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                    htmlType="submit"
                    disabled={loading}
                  >
                    <Space size={10} align={'center'}>
                      <span>{capitalize(assetDomain)} Item</span>

                      {loading ? (
                        <MainLoader data-testid="loader" />
                      ) : (
                        <Arrow className="mc-arrow-right-2-line" />
                      )}
                    </Space>
                  </StyledButton>
                </SeriesDiv>
              </Form.Item>
            </Form>
          </Wrapper>
        </>
      )}
    </MainWrapper>
  );
};
