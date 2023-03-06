import { MainLoader } from '@/components';
import {
  CopyOutlined,
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Row,
  Space,
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
interface KeyConfirmProps {
  onFinish: (data: any) => void;
  loading: boolean;
  form: FormInstance;
  // onValidatePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  // isValidPassword: boolean;
  // validatingPassword: boolean;
  wallet: Record<string, any>;
  nextStep: () => void;
  prevStep: () => void;
}

export const KeyConfirmForm = (props: KeyConfirmProps) => {
  const {
    onFinish,
    loading,
    form,

    nextStep,
    prevStep,
    // isValidPassword,
    // validatingPassword
    wallet,
  } = props;

  type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];
  const [selected, setSelected] = useState<Record<string, string | null>>({
    3: null,
    6: null,
    9: null,
    12: null,
  });
  const [correct, setCorrect] = useState(false);
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
    form.setFieldsValue({});
  };

  useEffect(() => {
    const keys = Object.keys(selected);
    for (let k of keys) {
      if (
        !selected[k] ||
        String(selected[k]).trim() != wallet.mnemonic.split(' ')[k - 1].trim()
      ) {
        setCorrect(false);
        return;
      }
    }
    setCorrect(true);
  }, [selected]);

  const addToSelected = (word: string) => {
    setSelected((s) => {
      const y = { ...s };
      const keys = Object.keys(s);
      for (let k of keys) {
        if (!s[k]) {
          y[k] = word;
          console.log('iiii', k);
          break;
        }
      }
      return y;
    });
  };

  const clearSelected = (index) => {
    console.log('Clearing', index);
    setSelected((s) => {
      for (let k of Object.keys(s)) {
        if (k == index) {
          s[index] = null;
          break;
        }
      }
      return { ...s };
    });
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
    <div className="content-profile">
      <Title level={1} className="title">
        <span>Create your ordinal wallet</span>
      </Title>
      <Title level={3} className="title">
        <span>Confirm Seedphrase Backup</span>‘
      </Title>
      <Text>
        <strong>Select word 3, 6, 9 and 12 of your seed phrase</strong>
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
              label=""
              name="password2"
              trigger={'onChange'}
              help={validateStatus?.errorMsg ?? ''}
              validateStatus={validateStatus?.status}
            >
              <Row>
                {Object.keys(selected).map((i) => (
                  <Col key={`d${i}`} className={'p2'} offset={1} span={11}>
                    <Space align="center">
                      <div style={{ width: 20 }}>{i}.</div>{' '}
                      <Text>{selected[i] ?? '****'}</Text>{' '}
                      <Button onClick={() => clearSelected(i)} type="link">
                        <DeleteOutlined />
                      </Button>
                    </Space>
                  </Col>
                ))}
              </Row>
            </Form.Item>
            <Form.Item
              label=""
              name="password2"
              trigger={'onChange'}
              help={validateStatus?.errorMsg ?? ''}
              validateStatus={validateStatus?.status}
            >
              <Row>
                {String(wallet?.mnemonic)
                  .split(' ')
                  .filter((s) => !Object.values(selected).includes(s))
                  .sort()
                  .map((k, index) => (
                    <Col className={'p2'} key={`w${index}`}>
                      <Button
                        disabled={!Object.values(selected).includes(null)}
                        onClick={() => addToSelected(k)}
                        style={{ margin: 5 }}
                        shape="round"
                        size="small"
                        type="ghost"
                      >
                        {k}
                      </Button>
                    </Col>
                  ))}
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Divider></Divider>

        <Row>
          <Form.Item>
            <Space>
              <Button
                shape="round"
                type="ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
                onClick={prevStep}
                disabled={loading}
                data-testid={'setup-back-button'}
              >
                <span>Back</span>

                {loading && <MainLoader />}
              </Button>
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
                disabled={!correct}
                data-testid={'profile-submit-button'}
              >
                <span>Continue</span>

                {loading && <MainLoader />}
              </Button>
            </Space>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
