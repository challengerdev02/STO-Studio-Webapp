//import {  MainLoader } from '@/components';
import { useAccount, useSale, useUIState } from '@/hooks';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { useRouter } from 'next/router';
// import { get } from 'lodash';
import { randomBytes } from 'crypto';
// import { UserNamespace } from '@/shared/namespaces/user';
import { WalletSetup } from '@/components/account/wallet-setup';
import { createWallet, encryptWallet, md5 } from 'src/blockchain/bitcoin';
import _ from 'lodash';
import { useApiRequest } from 'src/hooks/useApiRequest';
import { APP_URL, BTC_WALLET_KEY, PUT, STATE_KEYS } from '@/shared/index';
import { Storage } from '@/shared/utils';
import { BaseWeb3Context } from 'src/blockchain/base';

export const WalletSetupContainer = () => {
  const router = useRouter();

  const { accounts, chainId, signMessage, unlockOrdinalWallet } =
    useContext(BaseWeb3Context);

  const { uiLoaders } = useUIState();

  let generatingWallet = false;

  useEffect(() => {
    if (!accounts?.[0]) {
      router.push('/connect?');
      // console.log('SIGNEDADDRESS', accounts, signedAddress)
    }
  }, [accounts]);

  const { handleGetAccount, user } = useAccount({
    key: STATE_KEYS.currentUser,
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
    seed: any;
  };

  const [creatingWallet, setCreatingWallet] = useState<boolean>(false);
  const [encryptingState, setEncryptingState] = useState<
    null | 'started' | 'completed' | 'error'
  >();
  const [savingWallet, setSavingWallet] = useState<
    null | 'started' | 'completed' | 'error'
  >();
  const [wallet, setWallet] = useState<Wallet>({
    descriptor: '',
    seed: '',
  });

  const [passwordForm] = Form.useForm();
  const [keygenForm] = Form.useForm();
  const [validateSeedForm] = Form.useForm();

  const key = '@@btc-wallet';
  const { makeApiRequest } = useApiRequest({ key });
  const loading = uiLoaders[key];
  const loadingUser = uiLoaders['@@user-account'];

  const [stage, setStage] = useState<number>(4);

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

  const encryptNewWallet = (callBack: (data: any, error: any) => void) => {
    const iv = randomBytes(16).toString('hex');
    const fingerprint = md5(`${iv}:${wallet.seed.toString('hex')}`);

    signMessage(iv)
      .then((signature: any) => {
        const encrypted = encryptWallet(
          wallet.seed.toString('hex'),
          signature,
          Buffer.from(iv, 'hex')
        );
        storage.set(JSON.stringify({ ...encrypted, fingerprint }));
        callBack(encrypted, null);
      })
      .catch((e) => {
        console.log('PRIVATE_KEY_ERROR', e);
        callBack(null, e);
      });
  };

  useEffect(() => {
    // if (user && user.btcAccounts?.length) {
    //   router.replace(`/account`);
    //   return;
    // }
    console.log('stage', stage);
    if (stage == 2) {
      if (_.isEmpty(wallet)) {
        setCreatingWallet(true);

        setWallet(createWallet());
        setCreatingWallet(false);
      }
    }
    if (stage == 4) {
      console.log('here 4');
      // if (!user?._id || generatingWallet) return;
      step4();
    }
    if (stage == 5) {
      step5();
    }
  }, [stage, user?._id]);

  useEffect(() => {
    if (!_.isEmpty(wallet)) {
      console.log(wallet);
    }
  }, [wallet]);
  console.log('CHAINID', chainId);

  const step4 = () => {
    if (generatingWallet) return;
    generatingWallet = true;
    setEncryptingState('started');

    if (user?._id && !user?.btcAccounts?.[0] && generatingWallet) {
      unlockOrdinalWallet(
        String(accounts?.[0])
        // user: String(user?._id),
      )
        .then((seed) => {
          setWallet(createWallet(seed));
          setEncryptingState('completed');
          generatingWallet = false;
          setTimeout(() => {
            setStage(5);
            step5();
          }, 1000);
        })
        .catch((e) => {
          generatingWallet = false;
          console.error(e);
          setEncryptingState('error');
        });
    } else {
      if (!user?.btcAccounts?.[0]) setEncryptingState('error');
      else router.replace('/account');
    }
  };

  const step5 = () => {
    if (wallet?.tapRootAddress) {
      setSavingWallet('started');
      console.log('started');
      // if (chainId !== SOLANA_CHAIN_ID && chainId) {
      makeApiRequest(
        `${APP_URL.bitcoin.addWallet}`,
        PUT,
        { tr: wallet.descriptor, address: wallet.tapRootAddress },
        {
          onFinish: async (_: any) => {
            setSavingWallet('completed');
            handleGetAccount({
              onFinish: () => {
                setTimeout(() => {
                  // setPassphrase(passwordForm.getFieldValue('password'));
                }, 1000);
              },
            });
          },
          onError: (e) => {
            setSavingWallet('error');
            console.log('SavingWalletError', e);
          },
        }
      );
      // } else {
      //   setTimeout(() => {
      //     setSavingWallet('completed');
      //   }, 2000);
      // }
    }
  };
  const step5old = () => {
    if (wallet?.tapRootAddress) {
      setEncryptingState('started');
      encryptNewWallet((_: any, error: any) => {
        if (error) {
          setEncryptingState('error');
          return;
        }
        setEncryptingState('completed');
        setSavingWallet('started');
        makeApiRequest(
          `${APP_URL.bitcoin.addWallet}`,
          PUT,
          { tr: wallet.descriptor, address: wallet.tapRootAddress },
          {
            onFinish: async (_: any) => {
              setSavingWallet('completed');
              handleGetAccount({
                onFinish: () => {
                  setTimeout(() => {
                    // setPassphrase(passwordForm.getFieldValue('password'));
                  }, 1000);
                },
              });
            },
            onError: (e) => {
              setSavingWallet('error');
              console.log('SavingWalletError', e);
            },
          }
        );
      });
    }
  };

  return (
    <>
      {/* {user && user._id && ( */}
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
        step5={step5}
        step4={step4}
      />
      {/* )} */}
    </>
  );
};
