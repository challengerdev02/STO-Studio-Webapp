import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ViewAccountContainer } from 'src/containers/account/view';
import { useAccount } from '@/hooks';

const UserAccount = () => {
  const key = '@@user-account';
  const { handleFindOneAccount, search } = useAccount({ key, autoFetch: true });
  const router = useRouter();
  let { accountAddress } = router.query;

  useEffect(() => {
    if (accountAddress && !String(accountAddress).startsWith('0x')) {
      handleFindOneAccount({
        params: {
          username: accountAddress,
        },
      });
    }
  }, [accountAddress]);
  const userInfo = search(key);
  if (!accountAddress) return null;
  if (!String(accountAddress).startsWith('0x')) {
    return userInfo ? (
      <ViewAccountContainer
        user={userInfo}
        accountAddress={String(userInfo?.walletAddress)}
      />
    ) : null;
  }
  if (String(accountAddress).startsWith('0x')) {
    return <ViewAccountContainer accountAddress={String(accountAddress)} />;
  }
};

export default UserAccount;
