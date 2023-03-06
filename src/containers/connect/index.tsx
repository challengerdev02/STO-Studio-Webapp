import { Connect } from '@/components/account/connect-wallet';
import { useContext, useEffect } from 'react';
// import { BaseWeb3Context } from '../../evm/context';
import { useRouter } from 'next/router';
// import { NearBaseWeb3Context } from '../../near/context/wallet-connector';
import { BaseWeb3Context } from '../../blockchain/base';

export const ConnectWalletContainer = () => {
  const web3 = useContext(BaseWeb3Context);

  const router = useRouter();

  const onRedirectToReferrer = () => {
    if (router.query?.referrer) {
      router.push(router.query.referrer as string);
    } else {
      router.push('/account');
    }
  };

  useEffect(() => {
    if (web3.isConnected) {
      onRedirectToReferrer();
    }
  }, [web3.isConnected]);

  return <Connect {...web3} />;
};
