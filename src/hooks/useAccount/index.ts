import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import {
  becomeACreator,
  findAccount,
  followUser,
  getAccount,
  getUserTipBalance,
  tipUser,
  updateAccount,
} from '@/actions';
import { UserNamespace } from '@/shared/namespaces/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Storage } from '@/shared/utils';
import { REFERRED_BY_KEY, REFERRED_BY_STORAGE } from '@/shared/constants';

interface UseAccount {
  user?: UserNamespace.User;
  tip: Record<string, any>;
  handleUpdateAccount: (
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  handleBecomeACreator: (
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  handleGetAccount: (options?: ActionOption) => void;
  handleFindOneAccount: (options?: ActionOption) => void;
  handleTipUser: (
    walletAddress: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  handleFollowUser: (
    userId: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  handleGetHCOMIBalance: (
    walletAddress: string,
    options?: ActionOption
  ) => void;
  search: (key: string) => UserNamespace.User | undefined;
  passphrase?: String;
  setPassphrase: (passphrase: string) => void;
}

interface UseAccountProps {
  key: string;
  autoFetch?: boolean;
  options?: ActionOption;
  autoFetchDeps?: any[];
}

export const useAccount = (parameter: UseAccountProps): UseAccount => {
  const { key, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const router = useRouter();

  const { u: referrer } = router.query;

  const [passphrase, setPassphrase] = useState<string | undefined>();

  const { user, search, tip } = useSelector((state: RootState) => {
    return {
      user: state.app.user[key] ?? [],
      search: state.app.search ?? {},
      tip: state.app?.tip?.[key] ?? {},
    };
  });

  useEffect(() => {
    if (referrer) {
      console.log('REFERRER', referrer);
      const storage = new Storage(
        REFERRED_BY_STORAGE,
        { address: String(referrer).toLowerCase() },
        {
          set: REFERRED_BY_KEY,
        }
      );
      storage.set({ address: String(referrer).toLowerCase() });
    }
  }, [referrer]);

  // useEffect(() => {
  //   if (signedAddress && signedAddress.toLowerCase()!=loadedUser.walletAddress) {
  //     handleGetAccount({ key: '@@user-account' });
  //   }
  // }, [signedAddress]);

  const handleUpdateAccount = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      updateAccount(payload, {
        key,
        ...defaultOptions,
        ...options,
      })
    );
  };

  const handleBecomeACreator = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      becomeACreator(payload, {
        key,
        ...defaultOptions,
        ...options,
      })
    );
  };

  const handleFindOneAccount = (options?: ActionOption) => {
    dispatch(
      findAccount({
        key,
        ...defaultOptions,
        ...options,
      })
    );
  };

  const handleGetAccount = (options?: ActionOption) => {
    dispatch(
      getAccount({
        key,
        ...defaultOptions,
        ...options,
      })
    );
  };

  const handleTipUser = (
    walletAddress: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      tipUser(walletAddress, payload, {
        key,
        ...defaultOptions,
        ...options,
      })
    );
  };

  const handleFollowUser = (
    userId: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      followUser(userId, payload, {
        key,
        ...defaultOptions,
        ...options,
      })
    );
  };

  const handleGetHCOMIBalance = (
    walletAddress: string,
    options?: ActionOption
  ) => {
    dispatch(
      getUserTipBalance(walletAddress, {
        key,
        ...defaultOptions,
        ...options,
      })
    );
  };

  // useEffect(() => {
  //   if (autoFetch && autoFetchDeps.every((o) => !!o) && signedAddress?.toLowerCase()!=loadedUser.walletAddress) {
  //     handleGetAccount({
  //       key,
  //     });
  //   }
  // }, [...autoFetchDeps]);

  return {
    user,
    tip,
    handleGetAccount,
    handleUpdateAccount,
    handleFindOneAccount,
    search: (key: string) => search[key],
    handleBecomeACreator,
    handleTipUser,
    handleGetHCOMIBalance,
    handleFollowUser,
    setPassphrase,
    passphrase,
  };
};
