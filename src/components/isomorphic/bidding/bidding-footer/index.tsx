import { Button, FormInstance, Space } from 'antd';
// import { toUpper } from 'lodash';

interface BiddingFooterProps {
  onConvert: () => void;
  currency: string;
  form: FormInstance;
  disabled?: boolean;
  loading?: boolean;
  isApproved?: boolean;
  onApprove: () => void;
}
export const BiddingFooter = (props: BiddingFooterProps) => {
  const {
    // onConvert,
    // currency,
    form,
    disabled,
    loading,
    isApproved,
    onApprove,
  } = props;
  return (
    <Space className={'w-100 meta-flex-j-c'} align={'center'}>
      {isApproved && (
        <Button
          shape={'round'}
          type={'primary'}
          disabled={disabled}
          loading={loading}
          onClick={form.submit}
        >
          Place Bid
        </Button>
      )}

      {!isApproved && (
        <Button
          shape={'round'}
          type={'primary'}
          disabled={disabled}
          loading={loading}
          onClick={onApprove}
        >
          Approve
        </Button>
      )}

      {/*<Button type={'ghost'} shape={'round'} onClick={onConvert}>*/}
      {/*  Get {toUpper(currency)}*/}
      {/*</Button>*/}
    </Space>
  );
};
