import { MainLoader } from '@/components';
import {
  CheckCircleFilled,
  CopyOutlined,
  EyeOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Grid,
  Input,
  Progress,
  Row,
  Space,
  Spin,
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
import { useRouter } from 'next/router';

const { TextArea } = Input;
const { Text } = Typography;
interface Props {
  onFinish: (data: any) => void;
  loading: boolean;
  encryptingState: null | 'started' | 'completed';
  savingWallet: null | 'started' | 'completed';
  form: FormInstance;
  // onValidatePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  // isValidPassword: boolean;
  // validatingPassword: boolean;
  chainId: string | number;
  prevStep: () => void;
  wallet: Record<string, any>;
  nextStep: () => void;
}

export const EncryptForm = (props: Props) => {
  const {
    onFinish,
    loading,
    form,

    nextStep,
    prevStep,
    // isValidPassword,
    // validatingPassword
    encryptingState,
    savingWallet,
    wallet,
    chainId,
  } = props;
  const router = useRouter();

  const done = encryptingState == 'completed' && savingWallet == 'completed';

  return (
    <div className="content-profile">
      <Title level={1} className="title">
        <span>Create your ordinal wallet</span>
      </Title>
      <Title level={3} className="title">
        <span>Finalizing setup</span>
      </Title>
      <Text>
        <strong></strong>
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
            <Form.Item label="" name="password2" trigger={'onChange'}>
              <Row>
                <Space size={10}>
                  <Text>1. Linking your ethereum and btc ordinal wallets</Text>{' '}
                  {savingWallet == 'started' && (
                    <Spin indicator={<LoadingOutlined />} />
                  )}{' '}
                  {savingWallet == 'completed' && (
                    <CheckCircleFilled style={{ color: 'green' }} />
                  )}
                </Space>
              </Row>
              <Row>
                <Space size={10}>
                  <Text>2. Securing your wallet</Text>{' '}
                  {encryptingState == 'started' && (
                    <Spin indicator={<LoadingOutlined />} />
                  )}{' '}
                  {encryptingState == 'completed' && (
                    <CheckCircleFilled style={{ color: 'green' }} />
                  )}
                </Space>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item>
            <Space>
              {/* <Button
              shape="round"
              type="ghost"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
              onClick={prevStep}
              disabled={loading || }
              data-testid={'setup-back-button'}
            >
              <span>Back</span>
            </Button> */}
              <Space size={10} direction="vertical">
                <div>
                  {done && (
                    <Title
                      style={{ marginBottom: 5 }}
                      level={5}
                      className="title"
                    >
                      Great job! Your ordinals wallet has been created
                    </Title>
                  )}
                  {done && (
                    <Text>
                      {' '}
                      You can now begin importing your EVM NFT to BTC Ordinals
                      Network
                    </Text>
                  )}
                </div>
                <Button
                  shape="round"
                  type="primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                  onClick={() => router.replace(`/import?chainId=${chainId}`)}
                  //href={'/import'}

                  disabled={!done}
                  data-testid={'finalize-submit-button'}
                >
                  Start Importing
                </Button>
              </Space>
            </Space>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
