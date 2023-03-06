import { Button, FormInstance, Space } from 'antd';
import { toUpper } from 'lodash';

interface FooterProps {
  onConvert: () => void;
  currency: string;
  form: FormInstance;
  disabled?: boolean;
  loading?: boolean;
  isApproved?: boolean;
  onApprove: () => void;
}
export const Footer = (props: FooterProps) => {
  const {
    onConvert,
    currency,
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
          Make Offer
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

      <Button type={'default'} shape={'round'} onClick={onConvert}>
        Get {toUpper(currency)}
      </Button>
    </Space>
  );
};
