import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  LoadingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  FormInstance,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';

import Title from 'antd/lib/typography/Title';

import { useRouter } from 'next/router';

const { Text } = Typography;
interface Props {
  onFinish: (data: any) => void;
  loading: boolean;
  encryptingState: null | 'started' | 'completed' | 'error';
  savingWallet: null | 'started' | 'completed' | 'error';
  form: FormInstance;
  chainId: string | number;
  prevStep: () => void;
  wallet: Record<string, any>;
  nextStep: () => void;
  step5: () => void;
  step4: () => void;
  environment?: string;
}

export const EncryptForm = (props: Props) => {
  const {
    onFinish,
    loading,
    form,
    step4,

    // isValidPassword,
    // validatingPassword
    environment,
    encryptingState,
    savingWallet,
    wallet,
    chainId,
  } = props;
  const router = useRouter();

  const done = encryptingState == 'completed' && savingWallet == 'completed';

  return (
    <div className="content-profile">
      {/* <Title level={1} className="title">
        <span>Generating your ordinal wallet</span>
      </Title> */}
      <Title level={2} className="title">
        <span>Generating your ordinal wallet</span>
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
                  <Text>1. Generating your wallet</Text>{' '}
                  {encryptingState == 'started' && (
                    <Spin indicator={<LoadingOutlined />} />
                  )}{' '}
                  {encryptingState == 'completed' && (
                    <CheckCircleFilled style={{ color: 'green' }} />
                  )}
                  {encryptingState == 'error' && (
                    <ExclamationCircleFilled style={{ color: 'red' }} />
                  )}
                </Space>
              </Row>
              <Row>
                <Space size={10}>
                  <Text>
                    2. Linking your {environment ?? 'ETH'} and BTC ordinal
                    wallets
                  </Text>{' '}
                  {savingWallet == 'started' && (
                    <Spin indicator={<LoadingOutlined />} />
                  )}{' '}
                  {savingWallet == 'completed' && (
                    <CheckCircleFilled style={{ color: 'green' }} />
                  )}
                  {savingWallet == 'error' && (
                    <ExclamationCircleFilled style={{ color: 'red' }} />
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
              <Space size={20} direction="vertical">
                <div>
                  {done && (
                    <>
                      <Title
                        style={{ marginBottom: 5 }}
                        level={5}
                        className="title"
                      >
                        Great job! Your ordinals wallet has been created.
                      </Title>
                      <Text style={{ marginBottom: 5 }} className="title">
                        {/* Address: {wallet.tapRootAddress} */}
                      </Text>
                    </>
                  )}
                  {done && (
                    <Space direction="vertical" size={20}>
                      <Text>
                        {' '}
                        <b>
                          You can now begin importing your EVM NFT to BTC
                          Ordinals Network
                        </b>
                      </Text>
                    </Space>
                  )}
                </div>
                {(encryptingState == 'error' || savingWallet == 'error') && (
                  <Button
                    shape="round"
                    type="primary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                    onClick={() => step4()}
                    //href={'/import'}
                    data-testid={'finalize-submit-button'}
                  >
                    Retry Setup
                  </Button>
                )}
                {encryptingState != 'error' && savingWallet != 'error' && (
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
                )}
              </Space>
            </Space>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};
