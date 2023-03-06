import { createContext, ReactNode, useEffect } from 'react';
import { UserNamespace } from '@/shared/namespaces/user';
import { useAccount, useUIState } from '@/hooks';
import { useRouter } from 'next/router';

interface UserContextValues extends Partial<UserNamespace.User> {
  loading: boolean;
}

export const UserContext = createContext<UserContextValues>({ loading: false });

interface UserContextProviderProps {
  children: ReactNode | ReactNode[];
  dependencies: any[];
}

export const UserContextProvider = (props: UserContextProviderProps) => {
  const router = useRouter();
  const key = '@@user-account';
  const { user } = useAccount({
    key,
    autoFetch: true,
    autoFetchDeps: props.dependencies,
  });
  useEffect(() => {
    if (user && typeof user == 'object' && (user as any)?._id) {
      if (
        !user?.btcAccounts?.length &&
        !router.asPath.includes('wallet-setup')
      ) {
        router.replace('/account/wallet-setup');
        return;
      } else {
        if (
          !user?.username &&
          !router.asPath.includes('wallet-setup') &&
          !router.asPath.includes('import')
        ) {
          // router.push('/account/settings');
          return;
        }
      }
    }
  }, [user, router.asPath]);

  const {
    uiLoaders: { [key]: loading },
  } = useUIState();
  return (
    <UserContext.Provider value={{ ...user, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};
