import {
  Button,
  Col,
  Form,
  FormProps,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';

import { AnimatePresence, motion } from 'framer-motion';
// import { MainLoader } from '../../isomorphic/loader';
import { isDesktop, isMobile } from 'react-device-detect';
import { StyledModal } from '@/components/layout/header/fullscreen-menu/index.styled';

import { useEffect, useState } from 'react';
import { InputField } from '@/components/book/create-book/index.styled';
import { Storage } from '@/shared/utils';
import {
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
} from '@/shared/constants';
import { encode as base64_encode } from 'base-64';

interface BecomeCreatorProps {
  user: any;
  onVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
  onSubmit: (data: Record<string, any>) => void;
  loading?: boolean;
  checkingInvitationCode: boolean;
  reloadUser: () => void;
}
export const BecomeCreator = (props: BecomeCreatorProps) => {
  const {
    user,
    onVisibilityChange,
    visibility,
    loading,
    checkingInvitationCode,
    reloadUser,
  } = props;
  const [windowIsActive, setWindowIsActive] = useState(true);
  const [codeForm] = Form.useForm();
  const [requestCodeForm] = Form.useForm();
  useEffect(() => {
    //console.log('USERRRRRRR', user.socials);
  }, [user.socials]);

  useEffect(() => {
    if (windowIsActive && visibility) {
      reloadUser();
    }
  }, [windowIsActive]);

  function visibitlityChanged(changed: boolean) {
    if (typeof changed === 'boolean') {
      return changed ? setWindowIsActive(true) : setWindowIsActive(false);
    }
    return document.hidden ? setWindowIsActive(false) : setWindowIsActive(true);
  }
  useEffect(() => {
    const handleActivityFalse = () => visibitlityChanged(false);
    const handleActivityTrue = () => visibitlityChanged(true);
    // document.addEventListener('visibilitychange', handleActivity)
    document.addEventListener('blur', handleActivityFalse);
    window.addEventListener('blur', handleActivityFalse);
    window.addEventListener('focus', handleActivityTrue);
    document.addEventListener('focus', handleActivityTrue);

    return () => {
      window.removeEventListener('blur', handleActivityFalse);
      document.removeEventListener('blur', handleActivityFalse);
      window.removeEventListener('focus', handleActivityFalse);
      document.removeEventListener('focus', handleActivityTrue);
      document.removeEventListener('visibilitychange', handleActivityTrue);
    };
  }, []);

  const header = (
    <div className="w-100 meta-flex meta-flex-center meta-flex-s-b">
      <Space size={10} align={'center'}>
        <Typography.Title level={2}>
          Become a MetaComic Creator
        </Typography.Title>
      </Space>
      {isMobile && (
        <Space
          align={'center'}
          size={15}
          className="button-list-mobile mobile-list-desktop"
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              className="toggle-menu"
              type="default"
              shape={'circle'}
              size={'small'}
              onClick={() => onVisibilityChange(false)}
              icon={<i className="mc-close-line" />}
            />
          </motion.div>
        </Space>
      )}
    </div>
  );

  const componentBody = (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.08 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <CodeForm
          form={codeForm}
          // onFinish={onTip}
          isCreator={user.isCreator}
          checkingInvitationCode={checkingInvitationCode}
          onValuesChange={() => {
            // //console.log(changedValues, value);
            //console.log(changedValues);
          }}
        />
        <RequestCodeForm form={requestCodeForm} user={user} />
      </motion.div>
    </AnimatePresence>
  );

  const footer = (
    <Space className={'w-100 meta-flex-j-f-e'} align={'center'}>
      <Button
        shape={'round'}
        type={'primary'}
        disabled={loading}
        loading={loading}
        onClick={requestCodeForm.submit}
      >
        Continue
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
          width={'45vw'}
          footer={footer}
        >
          {componentBody}
        </Modal>
      )}
      {isMobile && (
        <StyledModal
          title={header}
          centered
          visible={visibility}
          // onOk={() => setVisible(false)}
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
          {componentBody}
        </StyledModal>
      )}
    </>
  );
};

interface CodeFormProps extends FormProps {
  isCreator: boolean;
  checkingInvitationCode: boolean;
}

