//import {  MainLoader } from '@/components';
import { useAccount, useSale, useUIState } from '@/hooks';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { useRouter } from 'next/router';
// import { get } from 'lodash';
// import { UserNamespace } from '@/shared/namespaces/user';
import { WalletSetup } from '@/components/account/wallet-setup';
import {
  createWallet,
  decryptWallet,
  encryptWallet,
} from 'src/blockchain/bitcoin';
import _ from 'lodash';
import { useApiRequest } from 'src/hooks/useApiRequest';
import { APP_URL, BTC_WALLET_KEY, PUT } from '@/shared/index';
import { Storage } from '@/shared/utils';
import { BaseWeb3Context } from 'src/blockchain/base';

export const WalletSetupContainer = () => {
  const router = useRouter();

  const { accounts, chainId } = useContext(BaseWeb3Context);
  const accountKey = '@@user-account';
  const { passphrase, setPassphrase } = useAccount({
    key: accountKey,
    autoFetch: true,
  });
  // const {
  //   user: userData,
  // } = useAccount({
  //   key,
  //   autoFetch: true,
  // });
  const { uiLoaders } = useUIState();

  useEffect(() => {
    if (!accounts?.[0]) {
      router.push('/connect?referrer=/account/wallet-setup');
      // console.log('SIGNEDADDRESS', accounts, signedAddress)
    }
  }, [accounts]);

  const userKey = '@@user-account';
  const { handleGetAccount } = useAccount({
    key: userKey,
    autoFetch: true,
    // autoFetchDeps: props.dependencies,
  });

  let storage = new Storage(
    `${BTC_WALLET_KEY}/${accounts?.[0]?.toLowerCase()}`
  );

  type Wallet = {
    privateKey?: any;
    publicKey?: any;
    tapRootAddress?: any;
    address?: any;
    descriptor: string;
  };

  const [creatingWallet, setCreatingWallet] = useState<boolean>(false);
  const [encryptingState, setEncryptingState] = useState<
    null | 'started' | 'completed'
  >();
  const [savingWallet, setSavingWallet] = useState<
    null | 'started' | 'completed'
  >();
  const [wallet, setWallet] = useState<Wallet>({});

  const [passwordForm] = Form.useForm();
  const [keygenForm] = Form.useForm();
  const [validateSeedForm] = Form.useForm();

  const key = '@@btc-wallet';
  const { makeApiRequest } = useApiRequest({ key });
  const loading = uiLoaders[key];

  const [stage, setStage] = useState<number>(1);

  const onFinish = (data: any) => {
    let canSubmit = false;
    for (var key in data) {
      if (data[key]) canSubmit = true;
    }

    // form.resetFields();
  };

  const nextStep = () => {
    setStage(stage + 1);
  };
  const prevStep = () => {
    setStage(stage - 1);
  };

  useEffect(() => {
    if (stage == 2) {
      if (_.isEmpty(wallet)) {
        setCreatingWallet(true);
        setWallet(createWallet());
        setCreatingWallet(false);
      }
    }
    if (stage == 4) {
      console.log('WALLTE', wallet.tapRootAddress);
      if (wallet?.tapRootAddress) {
        setSavingWallet('started');
        makeApiRequest(
          `${APP_URL.bitcoin.addWallet}`,
          PUT,
          { tr: wallet.descriptor, address: wallet.tapRootAddress },
          {
            onFinish: (_: any) => {
              setSavingWallet('completed');
              handleGetAccount({
                onFinish: () => {
                  setEncryptingState('started');
                  setTimeout(() => {
                    setPassphrase(passwordForm.getFieldValue('password'));
                    const encrypted = encryptWallet(
                      wallet.privateKey.toString('hex'),
                      passwordForm.getFieldValue('password')
                    );
                    storage.set(JSON.stringify(encrypted));
                    setEncryptingState('completed');
                  }, 1000);
                },
              });
            },
            onAfterError: (e) => {
              setSavingWallet(null);
              console.log('SavingWalletError', e);
            },
          }
        );
      }
    }
  }, [stage]);

  useEffect(() => {
    if (!_.isEmpty(wallet)) {
      console.log(wallet);
    }
  }, [wallet]);
  console.log('CHAINID', chainId);

  return (
    <>
      <WalletSetup
        onFinish={onFinish}
        loading={loading}
        $record={{}}
        forms={{
          password: passwordForm,
          keygen: keygenForm,
          validateSeed: validateSeedForm,
        }}
        handlePreview={() => {
          router.push(`/account`);
        }}
        chainId={Number(chainId)}
        stage={stage}
        wallet={wallet}
        nextStep={nextStep}
        prevStep={prevStep}
        encryptingState={encryptingState}
        savingWallet={savingWallet}
        creatingWallet={creatingWallet}
      />
    </>
  );
};
