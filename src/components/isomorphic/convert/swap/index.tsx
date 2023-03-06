import { motion } from 'framer-motion';
import { Typography } from 'antd';
import { Iframe } from '@/components/isomorphic/convert/swap/index.styled';
import { useMemo } from 'react';

interface ConvertSwapTokenProps {
  currency: string;
  conversionCurrency: {
    symbol: string;
    readonly address: string;
    readonly link: string;
  };
}
export const ConvertSwapToken = (props: ConvertSwapTokenProps) => {
  const { currency, conversionCurrency } = props;

  const swapLink = useMemo(() => {
    if (process.env.NODE_ENV === 'development') {
      return `https://pancake.kiemtienonline360.com/#/swap?outputCurrency=${conversionCurrency.address}&theme=dark&exactAmount=0&exactField=output`;
    }
    return `https://app.uniswap.org/#/swap?outputCurrency=${conversionCurrency.address}&theme=dark&exactAmount=0&exactField=output`;
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      className={'w-100 h-100'}
    >
      <div
        className={
          'w-100 h-100 meta-flex meta-flex-center meta-flex-j-c meta-flex-col'
        }
        style={{ gap: 30 }}
      >
        <Typography.Text>
          Easily convert between {currency} and{' '}
          <a
            target={'_blank'}
            rel={'noreferrer'}
            href={conversionCurrency.link}
          >
            {conversionCurrency.symbol}
          </a>
        </Typography.Text>
        <Iframe src={swapLink} />
      </div>
    </motion.div>
  );
};
