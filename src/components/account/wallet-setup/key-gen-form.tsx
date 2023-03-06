import { MainLoader } from '@/components';
import { CopyOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Grid,
  Input,
  Row,
  Typography,
} from 'antd';

import Title from 'antd/lib/typography/Title';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { debounce, get } from 'lodash';
import { copyToClipboard, onBeforeImageUpload, Storage } from '@/shared/utils';
import {
  WEB3_SIGNATURE_STORAGE_KEY,
  WEB3_SIGNATURE_STORAGE_SET_KEY,
} from '@/shared/constants';
import { encode as base64_encode } from 'base-64';

const { TextArea } = Input;
const { Text } = Typography;
interface PasswordProps {
  onFinish: (data: any) => void;
  loading: boolean;
  $record: Record<string, any>;
  form: FormInstance;
  // onValidatePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  // isValidPassword: boolean;
  // validatingPassword: boolean;
  prevStep: () => void;
  wallet: Record<string, any>;
  nextStep: () => void;
}

export const KeyGenForm = (props: PasswordProps) => {
  const {
    onFinish,
    loading,
    $record,
    form,

    nextStep,
    prevStep,
    // isValidPassword,
    // validatingPassword
    wallet,
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
  }, [$record._id]);

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
        <span>Create your ordinal wallet</span>
      </Title>
      <Title level={3} className="title">
        <span>Seed phrase</span>
      </Title>
      <Text>
        <strong>
          This is the only way you will be able to recover your account. Never
          share it with anyone.
        </strong>
      </Text>

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
            {/* <Form.Item
              label="Password"
              name="password"
              trigger={'onChange'}
              help={validateStatus?.errorMsg ?? ''}
              validateStatus={validateStatus?.status}
              
            >
              <Input.Password
                autoFocus={true}
                placeholder={
                  "At least 8 characters"
                }
               
                // onBlur={debounce(onValidateUsername, 500)}
                onChange={onChange}
                suffix={validatingPassword ? <LoadingOutlined spin /> : null}
              />
            </Form.Item> */}
            <Form.Item
              label="Store Somewhere Safe"
              name="password2"
              trigger={'onChange'}
              help={validateStatus?.errorMsg ?? ''}
              validateStatus={validateStatus?.status}
            >
              <Row>
                {String(wallet?.mnemonic)
                  .split(' ')
                  .map((k, index) => (
                    <Col
                      className={'p2'}
                      offset={1}
                      key={`w${index}`}
                      span={11}
                    >
                      {index + 1}. {k}
                    </Col>
                  ))}
              </Row>
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
              onClick={nextStep}
              htmlType="submit"
              disabled={loading}
              data-testid={'profile-submit-button'}
            >
              <span>Continue</span>

              {loading && <MainLoader />}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
