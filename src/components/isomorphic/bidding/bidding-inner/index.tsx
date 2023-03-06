import {
  Button,
  Checkbox,
  Col,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import Link from 'next/link';
import {
  BIDDING_TOKENS,
  SUPPORTED_NETWORKS,
  toEther,
  toWei,
} from '../../../../blockchain/evm/utils';
import { find, isEmpty, toUpper } from 'lodash';
import BN from 'bn.js';
import Web3 from 'web3';
import { cleanInput } from '@/shared/utils';

// import { dynCryptoIconImport } from '@/shared/utils';

interface BiddingInnerProps extends FormProps {
  biddingToken: string;
  blockchain: string;
  biddingTokenBalance: string;
  onBiddingTokenChange: (value: Record<string, any>) => void;
  onGetMinimumBidAmount: () => string;
  onConvert: () => void;
  currency: string;
  biddingTokenDecimals: number | undefined;
}

export const BiddingInner = (props: BiddingInnerProps) => {
  const {
    biddingToken,
    onBiddingTokenChange,
    biddingTokenBalance,
    onGetMinimumBidAmount,
    onConvert,
    currency,
    blockchain,
    biddingTokenDecimals,
    ...formProps
  } = props;
  const chain =
    SUPPORTED_NETWORKS[blockchain] ??
    SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_ID as string];
  const biddingTokenList = [...Object.values(BIDDING_TOKENS), chain.usdToken];

  return (
    <Space
      size={30}
      direction={'vertical'}
      className="bidding-container w-100"
      // align={'center'}
    >
      <Form
        {...formProps}
        layout={'vertical'}
        scrollToFirstError
        hideRequiredMark
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Bid amount"
              name={'bid'}
              rules={[
                {
                  required: true,
                  message: 'Please enter your bid!',
                },
                () => ({
                  validator(_, value) {
                    if (isEmpty(value)) {
                      return Promise.resolve();
                    }

                    const isLessThanMinimumBid = new BN(
                      new Web3().utils.toWei(cleanInput(value))
                    ).lt(new BN(toWei(onGetMinimumBidAmount())));
                    if (isLessThanMinimumBid) {
                      return Promise.reject(
                        `Bid amount does not meet minimum bid amount of ${onGetMinimumBidAmount()} ${biddingToken}`
                      );
                    }

                    const isLessThanBalance = new BN(
                      new Web3().utils.toWei(cleanInput(value))
                    ).lte(
                      new BN(
                        toWei(
                          toEther(
                            biddingTokenBalance,
                            biddingTokenDecimals,
                            biddingTokenDecimals
                          )
                        )
                      )
                    );

                    if (!value || isLessThanBalance) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Bid amount is greater than your balance.')
                    );
                  },
                }),
              ]}
              normalize={(value) => cleanInput(value)}
            >
              <Input
                style={{ width: '100%' }}
                placeholder="Enter bid"
                addonBefore={
                  <Form.Item noStyle name={'token'}>
                    <Select
                      value={biddingToken}
                      style={{ width: 120 }}
                      onSelect={(value: string) => {
                        onBiddingTokenChange(
                          find(
                            biddingTokenList,
                            (token) => token.address == value
                          ) ?? BIDDING_TOKENS.COMI
                        );
                      }}
                      bordered={false}
                    >
                      {biddingTokenList.map((token) => (
                        <Select.Option
                          key={token.address}
                          value={token.address}
                        >
                          <Space align={'center'} size={10}>
                            {/*{CryptoIcons[token.address]}*/}
                            <span
                              style={{
                                fontWeight: 500,
                                color: 'var(--heading-color)',
                              }}
                            >
                              {token.symbol}
                            </span>
                          </Space>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space
              align={'center'}
              className={'w-100 meta-flex-j-f-e'}
              style={{ fontWeight: 500 }}
            >
              <Space>
                <Space>
                  Available:{' '}
                  {toEther(
                    biddingTokenBalance,
                    biddingTokenDecimals,
                    biddingTokenDecimals
                  )}
                  {biddingToken}
                </Space>
                |
                <Button
                  type={'link'}
                  shape={'round'}
                  onClick={onConvert}
                  size={'small'}
                >
                  Get {toUpper(currency)}
                </Button>
              </Space>
            </Space>
          </Col>
          <Col span={24}>
            <Form.Item
              name={'terms'}
              rules={[
                {
                  required: true,
                  message: 'Please accept the terms and conditions!',
                },
              ]}
              valuePropName={'checked'}
            >
              <Checkbox>
                By checking this box, I agree to{' '}
                {process.env.NEXT_PUBLIC_APP_NAME}&apos;s{' '}
                <Link
                  href={
                    process.env.NEXT_PUBLIC_TERMS_OF_SERVICE ??
                    'https://metacomic.tawk.help/article/terms-of-service'
                  }
                >
                  terms and conditions
                </Link>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};
