import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { debounce, get, has, toLower } from 'lodash';
import {
  CheckCircleFilled,
  LoadingOutlined,
  RedditOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
// import { MainLoader } from '@/components';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { isDesktop } from 'react-device-detect';
import { StyledDrawer } from '@/components/competition/view-entries/index.styled';
import { UserNamespace } from '@/shared/namespaces/user';
import {
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
} from '@/shared/constants';
import { Storage } from '@/shared/utils';
import { encode as base64_encode } from 'base-64';
import { SeriesNamespace } from '@/shared/namespaces/series';
import { useRouter } from 'next/router';

interface JoinCompetitionProps {
  onFinish: (values: Record<string, any>) => void;
  onCancel: (visibility: boolean) => void;
  form: FormInstance;
  loading: boolean;
  visibility: boolean;
  emailVerified?: boolean;
  username: string;
  userEmail?: string;
  isValidUsername: boolean;
  onValidateUsername: (event: ChangeEvent<HTMLInputElement>) => void;
  validatingUsername: boolean;
  user?: UserNamespace.User;
  series?: SeriesNamespace.Series[];
  title?: string;
}
const { Text, Title } = Typography;
const { TextArea } = Input;
export const JoinCompetition = (props: JoinCompetitionProps) => {
  const {
    onFinish,
    form,
    loading,
    isValidUsername,
    // username,
    validatingUsername,
    onValidateUsername,
    visibility,
    onCancel,
    emailVerified,
    userEmail,
    user,
    series = [],
    title = '',
  } = props;
  const [tempEmail, setTempEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (userEmail) {
      setTempEmail(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    //console.log('IsValidUpdated', isValidUsername);
    setValidateStatus({
      status: isValidUsername ? 'success' : 'error',
      errorMsg: isValidUsername
        ? null
        : 'Username is already taken. Please choose another username',
    });
  }, [isValidUsername]);

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

  const storage = new Storage(
    WEB3_SIGNATURE_STORAGE_KEY,
    {},
    {
      set: WEB3_SIGNATURE_STORAGE_SET_KEY,
    }
  );
  const signature = base64_encode(JSON.stringify(storage.get()));
  return (
    <StyledDrawer
      title={<h1 style={{ margin: '0px' }}>Enroll</h1>}
      visible={visibility}
      onClose={() => onCancel(false)}
      placement="bottom"
      // bodyStyle={{ padding: '55.5px 90.5px', paddingRight: 24 }}
      maskClosable
      // closable={false}
      height={isDesktop ? '100vh' : '90vh'}
      data-testid="isomorphic"
      borderRadius="0"
      className={'competition-join'}
    >
      <Form
        layout="vertical"
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        style={{ margin: '3em 3em 3em 3em' }}
        onValuesChange={(_, values) => {
          if (has(values, 'email')) {
            setTempEmail(get(values, 'email'));
          }
        }}
      >
        <Row>
          <Col
            md={{ span: 16, offset: 4 }}
            lg={{ span: 12, offset: 6 }}
            xl={{ span: 10, offset: 7 }}
            xxl={{ span: 8, offset: 8 }}
            className="left-fields"
          >
            <h1 style={{ textTransform: 'capitalize' }}>{title}</h1>
            <Form.Item
              label="Your series to be enrolled"
              name="series"
              rules={[{ required: true, message: 'Series is required' }]}
            >
              {/*<Space direction={'vertical'} style={{ width: '100%' }}>*/}
              <Select
                placeholder={'Select one of your series'}
                // onBlur={debounce(onValidateUsername, 500)}

                options={(series ?? []).map((item) => ({
                  label: item.title,
                  value: item._id,
                }))}
              />
              {/*</Space>*/}
            </Form.Item>
            <Form.Item>
              <Button
                shape="round"
                type="dashed"
                onClick={() => router.push('/assets/create')}
              >
                or Create New Collection
              </Button>
            </Form.Item>
            <Form.Item
              label="Your username"
              name="username"
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
              //       if (!value || username === value || isValidUsername) {
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
                placeholder={
                  "Your username as you'd like it to be displayed on Metacomics."
                }
                autoFocus={true}
                onChange={onChange}
                suffix={validatingUsername ? <LoadingOutlined spin /> : null}
              />
            </Form.Item>
            <Form.Item
              label="Email Address (We will not share it with anyone)"
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
                readOnly={emailVerified}
                type={'email'}
                placeholder={"What's your email address?"}
                suffix={
                  emailVerified &&
                  userEmail &&
                  toLower(tempEmail) === toLower(userEmail) ? (
                    <Space align={'center'}>
                      <CheckCircleFilled color={'var(--accent-green)'} />{' '}
                      <span style={{ color: 'var(--accent-green)' }}>
                        verified
                      </span>
                    </Space>
                  ) : (
                    <span style={{ color: 'var(--dropdown-arrow-color)' }}>
                      Not verified
                    </span>
                  )
                }
              />
            </Form.Item>
            <Form.Item
              label="Bio"
              name="bio"
              rules={[{ required: true, message: 'Bio is required' }]}
            >
              <TextArea rows={4} placeholder={'Tell the world your story!'} />
            </Form.Item>
            <Form.Item>
              <Title level={3}>Social profiles</Title>
              <Text>Let people connect with you.</Text>
            </Form.Item>
            <Form.Item
              label="Twitter"
              name={['socials', 'twitter']}
              hasFeedback
            >
              <Row justify={'space-between'}>
                <Col>
                  <Space>
                    <b>@{user?.socials?.twitter ?? 'your-twitter-handle'}</b>
                  </Space>
                </Col>

                <Col>
                  <Button
                    href={`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter/connect?x-signed-data=${signature}`}
                    target={'_blank'}
                    shape={'round'}
                    size={'small'}
                    type={'default'}
                    icon={<TwitterOutlined />}
                  >
                    {!user?.socials?.twitter ? 'Connect' : 'Reconnect'}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="Reddit" name={['socials', 'reddit']} hasFeedback>
              <Row justify={'space-between'}>
                <Col>
                  <Space>
                    <b>u/{user?.socials?.reddit ?? 'your-reddit-handle'}</b>
                  </Space>
                </Col>

                <Col>
                  <Button
                    href={`${process.env.NEXT_PUBLIC_API_URL}/auth/reddit/connect?x-signed-data=${signature}`}
                    target={'_blank'}
                    shape={'round'}
                    size={'small'}
                    type={'default'}
                    icon={<RedditOutlined />}
                  >
                    {!user?.socials?.reddit ? 'Connect' : 'Reconnect'}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            {/*<Form.Item*/}
            {/*  label="Instagram"*/}
            {/*  name={['socials', 'instagram']}*/}
            {/*  hasFeedback*/}
            {/*>*/}
            {/*  <Row justify={'space-between'}>*/}
            {/*    {*/}
            {/*      <Col>*/}
            {/*        <Space>*/}
            {/*          <b>*/}
            {/*            @{user?.socials?.instagram ?? 'your-instagram-handle'}*/}
            {/*          </b>*/}
            {/*        </Space>*/}
            {/*      </Col>*/}
            {/*    }*/}
            {/*    <Col>*/}
            {/*      <Button*/}
            {/*        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/instagram/connect?x-signed-data=${signature}`}*/}
            {/*        target={'_blank'}*/}
            {/*        shape={'round'}*/}
            {/*        size={'small'}*/}
            {/*        type={'default'}*/}
            {/*        icon={<InstagramOutlined />}*/}
            {/*      >*/}
            {/*        {!user?.socials?.instagram ? 'Connect' : 'Reconnect'}*/}
            {/*      </Button>*/}
            {/*    </Col>*/}
            {/*  </Row>*/}
            {/*</Form.Item>*/}
            <Form.Item>
              <Button
                shape="round"
                type="primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  margin: '1em auto',
                }}
                htmlType="submit"
                // disabled={loading}
                data-testid={'profile-submit-button'}
                loading={loading}
              >
                Join Competition
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row></Row>
      </Form>
    </StyledDrawer>
  );
};
