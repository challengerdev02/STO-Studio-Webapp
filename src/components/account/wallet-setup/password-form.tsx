import { MainLoader } from '@/components';
import { CopyOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Form, FormInstance, Input, Row, Typography } from 'antd';

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
  onValidatePassword?: (event: ChangeEvent<HTMLInputElement>) => void;
  isValidPassword?: boolean;
  validatingPassword?: boolean;
  nextStep: () => void;
}

export const PasswordForm = (props: PasswordProps) => {
  const {
    onFinish,
    loading,
    $record,
    form,
    // onValidatePassword,
    // isValidPassword,
    // validatingPassword,
    nextStep,
  } = props;

  type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];
  const [validateStatus, setValidateStatus] = useState<{
    status: ValidateStatus;
    errorMsg: string | null;
  }>();

  const onSubmit = (data: any) => {
    console.log(data);
    nextStep();
  };

  form.getFieldValue('password');
  const onInitialValues = () => {
    form.setFieldsValue({});
  };

  useEffect(() => {
    form.resetFields();
  }, []);

  // useEffect(() => {
  //   setValidateStatus({
  //     status: isValidPassword ? 'success' : 'error',
  //     errorMsg: isValidPassword
  //       ? null
  //       : 'Password is invalid',
  //   });
  // }, [isValidPassword]);

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
        <span>Wallet password</span>
      </Title>
      <Text>This password will be used to encrypt your wallet locally.</Text>

      <Form
        layout="vertical"
        name="dynamic_form_nest_item"
        onFinish={onSubmit}
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
              label="Password"
              name="password"
              required={true}
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be minimum 8 characters.' },
              ]}
              validateTrigger="onChange"
              //  validateStatus={validateStatus?.status}
            >
              <Input.Password
                autoFocus={true}
                placeholder={'At least 8 characters'}

                // onBlur={debounce(onValidateUsername, 500)}

                // suffix={validatingPassword ? <LoadingOutlined spin /> : null}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="password2"
              required={true}
              validateTrigger="onSubmit"
              rules={[
                { required: true, message: 'Please re-enter password' },
                { min: 8, message: 'Password must be minimum 8 characters.' },
                {
                  validator: (_, value, callback) => {
                    if (String(value) !== form.getFieldValue('password')) {
                      callback('Passwords do not match');
                    } else {
                      callback();
                    }
                  },
                },
              ]}
            >
              <Input.Password
                placeholder={'Re-enter password'}

                // onBlur={debounce(onValidateUsername, 500)}

                //  suffix={validatingPassword ? <LoadingOutlined spin /> : null}
              />
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
              data-testid={'password-submit-button'}
            >
              <span>Generate Seed Phrase</span>

              {loading && <MainLoader />}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
