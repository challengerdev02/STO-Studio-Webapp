import { Button, Space } from 'antd';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';

const Wallets: any = ({ showFull, prop }: any) => {
  const { wallets } = useWallet();

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
          onClick={() => prop.connect('solana', wallet.adapter.name)}
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

      </motion.div>
    ));
};

export default Wallets;
