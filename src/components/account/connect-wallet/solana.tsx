import { useState } from 'react';
import { Button, Modal, Space, Typography } from 'antd';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { notification } from 'antd';
import { SigninMessage } from './utils';
import bs58 from 'bs58';
import { getAuthMessage } from '@/shared/utils';

const Wallets: any = ({ showFull, prop }: any) => {
  const [modalState, setModalState] = useState(false);
  const { select, wallets, publicKey, disconnect, signMessage, connected } =
    useWallet();

  const solConnect = (walletName: any) => {
    if (connected) {
      prop.connect('solana', publicKey?.toBase58());
      setModalState(true);
    } else {
      select(walletName);
      prop.connect('solana', publicKey?.toBase58());
    }
  };

  const sign = async () => {
    try {
      const encoder = new TextEncoder();
      const nonce = Date.now();
      const statement = getAuthMessage({
        walletAddress: String(publicKey),
        environment: 'solana',
        nonce,
      });

      const message = new SigninMessage({
        domain: 'http://localhost:3000/account/wallet-setup',
        publicKey: publicKey?.toBase58(),
        statement,
        nonce,
      });

      const data = encoder.encode(message.prepare());
      const signature: any = await signMessage?.(data);
      const serializedSignature = bs58.encode(signature);
      prop.sign('solana', message, statement, serializedSignature);
      setModalState(false);
      // router.push('/account/wallet-setup');
      // signIn("credentials", {
      //     message: JSON.stringify(message),
      //     redirect: false,
      //     signature: serializedSignature,
      // });
    } catch (e: any) {
      console.error('%cSUI SignMessage failed', 'color: red', e);
      notification.error({
        placement: 'bottomLeft',
        message: "We couldn't connect to your wallet.",
        description: e.message,
      });
    }
  };

  return wallets
    .slice(0, showFull ? wallets.length : 4)
    .map((wallet, index) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 0.98 }}
        transition={{ duration: ((index || 1) + 1) * 0.1 }}
        style={{ marginBottom: '20px' }}
        key={index}
      >
        <Button
          block
          shape="round"
          type="default"
          onClick={() => solConnect(wallet.adapter.name)}
        >
          <Space size={10}>
            <Image
              src={wallet.adapter.icon}
              alt={wallet.adapter.name}
              height={24}
              width={24}
            />
            <span>{wallet.adapter.name}</span>
          </Space>
        </Button>

        <Modal
          visible={modalState}
          onCancel={async () => {
            disconnect;
            setModalState(false);
          }}
          okText={'Accept and Sign'}
          cancelText={'Cancel'}
          okButtonProps={{
            shape: 'round',
          }}
          cancelButtonProps={{
            shape: 'round',
          }}
          onOk={() => sign()}
        >
          <Typography.Title>Signature Required!</Typography.Title>

          <span>
            By connecting your wallet and using{' '}
            {process.env.NEXT_PUBLIC_APP_NAME}, you agree to our{' '}
            <a
              href={
                process.env.NEXT_PUBLIC_TERMS_OF_SERVICE ??
                'https://satoshistudio.tawk.help/article/terms-of-service'
              }
              target={'_blank'}
              rel={'noreferrer'}
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              target={'_blank'}
              href={
                process.env.NEXT_PUBLIC_PRIVACY_POLICY ??
                'https://satoshistudio.tawk.help/article/privacy-policy'
              }
              rel={'noreferrer'}
            >
              Privacy Policy
            </a>
            .
          </span>
        </Modal>
      </motion.div>
    ));
  //  : (
  //   <Space>
  //     <Typography>{publicKey.toBase58()}</Typography>
  //     <Button onClick={disconnect}>disconnect wallet</Button>
  //   </Space>
  // );
};

export default Wallets;
