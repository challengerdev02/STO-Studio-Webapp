import { Button, Form, Radio } from 'antd';
// import Text from 'antd/lib/typography/Text';
// import { Fragment } from 'react';
// import { MainLoader } from '../../isomorphic/loader';
// import { Auction } from './auction';
import { BuyNow } from './buy-now';
import { LaunchEvent } from './launch-event';
import { FormCard, FormTitle, FormWrapperContainer } from './index.styled';

type FormTypes = 'BuyNow' | 'Auction' | 'Launch';
interface SaleSchedulingProps {
  title: string;
  selectedForm: string;
  loading?: boolean;
  onFormTypeChange: (x: FormTypes) => void;
  onFinish: (x: any) => void;
  [x: string]: any;
}

export const SaleScheduling = (props: SaleSchedulingProps) => {
  const {
    title,
    selectedForm,
    onFinish,
    onFormTypeChange,
    loading = false,
    disabled,
    scheduleType,
    currentChainId,
    ...rest
  } = props;
  const onValueChange = ({ saleType }: { saleType: FormTypes }) => {
    if (saleType) {
      onFormTypeChange(saleType);
    }
  };
  const renderFormBody = () => {
    switch (selectedForm) {
      case 'BuyNow':
      case 'Auction':
        return (
          <BuyNow
            isAuction={selectedForm === 'Auction'}
            disabled={disabled}
            scheduleType={scheduleType}
            currentChainId={currentChainId}
          />
        );
      case 'Launch':
        return <LaunchEvent />;
      default:
        break;
    }
  };

  const renderSubmitText = () => {
    switch (selectedForm) {
      case 'BuyNow':
      case 'Auction':
        return 'Schedule Sale';
      case 'Launch':
        return 'Schedule Launch';
      default:
        break;
    }
  };

  return (
    <FormWrapperContainer className={'meta-form-container'}>
      <FormTitle>{title}</FormTitle>
      <FormCard>
        <Form
          name="sale-scheduling-form"
          onFinish={onFinish}
          onValuesChange={onValueChange}
          initialValues={{
            saleType: selectedForm,
            royalty: '',
            maxSupply: 1,
          }}
          layout="vertical"
          requiredMark={false}
          {...rest}
        >
          <Form.Item name="saleType">
            <Radio.Group>
              <Radio value="BuyNow">Buy Now</Radio>
              <Radio value="Auction">Auction</Radio>
              {/*<Radio value="Launch">Launch Event</Radio>*/}
            </Radio.Group>
          </Form.Item>

          {renderFormBody()}

          <Form.Item className="submit-row">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={disabled}
            >
              {renderSubmitText()}
              {/*<i className="mc-arrow-right-2-line mc-lg" />*/}
            </Button>
            {/*{loading ? (*/}
            {/*  <div className="auto-container">*/}
            {/*    {' '}*/}
            {/*    <MainLoader />*/}
            {/*  </div>*/}
            {/*) : (*/}
            {/*  <Fragment />*/}
            {/*)}*/}
          </Form.Item>
        </Form>
      </FormCard>
    </FormWrapperContainer>
  );
};
