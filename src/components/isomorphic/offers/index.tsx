import { Button, DrawerProps, Form, Modal, Space, Typography } from 'antd';
import { isDesktop, isMobile } from 'react-device-detect';
import { useEffect, useState } from 'react';
import { has } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { Convert } from '@/components/isomorphic/convert';
import { StyledModal } from '@/components/layout/header/fullscreen-menu/index.styled';
import BN from 'bn.js';
import Web3 from 'web3';
import { ActionOption } from '../../../redux/types';
import { cleanInput } from '@/shared/utils';
import { OfferForm } from '@/components/isomorphic/offers/offer-form';
import { Footer } from '@/components/isomorphic/offers/footer';

interface OfferProps extends DrawerProps {
  walletAddress: string;
  onVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
  onPlaceOffer: (data: Record<string, any>) => void;
  offerToken: Record<string, any> & { balance: string; allowance: string };
  onOfferTokenChange: (value: Record<string, any>) => void;
  approveToken: (
    address: string,
    amount: string | BN,
    options?: ActionOption
  ) => void;
  queryingContract: boolean;
  initialValues?: Record<string, any>;
  loading?: boolean;
}

export const Offer = (props: OfferProps) => {
  const {
    onVisibilityChange,
    visibility,
    onPlaceOffer,
    offerToken,
    onOfferTokenChange,
    approveToken,
    walletAddress,
    queryingContract,
    initialValues,
    loading,
  } = props;

  const [makeConversion, setMakeConversion] = useState(false);

  const [isApproved, setApproval] = useState(false);

  const [form] = Form.useForm();

  const checkAllowance = (amount: string) => {
    const offer = new BN(new Web3().utils.toWei(amount || '0', 'ether'));
    const allowance = new BN(offerToken.allowance);

    if (allowance.eq(new BN(0)) || offer.gt(allowance)) {
      setApproval(false);
      return;
    }
    setApproval(true);
  };

  const onValuesChange = (changedValues: Record<string, any>) => {
    if (has(changedValues, 'amount')) {
      const amount = cleanInput(changedValues.amount);
      checkAllowance(amount);
    }
  };

  const onTriggerConvert = (value = true) => {
    setMakeConversion(value);
  };

  const onApproveAmount = () => {
    form.validateFields(['amount']).then((values) => {
      // alert(JSON.stringify(values));
      const weiAmount = new Web3().utils.toWei(
        cleanInput(values.amount),
        'ether'
      );
      approveToken(walletAddress, weiAmount, {
        onFinish: () => {
          setApproval(true);
        },
      });
    });
  };

  useEffect(() => {
    checkAllowance(cleanInput(form.getFieldValue('amount') ?? '0'));
  }, [offerToken.allowance, offerToken.symbol]);

  const _initialValues = Object.assign(
    {},
    {
      terms: false,
    },
    initialValues
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
          {makeConversion ? 'Add Funds' : 'Make an Offer'}
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
      {makeConversion && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className={'h-100'}
        >
          <Convert
            currency={process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL as string}
            conversionCurrency={{
              symbol: offerToken.symbol,
              address: offerToken.address,
              link: `${process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_EXPLORER_URL}/address/${offerToken.address}`,
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
          <OfferForm
            form={form}
            initialValues={_initialValues}
            offerToken={offerToken.symbol}
            offerTokenBalance={offerToken.balance as string}
            onFinish={onPlaceOffer}
            onValuesChange={onValuesChange}
            onOfferTokenChange={onOfferTokenChange}
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
              <Footer
                form={form}
                currency={offerToken.symbol as string}
                onConvert={() => onTriggerConvert(true)}
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
              <Footer
                form={form}
                currency={
                  process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL as string
                }
                onConvert={() => onTriggerConvert(true)}
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
