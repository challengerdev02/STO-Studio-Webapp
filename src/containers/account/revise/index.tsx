import { AccountEdit, MainLoader } from '@/components';
import { useAccount, useUIState } from '@/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { useRouter } from 'next/router';
import { get } from 'lodash';
import { UserNamespace } from '@/shared/namespaces/user';

export const EditAccountContainer = () => {
  const key = '@@user-account';
  const validatingUserKey = `${key}-validating`;
  const avatarKey = '@@upload-avatar-on-view-account-container';
  const bannerKey = '@@upload-banner-on-view-account-container';
  const router = useRouter();

  const {
    user: userData,
    search,
    handleUpdateAccount,
    handleFindOneAccount,
    handleGetAccount,
  } = useAccount({
    key,
    autoFetch: true,
  });
  const { uiLoaders } = useUIState();

  const validateUsername = search(validatingUserKey);

  const loading = uiLoaders[key];
  const validatingUsername = uiLoaders[validatingUserKey];
  const avatarLoading = uiLoaders[avatarKey];
  const bannerLoading = uiLoaders[bannerKey];

  const [uploadResponse, setUploadResponse] = useState<any>();
  const [uploadCoverResponse, setUploadCoverResponse] = useState<any>();
  const [uploadStates, setUploadStates] = useState<Record<string, boolean>>({
    avatar: false,
    banner: false,
  });

  const [isValidUsername, setIsValidUsername] = useState(true);

  const [user, setUser] = useState<UserNamespace.User>();
  const [mockData, setMockData] = useState<any>({
    connections: {
      followers: user?.followers,
      following: user?.followers,
    },
    ...(user ?? {}),
    uploadStates,
    loadings: {
      bannerLoading,
      avatarLoading,
    },
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (user) {
      setMockData({
        connections: {
          followers: user?.followers,
          following: user?.followers,
        },
        ...(user ?? {}),
        uploadStates,
        loadings: {
          bannerLoading,
          avatarLoading,
        },
      });
    }
  }, [user]);

  const onUploadChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      if (info.file.response && info.file.response.data) {
        setUploadResponse(info.file.response.data);
        setUploadStates((old) => ({ ...old, avatar: false }));
      }
    } else {
      setUploadStates((old) => ({ ...old, avatar: true }));
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name} image upload failed.`);
    }
  };

  const onUploadCoverChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      if (info.file.response && info.file.response.data) {
        setUploadCoverResponse(info.file.response.data);
        setUploadStates((old) => ({ ...old, banner: false }));
      }
    } else {
      setUploadStates((old) => ({ ...old, banner: true }));
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name} image upload failed.`);
    }
  };

  const uploadAvatarProps = {
    name: 'file',
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}/media`,
    onChange: onUploadChange,
    maxCount: 1,
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  const uploadCoverProps = {
    name: 'file',
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}/media`,
    onChange: onUploadCoverChange,
    maxCount: 1,
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  useEffect(() => {
    if (uploadResponse && uploadResponse.file && uploadResponse.file.url) {
      handleUpdateAccount(
        {
          avatar: uploadResponse.file.url,
        },
        {
          uiKey: avatarKey,
          onFinish: (data: any) => {
            //console.log('DATTTTTTT', data);
            setUser((u: any) => ({ ...u, ...data }));
          },
        }
      );
    }
  }, [uploadResponse]);

  useEffect(() => {
    if (
      uploadCoverResponse &&
      uploadCoverResponse.file &&
      uploadCoverResponse.file.url
    ) {
      handleUpdateAccount(
        {
          banner: uploadCoverResponse.file.url,
        },
        {
          onFinish: (data: any) => {
            setUser((u: any) => ({ ...u, ...data }));
          },
          uiKey: bannerKey,
        }
      );
    }
  }, [uploadCoverResponse]);

  const onFinish = (data: any) => {
    let canSubmit = false;
    for (var key in data) {
      if (data[key]) canSubmit = true;
    }
    if (canSubmit) {
      handleUpdateAccount(data, {
        onFinish: (data: any) => {
          setUser((u: any) => ({ ...u, ...data }));
        },
      });
    }
    // form.resetFields();
  };

  const onWindowBlur = (_: FocusEvent) => {};

  const onWindowFocus = (_: FocusEvent) => {
    handleGetAccount({
      onFinish: (data: any) => {
        setUser((u: any) => ({ ...u, ...data }));
      },
    });
  };

  useEffect(() => {
    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('focus', onWindowFocus);

    return () => {
      window.removeEventListener('blur', onWindowBlur);
      window.removeEventListener('focus', onWindowFocus);
    };
  }, []);

  const onValidateUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const username = get(event, 'target.value');
    if (username === user?.username) {
      return;
    }
    handleFindOneAccount({
      key: validatingUserKey,
      params: {
        username,
      },
    });
  };

  useEffect(() => {
    const validUsername =
      !validateUsername?._id ||
      (!!validateUsername?._id &&
        validateUsername?.username === user?.username);
    setIsValidUsername(validUsername);
  }, [validateUsername]);

  if (!user?.walletAddress) {
    return (
      <div
        style={{ height: '50vh' }}
        className={'meta-flex-center meta-flex'}
        data-testid="main-loader"
      >
        <MainLoader height={40} width={40} />
      </div>
    );
  }

  return (
    <>
      <AccountEdit
        onFinish={onFinish}
        uploadAvatarProps={uploadAvatarProps}
        uploadCoverProps={uploadCoverProps}
        loading={loading}
        $record={mockData}
        form={form}
        handlePreview={() => {
          router.push(`/account`);
        }}
        onValidateUsername={onValidateUsername}
        isValidUsername={isValidUsername}
        validatingUsername={validatingUsername}
      />
    </>
  );
};
