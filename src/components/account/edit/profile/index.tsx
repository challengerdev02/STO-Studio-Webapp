import { MainLoader } from '@/components';
import {
  CopyOutlined,
  EyeOutlined,
  InstagramOutlined,
  LoadingOutlined,
  RedditOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Image,
  Input,
  Row,
  Space,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import DefaultCoverImage from '../../../../../public/profile-cover-photo.svg';
import Title from 'antd/lib/typography/Title';
import Avatar from 'antd/lib/avatar/avatar';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ImageOverlay, ImagePlaceholder } from './index.styled';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { debounce, get } from 'lodash';
import { copyToClipboard, onBeforeImageUpload, Storage } from '@/shared/utils';
import {
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
} from '@/shared/constants';
import { encode as base64_encode } from 'base-64';
import ImgCrop from 'antd-img-crop';

export { ImageOverlay } from './index.styled';

const { TextArea } = Input;
const { Text } = Typography;
interface ProfileEditFormProps {
  onFinish: (data: any) => void;
  handlePreview?: (e: any) => void;
  loading: boolean;
  $record: Record<string, any>;
  uploadAvatarProps: Record<string, any>;
  uploadCoverProps: Record<string, any>;
  form: FormInstance;
  onValidateUsername: (event: ChangeEvent<HTMLInputElement>) => void;
  isValidUsername: boolean;
  validatingUsername: boolean;
}

