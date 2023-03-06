import { Tabs, Typography } from 'antd';
import { ConvertSwapToken } from '@/components/isomorphic/convert/swap';
import { StyledTabs } from './index.styled';

interface ConvertProps {
  currency: string;
  conversionCurrency: {
    symbol: string;
    readonly address: string;
    readonly link: string;
  };
}
export const Convert = (props: ConvertProps) => {
  const { currency, conversionCurrency } = props;
  return (
    <StyledTabs centered={false} className={'w-100 h-100'}>
      <Tabs.TabPane
        className={'w-100 h-100'}
        tab={
          <Typography.Title level={4} style={{ margin: 0 }}>
            Deposit Crypto
          </Typography.Title>
        }
        tabKey={'deposit-crypto'}
      >
        <ConvertSwapToken
          currency={currency}
          conversionCurrency={conversionCurrency}
        />
      </Tabs.TabPane>
    </StyledTabs>
  );
};