export const CodeForm = (props: CodeFormProps) => {
  const { checkingInvitationCode, form, ...formProps } = props;

  return (
    <Space
      size={30}
      direction={'vertical'}
      className="bidding-container w-100"
      // align={'center'}
    >
      <Form
        {...formProps}
        form={form}
        layout={'vertical'}
        scrollToFirstError
        requiredMark={false}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              // label={'Code'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your invitation code',
                },
              ]}
              hasFeedback
              name="inviteCode"
            >
              <InputField
                placeholder="Enter your creator code"
                data-testid="invitation-code"
              />
            </Form.Item>

            <Form.Item>
              <div style={{ textAlign: 'right' }}>
                <a
                  style={{ fontSize: '14px' }}
                  target={'_blank'}
                  href="https://zw25dm9hb9k.typeform.com/to/RPjfbMqq"
                  rel="noreferrer"
                >
                  <Typography.Link>
                    <b>Or click here to get a creator code &#8594;</b>
                  </Typography.Link>
                </a>
                {/*<StyledButton*/}
                {/*  shape="round"*/}
                {/*  type="primary"*/}
                {/*  style={{*/}
                {/*    display: 'flex',*/}
                {/*    alignItems: 'center',*/}
                {/*    justifyContent: 'center',*/}
                {/*    gap: '10px',*/}
                {/*  }}*/}
                {/*  htmlType="submit"*/}
                {/*  disabled={checkingInvitationCode}*/}
                {/*>*/}
                {/*  <Space size={10} align={'center'}>*/}
                {/*    <span>Continue</span>*/}

                {/*    {checkingInvitationCode ? (*/}
                {/*      <MainLoader data-testid="loader" />*/}
                {/*    ) : (*/}
                {/*      <Arrow className="mc-arrow-right-2-line" />*/}
                {/*    )}*/}
                {/*  </Space>*/}
                {/*</StyledButton>*/}
              </div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space
              align={'center'}
              className={'w-100 meta-flex-j-f-e'}
              style={{ fontWeight: 500 }}
            ></Space>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

interface RequestCodeFormProps extends FormProps {
  user: any;
  connectingTwitter?: boolean;
  connectingInstagram?: boolean;
}
export const RequestCodeForm = (props: RequestCodeFormProps) => {
  const { user, form, ...formProps } = props;
  //console.log('SOCIALS', user?.socials);
  useEffect(() => {
    form?.setFieldsValue(user);
  }, []);

  const storage = new Storage(
    WEB3_SIGNATURE_STORAGE_KEY,
    {},
    {
      set: WEB3_SIGNATURE_STORAGE_SET_KEY,
    }
  );
  const signature = base64_encode(JSON.stringify(storage.get()));

  return (
    <Space
      size={30}
      direction={'vertical'}
      className="bidding-container w-100"
      // align={'center'}
    >
      <Form
        {...formProps}
        form={form}
        layout={'vertical'}
        scrollToFirstError
        requiredMark={false}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label={'TWITTER ACCOUNT'}
              rules={[
                {
                  required: false,
                  message: 'Please connect your twitter account',
                },
              ]}
              hasFeedback
              name="inviteCode"
            >
              <Row justify={'space-between'}>
                <Col>
                  <Space>
                    <b>@{user?.socials?.twitter}</b>
                  </Space>
                </Col>
                <Col>
                  <Button
                    onClick={() =>
                      window?.open(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/twitter/connect?x-signed-data=${signature}`,
                        '_blank'
                      )
                    }
                    shape={'round'}
                    size={'small'}
                    type={'primary'}
                    placeholder="Enter your creator code"
                    data-testid="invitation-code"
                  >
                    {!user?.socials?.twitter ? 'Connect' : 'Reconnect'}
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              label={'INSTAGRAM ACCOUNT'}
              rules={[
                {
                  required: true,
                  message: 'Please connect your instagram account',
                },
              ]}
              hasFeedback
              name="inviteCode"
            >
              <Row justify={'space-between'}>
                <Col>
                  <Space>
                    <b>@{user?.socials?.instagram}</b>
                  </Space>
                </Col>
                <Col>
                  <Button
                    onClick={() =>
                      window?.open(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/instagram/connect?x-signed-data=${signature}`,
                        '_blank'
                      )
                    }
                    shape={'round'}
                    size={'small'}
                    type={'primary'}
                    placeholder="Enter your creator code"
                    data-testid="invitation-code"
                  >
                    {!user?.socials?.instagram ? 'Connect' : 'Reconnect'}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              label={'EMAIL'}
              rules={[
                {
                  required: true,
                  message: 'Please provide your email address',
                },
              ]}
              hasFeedback
              name="email"
            >
              <InputField
                placeholder="Your code will be sent to this email"
                data-testid="invitation-code"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space
              align={'center'}
              className={'w-100 meta-flex-j-f-e'}
              style={{ fontWeight: 500 }}
            ></Space>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};
