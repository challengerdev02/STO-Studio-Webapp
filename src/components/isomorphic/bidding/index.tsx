import { Button, DrawerProps, Form, Modal, Space, Typography } from 'antd';
import { isDesktop, isMobile } from 'react-device-detect';
import { BiddingInner } from '@/components/isomorphic/bidding/bidding-inner';
import { BiddingFooter } from '@/components/isomorphic/bidding/bidding-footer';
import { useEffect, useState } from 'react';
import { has } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { Convert } from '@/components/isomorphic/convert';
import {
  SUPPORTED_NETWORKS,
  toEther,
  toWei,
} from '../../../blockchain/evm/utils';
import { StyledModal } from '@/components/layout/header/fullscreen-menu/index.styled';
import BN from 'bn.js';
import Web3 from 'web3';
import { ActionOption } from '../../../redux/types';
import { cleanInput } from '@/shared/utils';
import { SaleNamespace } from '@/shared/namespaces/sale';

interface BiddingProps extends DrawerProps {
  walletAddress: string;
  blockchain: string;
  onVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
  onPlaceBid: (data: Record<string, any>) => void;
  biddingToken: Record<string, any> & { balance: string; allowance: string };
  onBiddingTokenChange: (value: Record<string, any>) => void;
  approveToken: (
    address: string,
    amount: string | BN,
    options?: ActionOption
  ) => void;
  queryingContract: boolean;
  initialValues?: Record<string, any>;
  loading?: boolean;
  latestBid: SaleNamespace.Bid;
}

export const Bidding = (props: BiddingProps) => {
  const {
    onVisibilityChange,
    visibility,
    onPlaceBid,
    biddingToken,
    onBiddingTokenChange,
    approveToken,
    walletAddress,
    queryingContract,
    initialValues,
    loading,
    latestBid,
    blockchain,
  } = props;

  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const [makeConversion, setMakeConversion] = useState(false);

  const [isApproved, setApproval] = useState(false);

  const [form] = Form.useForm();

  const checkAllowance = (bidAmount: string) => {
    const bid = new BN(new Web3().utils.toWei(bidAmount || '0', 'ether'));
    const allowance = new BN(biddingToken.allowance);

    if (allowance.eq(new BN(0)) || bid.gt(allowance)) {
      setApproval(false);
      return;
    }
    setApproval(true);
  };

  const onValuesChange = (changedValues: Record<string, any>) => {
    if (has(changedValues, 'terms')) {
      setHasAcceptedTerms(changedValues.terms);
    }

    if (has(changedValues, 'bid')) {
      const bid = cleanInput(changedValues.bid);
      checkAllowance(bid);
    }
  };

  const onTriggerConvert = (value = true) => {
    setMakeConversion(value);
  };

  const onApproveAmount = () => {
    form.validateFields(['bid']).then((values) => {
      const weiAmount = toWei(cleanInput(values.bid), biddingToken.decimals);
      approveToken(walletAddress, weiAmount, {
        onFinish: () => {
          setApproval(true);
        },
      });
    });
  };

  useEffect(() => {
    if (visibility)
      checkAllowance(cleanInput(form.getFieldValue('bid') ?? '0'));
  }, [biddingToken.allowance, visibility, biddingToken.symbol]);

  const onGetMinimumBidAmount = () => {
    if (latestBid._id) {
      return toEther(
        new BN(latestBid.amount)
          .mul(Web3.utils.toBN(105))
          .div(Web3.utils.toBN(100)),
        18
      );
    }

    return toEther(
      new BN(new Web3().utils.toWei(initialValues?.bid ?? '0', 'ether'))
        .mul(Web3.utils.toBN(105))
        .div(Web3.utils.toBN(100)),
      18
    );
  };

  useEffect(() => {
    form.setFieldsValue({
      bid: onGetMinimumBidAmount(),
    });
  }, [latestBid._id, visibility, initialValues?.bid]);

  const _initialValues = Object.assign(
    {},
    {
      terms: false,
      token: initialValues?.token ?? biddingToken.symbol,
    }
  );

  const header = (
    <div className="w-100 meta-flex meta-flex-center meta-flex-s-b">
      <Space size={10} align={'center'}>
        {makeConversion && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => onTriggerConvert(false)}
            role={'button'}
            aria-label={'Back to bidding'}
            style={{ cursor: 'pointer' }}
            className={'meta-flex meta-flex-center meta-flex-j-c'}
          >
            <i
              className="mc-arrow-left-2-line mc-xl"
              style={{ fontSize: '1.75em', color: 'var(--text-color)' }}
            />
          </motion.div>
        )}
        <Typography.Title level={3} style={{ margin: 0 }}>
          {makeConversion ? 'Add Funds' : 'Place a bid'}
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

  const chain =
    SUPPORTED_NETWORKS[blockchain] ??
    SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_ID as string];
  const componentBody = (
    <AnimatePresence>
      {makeConversion && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className={'h-100'}
        >
          <Convert
            currency={biddingToken.symbol as string}
            conversionCurrency={{
              symbol: biddingToken.symbol,
              address: biddingToken.address,
              link: `${chain.explorerURL}/address/${biddingToken.address}`,
            }}
          />
        </motion.div>
      )}

      {!makeConversion && (
        <motion.div
          initial={{ scale: 0.08 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <BiddingInner
            form={form}
            blockchain={blockchain}
            initialValues={_initialValues}
            biddingToken={biddingToken.symbol}
            biddingTokenBalance={biddingToken.balance as string}
            biddingTokenDecimals={biddingToken.decimals}
            onFinish={onPlaceBid}
            onValuesChange={onValuesChange}
            onBiddingTokenChange={onBiddingTokenChange}
            onGetMinimumBidAmount={onGetMinimumBidAmount}
            currency={biddingToken.symbol as string}
            onConvert={() => onTriggerConvert(true)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
  return (
    <>
      {isDesktop && (
        <Modal
          title={header}
          visible={visibility}
          onCancel={() => onVisibilityChange(false)}
          destroyOnClose
          footer={
            !makeConversion ? (
              <BiddingFooter
                form={form}
                currency={biddingToken.symbol as string}
                onConvert={() => onTriggerConvert(true)}
                disabled={!hasAcceptedTerms}
                isApproved={isApproved}
                onApprove={onApproveAmount}
                loading={queryingContract || loading}
              />
            ) : null
          }
          centered={isMobile}
          width={'45vw'}
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
          footer={
            !makeConversion ? (
              <BiddingFooter
                form={form}
                currency={biddingToken.symbol as string}
                onConvert={() => onTriggerConvert(true)}
                disabled={!hasAcceptedTerms}
                isApproved={isApproved}
                onApprove={onApproveAmount}
              />
            ) : null
          }
        >
          {componentBody}
        </StyledModal>
      )}
    </>
  );
};