export const Profile = (props: ProfileEditFormProps) => {
  const {
    onFinish,
    loading,
    $record,
    uploadAvatarProps,
    uploadCoverProps,
    handlePreview,
    form,
    onValidateUsername,
    isValidUsername,
    validatingUsername,
  } = props;

  type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];
  const [validateStatus, setValidateStatus] = useState<{
    status: ValidateStatus;
    errorMsg: string | null;
  }>();

  let db: any = null;
  let onChange = (_event: ChangeEvent<HTMLInputElement>) => {
    setValidateStatus({
      status: 'success',
      errorMsg: null,
    });
    const value = String(form.getFieldValue('username'));

    if (!value || value?.trim() == '') {
      setValidateStatus({
        status: 'error',
        errorMsg: 'Username is required',
      });
      return;
    }
    //console.log('VALUUUE', value);
    if (value.includes(' ') || value.includes('/t')) {
      setValidateStatus({
        status: 'error',
        errorMsg: 'Username cannot contain whitespace',
      });
      return;
    }
    if (!value.match(/^[a-zA-Z0-9\_\-]+$/)) {
      setValidateStatus({
        status: 'error',
        errorMsg:
          'Invalid username. Can only contain letters, numbers, hyphens (-), and underscores (_)',
      });
      return;
    }
    if (db) {
      db.cancel();
    }
    db = debounce(() => onValidateUsername(_event), 500);
    db();
  };
  const onInitialValues = () => {
    form.setFieldsValue({
      username: form.getFieldValue('username') ?? $record?.username,
      email: form.getFieldValue('email') ?? $record?.emailAccount?.email,
      walletAddress:
        form.getFieldValue('walletAddress') ?? $record?.walletAddress,
      bio: form.getFieldValue('bio') ?? $record?.bio,
      avatar: form.getFieldValue('avatar') ?? $record?.avatar,
      cover: form.getFieldValue('cover') ?? $record?.banner,
      socials: form.getFieldValue('socials') ?? $record?.socials,
    });
  };

  useEffect(() => {
    form.resetFields();
    onInitialValues();
  }, [$record._id]);

  useEffect(() => {
    setValidateStatus({
      status: isValidUsername ? 'success' : 'error',
      errorMsg: isValidUsername
        ? null
        : 'Username is already taken. Please choose another username',
    });
  }, [isValidUsername]);

  const storage = new Storage(
    WEB3_SIGNATURE_STORAGE_KEY,
    {},
    {
      set: WEB3_SIGNATURE_STORAGE_SET_KEY,
    }
  );
  const signature = base64_encode(JSON.stringify(storage.get()));

  return (
    <div className="content-profile">
      <Title level={1} className="title">
        <span>Profile Settings</span>
        <Button
          data-testid={'preview-button'}
          onClick={handlePreview}
          shape="round"
          icon={<EyeOutlined />}
        >
          Preview
        </Button>
      </Title>

      <Form
        layout="vertical"
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        hideRequiredMark={false}
      >
        <Row>
          <Col
            md={{ span: 24 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
            className="left-fields"
          >
            <Form.Item
              label="Username"
              name="username"
              trigger={'onChange'}
              help={validateStatus?.errorMsg ?? ''}
              validateStatus={validateStatus?.status}
              // rules={[
              //   { required: true, message: 'Username is required' },
              //   {
              //     whitespace: true,
              //     message: 'Username cannot contain whitespace',
              //   },
              //   {
              //     pattern: /^[a-zA-Z0-9\_\-]+$/,
              //     message:
              //       'Invalid username. Can only contain letters, numbers, hyphens (-), and underscores (_)',
              //   },
              //   ({}) => ({
              //     validator(_, value) {
              //       if (
              //         !value ||
              //         $record?.username === value ||
              //         isValidUsername
              //       ) {
              //         return Promise.resolve(true);
              //       }
              //       return Promise.reject(
              //         new Error(
              //           'Username already taken. Please choose another username.'
              //         )
              //       );
              //     },
              //   }),
              // ]}
            >
              <Input
                autoFocus={true}
                placeholder={
                  "Your username as you'd like it to be displayed on Metacomics."
                }
                // onBlur={debounce(onValidateUsername, 500)}
                onChange={onChange}
                suffix={validatingUsername ? <LoadingOutlined spin /> : null}
              />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Email address is required' },
                {
                  whitespace: true,
                  message: 'Email address cannot contain whitespace',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
                {
                  type: 'string',
                  message: 'Please enter a valid email address',
                },
              ]}
            >
              <Input
                type={'email'}
                placeholder={"What's your email address?"}
              />
            </Form.Item>
            <Form.Item label="Bio" name="bio">
              <TextArea rows={4} placeholder={'Tell the world your story!'} />
            </Form.Item>
            <Form.Item>
              <Title level={3}>Social profiles</Title>
              <Text>Let people connect with you.</Text>
            </Form.Item>
            <Form.Item
              label="Twitter"
              // name={['socials', 'twitter']}
              hasFeedback
            >
              <Row justify={'space-between'}>
                <Col>
                  <Space>
                    <b>@{$record?.socials?.twitter ?? 'your-twitter-handle'}</b>
                  </Space>
                </Col>

                <Col>
                  <Button
                    href={`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter/connect?x-signed-data=${signature}`}
                    target={'_blank'}
                    shape={'round'}
                    // size={'small'}
                    type={'default'}
                    icon={<TwitterOutlined />}
                  >
                    {/*<div className={'h100 meta-i-flex'}>*/}
                    {!$record?.socials?.twitter ? 'Connect' : 'Reconnect'}
                    {/*</div>*/}
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              label="Reddit"
              // name={['socials', 'twitter']}
              hasFeedback
            >
              <Row justify={'space-between'}>
                <Col>
                  <Space>
                    <b>u/{$record?.socials?.reddit ?? 'your-reddit-handle'}</b>
                  </Space>
                </Col>

                <Col>
                  <Button
                    href={`${process.env.NEXT_PUBLIC_API_URL}/auth/reddit/connect?x-signed-data=${signature}`}
                    target={'_blank'}
                    shape={'round'}
                    // size={'small'}
                    type={'default'}
                    icon={<RedditOutlined />}
                  >
                    {/*<div className={'h100 meta-i-flex'}>*/}
                    {!$record?.socials?.reddit ? 'Connect' : 'Reconnect'}
                    {/*</div>*/}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              label="Instagram"
              //  name={['socials', 'instagram']}
              hasFeedback
            >
              <Row justify={'space-between'}>
                {
                  <Col>
                    <Space>
                      <b>
                        @
                        {$record?.socials?.instagram ?? 'your-instagram-handle'}
                      </b>
                    </Space>
                  </Col>
                }
                <Col>
                  <Button
                    href={`${process.env.NEXT_PUBLIC_API_URL}/auth/instagram/connect?x-signed-data=${signature}`}
                    target={'_blank'}
                    shape={'round'}
                    type={'default'}
                    icon={<InstagramOutlined />}
                  >
                    {!$record?.socials?.instagram ? 'Connect' : 'Reconnect'}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              label="Your patreon page handle (not entire url)"
              name={'patreon'}
              rules={[
                {
                  type: 'string',
                  message: 'Please enter a patreon page handle',
                },
                { required: false },
              ]}
            >
              <Input
                placeholder={'Your patreon page handle (not entire URL)'}
              />
            </Form.Item>

            <Form.Item
              label="Your website"
              name={'website'}
              rules={[
                {
                  type: 'url',
                  message: 'Please enter a valid URL',
                },
                { required: false },
              ]}
            >
              <Input
                defaultValue={$record?.website}
                placeholder={'https://www.your-site.io'}
              />
            </Form.Item>
            <Form.Item>
              <Title level={3}>Your wallet address</Title>
            </Form.Item>
            <Form.Item label="Wallet Address">
              <Input.Group compact>
                <Input
                  style={{ width: 'calc(100% - 200px)' }}
                  defaultValue={$record?.walletAddress}
                  placeholder={$record?.walletAddress}
                  disabled={true}
                />
                <Tooltip title="copy address">
                  <Button
                    icon={<CopyOutlined />}
                    onClick={() =>
                      copyToClipboard($record?.walletAddress ?? 'N/A')
                    }
                  />
                </Tooltip>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col
            md={{ span: 24 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
            xxl={{ span: 12 }}
            className="right-fields"
          >
            <Form.Item label="Profile Image">
              <ImgCrop
                quality={1}
                // aspect={1 / 1}
                grid
                rotate
                minZoom={1}
                maxZoom={5}
                modalTitle={'Crop'}
                modalWidth={'50vw'}
                cropperProps={{
                  cropSize: {
                    width: 500,
                    height: 500,
                  },
                }}
                beforeCrop={(file) => onBeforeImageUpload(file, 10240)}
                // beforeCrop={allowCrop}
              >
                <Upload {...uploadAvatarProps}>
                  {$record?.avatar ? (
                    <div>
                      <ImageOverlay width={'80px'} height={'80px'}>
                        <i
                          className="mc-pencil-fill"
                          style={{ fontSize: '1.5em' }}
                        />
                      </ImageOverlay>
                      <Avatar
                        style={{
                          transition: '2s',
                          opacity:
                            $record.uploadStates.avatar ||
                            $record.loadings.avatarLoading
                              ? 0.2
                              : 1,
                        }}
                        data-testid="user-avatar"
                        src={$record?.avatar}
                        size={80}
                      />
                    </div>
                  ) : (
                    <Avatar
                      style={{
                        transition: '2s',
                        opacity:
                          $record.uploadStates.avatar ||
                          $record.loadings.avatarLoading
                            ? 0.2
                            : 1,
                      }}
                      data-testid="user-avatar"
                      size={80}
                      icon={
                        <GradientAvatar
                          size={80}
                          value={get($record, 'walletAddress', 'Metacomics')}
                        />
                      }
                    />
                  )}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item label="Profile Banner">
              <Upload {...uploadCoverProps} data-testid={'cover-image-upload'}>
                <ImageOverlay size={$record?.banner ? '100%' : '200px'}>
                  <i className="mc-pencil-fill mc-2x" />
                </ImageOverlay>
                {$record?.banner ? (
                  <Image
                    style={{
                      transition: '2s',
                      opacity:
                        $record.uploadStates.banner ||
                        $record.loadings.bannerLoading
                          ? 0.2
                          : 1,
                      // aspectRatio: '16 / 9',
                    }}
                    alt="Cover image"
                    className="cover-image"
                    width={150}
                    src={$record?.banner || DefaultCoverImage}
                    preview={false}
                  />
                ) : (
                  <ImagePlaceholder size={'200px'}>
                    <div className="meta-image-placeholder-box" />
                  </ImagePlaceholder>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item>
            <Button
              shape="round"
              type="primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
              htmlType="submit"
              disabled={loading}
              data-testid={'profile-submit-button'}
            >
              <span>Save</span>

              {loading && <MainLoader />}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
