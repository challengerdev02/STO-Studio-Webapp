import {
  Button,
  DrawerProps,
  Input,
  Modal,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { useCallback } from 'react';
import { toCanvas } from 'qrcode';
import { Canvas } from './index.styled';
import { copyToClipboard } from '@/shared/utils';
import { isDesktop, isMobile } from 'react-device-detect';

const { Title, Text } = Typography;

interface AddFundProps extends DrawerProps {
  address: string;
  onVisibilityChange: (visible: boolean) => void;
  visibility: boolean;
}

export const AddFund = (props: AddFundProps) => {
  const { address, onVisibilityChange, visibility } = props;

  const qrCodeCallbackRef = useCallback(
    (node) => {
      if (node) {
        toCanvas(node, address, {
          // quality: 1
        });
      }
    },
    [address]
  );

  return (
    <Modal
      title="Add Funds"
      visible={visibility}
      onCancel={() => onVisibilityChange(false)}
      footer={null}
      centered={isMobile}
      width={isDesktop ? '40vw' : '95vw'}
    >
      <Space
        size={30}
        direction={'vertical'}
        className="add-fund-container w-100"
        // align={'center'}
      >
        <div className="w-100 meta-flex meta-flex-center">
          <Canvas
            ref={qrCodeCallbackRef}
            id="qr-canvas"
            className="qr-canvas"
          />
        </div>
        <Title level={4} style={{ textAlign: 'center' }}>
          Transfer funds from an{' '}
          <Tooltip
            title={
              'A cryptocurrency exchange is an online marketplace where users buy, sell, and trade cryptocurrency. e.g Binance, Coinbase, Gemini, Kraken, etc.'
            }
          >
            <a>exchange</a>
          </Tooltip>{' '}
          or another wallet to your wallet address below:
        </Title>

        <Input.Group compact style={{ width: '100%' }}>
          <Input
            style={{
              width: 'calc(100% - 70px)',
              fontWeight: 500,
            }}
            defaultValue={address}
            readOnly
          />
          <Button
            type="primary"
            onClick={() => copyToClipboard(address ?? 'N/A')}
          >
            Copy
          </Button>
        </Input.Group>

        <Text
          className={'w-100 meta-flex meta-flex-center'}
          style={{ textAlign: 'center' }}
        >
          Only send {process.env.NEXT_PUBLIC_BASE_BSC_CHAIN_SYMBOL as string} or
          any other BEP-20 token to this address.
        </Text>
      </Space>
    </Modal>
  );
};
