import { CompetitionView } from '@/components/competition/view';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
// import { ViewCompetitionEntries } from '@/components/competition/view-entries';
import { useRouter } from 'next/router';
import { useAccount, useCompetition, useSeries, useUIState } from '@/hooks';
import { JoinCompetition } from '@/components/competition/join-competition';
import { Form, notification } from 'antd';
import { get, has, isEmpty, pick, toLower } from 'lodash';
import { MainLoader } from '@/components';
import { BaseWeb3Context } from '../../../blockchain/base';
import { ActionOption } from '../../../redux/types';
import Head from 'next/head';

const CompetitionViewContainer = () => {
  const router = useRouter();
  const { compID } = router.query;
  const KEY = '@@competition/view';
  const ENTRIES_KEY = '@@competition/view/entries';
  const JOIN_KEY = '@@competition/view/join';
  const VALIDATE_USERNAME_KEY = '@@competition/view/validate-username';
  // const [viewEntriesVisibility, setViewEntriesVisibility] = useState(false);
  const [joinVisibility, setJoinVisibility] = useState(false);
  const { isConnected, signedAddress } = useContext(BaseWeb3Context);
  const [form] = Form.useForm();
  const { uiLoaders, pagination } = useUIState();

  const {
    handleGetEntries,
    handleGetCompetition,
    handleJoinCompetition,
    competition,
    entries,
  } = useCompetition({ key: KEY });

  const {
    user,
    search: searchUser,
    handleFindOneAccount,
    handleGetAccount,
    handleUpdateAccount,
  } = useAccount({ key: '@@user-account', autoFetch: false });

  const { handleBrowseSeries, allSeries } = useSeries({ key: KEY });

  const validateUsername = searchUser(VALIDATE_USERNAME_KEY);

  // const loading = uiLoaders[KEY];
  const validatingUsername = uiLoaders[VALIDATE_USERNAME_KEY];
  const joiningCompetition = uiLoaders[JOIN_KEY];
  const loadingEntries = uiLoaders[ENTRIES_KEY];
  const entriesPagination = pagination[ENTRIES_KEY];

  const onJoinVisibilityChange = (visibility: boolean) => {
    setJoinVisibility(visibility);
  };

  const onJoin = (values: Record<string, any>) => {
    handleJoinCompetition(compID as string, pick(values, ['series']), {
      onFinish(_) {
        onGetCompetitionEntries();
        onGetCompetition({ uiKey: '@@@join' });
        // form.resetFields();
        onJoinVisibilityChange(false);
      },
      uiKey: JOIN_KEY,
      noSuccessMessage: false,
      successMessage: 'Successfully enrolled in competition',
    });
  };

  const onJoinCompetition = (values: Record<string, any>) => {
    if (isEmpty(user?.socials)) {
      notification.warn({
        message: 'You need to add at least one social profile',
      });
      return;
    }
    handleUpdateAccount(values, {
      noSuccessMessage: true,
      onFinish: (_) => {
        onJoin(values);
      },
      uiKey: JOIN_KEY,
    });
  };

  const onGetCompetitionEntries = (params = {}) => {
    if (compID) {
      handleGetEntries(compID as string, {
        uiKey: ENTRIES_KEY,
        params: {
          sort: JSON.stringify([
            ['subscription', -1],
            ['likes', -1],
          ]),
          population: JSON.stringify([{ path: 'series', populate: 'user' }]),
          perPage: 20,
          ...params,
        },
        virtualized: true,
      });
    }
  };

  const onGetCompetition = (option?: ActionOption) => {
    if (compID) {
      handleGetCompetition(compID as string, option);
    }
  };

  const onGetAllSeries = () => {
    if (compID && signedAddress && isConnected) {
      handleBrowseSeries({
        params: {
          walletAddress: toLower(signedAddress),
        },
      });
    }
  };

  const onValidateUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const username = get(event, 'target.value');
    if (username === user?.username) {
      return;
    }
    handleFindOneAccount({
      key: VALIDATE_USERNAME_KEY,
      params: {
        username,
      },
    });
  };

  const onInitialValues = () => {
    form.setFieldsValue({
      username: form.getFieldValue('username') ?? user?.username,
      email: form.getFieldValue('email') ?? user?.emailAccount?.email,
      emailVerified:
        form.getFieldValue('emailVerified') ??
        user?.emailAccount?.verified ??
        false,
      walletAddress: form.getFieldValue('walletAddress') ?? user?.walletAddress,
      bio: form.getFieldValue('bio') ?? user?.bio,
      avatar: form.getFieldValue('avatar') ?? user?.avatar,
      cover: form.getFieldValue('cover') ?? user?.banner,
      socials: form.getFieldValue('socials') ?? user?.socials,
    });
  };

  useEffect(() => {
    onGetAllSeries();
  }, [isConnected, signedAddress, compID]);

  useEffect(() => {
    form.resetFields();
    onInitialValues();
  }, [user?._id]);

  useEffect(() => {
    onGetCompetitionEntries();
    onGetCompetition();
  }, [compID]);

  const isValidUsername =
    !has(validateUsername, '_id') ||
    (has(validateUsername, '_id') &&
      validateUsername?.username === user?.username);

  const onWindowBlur = (_: FocusEvent) => {};

  const onWindowFocus = (_: FocusEvent) => {
    handleGetAccount();
  };

  useEffect(() => {
    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('focus', onWindowFocus);

    return () => {
      window.removeEventListener('blur', onWindowBlur);
      window.removeEventListener('focus', onWindowFocus);
    };
  }, []);

  if (!competition || isEmpty(competition)) {
    return (
      <div
        className="meta-flex meta-flex-center w-100 h-100"
        style={{ height: '50vh' }}
      >
        <MainLoader height={50} width={50} />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>MataComic - {competition.title}</title>
        <meta name="description" content={competition.description} />
      </Head>
      <CompetitionView
        {...competition}
        enrollments={entries}
        onJoinVisibilityChange={onJoinVisibilityChange}
        onGetEntries={onGetCompetitionEntries}
        pagination={entriesPagination}
        loadingEntries={loadingEntries}
      />
      <JoinCompetition
        onCancel={onJoinVisibilityChange}
        title={competition.title}
        visibility={joinVisibility}
        loading={joiningCompetition}
        form={form}
        isValidUsername={isValidUsername}
        validatingUsername={validatingUsername}
        onFinish={onJoinCompetition}
        onValidateUsername={onValidateUsername}
        username={user?.username ?? ''}
        emailVerified={user?.emailAccount?.verified}
        userEmail={user?.emailAccount?.email}
        user={user}
        series={allSeries}
      />
      {/*<ViewCompetitionEntries*/}
      {/*  visibility={viewEntriesVisibility}*/}
      {/*  onClose={onViewEntriesVisibilityChange}*/}
      {/*  entries={entries}*/}
      {/*/>*/}
    </>
  );
};
export default CompetitionViewContainer;
