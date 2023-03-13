import { encrypt } from '@metamask/eth-sig-util';
import { FormInstance } from 'antd';
import React, { ChangeEvent, ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { EncryptForm } from './encrypt-form';
import { KeyConfirmForm } from './key-confirm-form';
import { KeyGenForm } from './key-gen-form';
import { PasswordForm } from './password-form';

// import { Notifications } from './notification';
// import { AccountSupport } from './support';
// import { useRouter } from 'next/router';

// const { TabPane } = Tabs;
// const ECPair = ECPairFactory(secp);

interface WalletSetupFormStyle {
  loading: boolean;
  onFinish: (data: any) => void;
  onNotificationFinish?: (data: any) => void;
  handlePreview?: (e: any) => void;
  $record: Record<string, any>;
  forms: {
    password: FormInstance;
    keygen: FormInstance;
    validateSeed: FormInstance;
  };
  nextStep: () => void;
  prevStep: () => void;
  stage: number;
  wallet: any;
  creatingWallet: boolean;
  savingWallet?: null | 'started' | 'completed' | 'error';
  encryptingState?: null | 'started' | 'completed' | 'error';
  chainId: number;
  step5: () => void;
  step4: () => void;
}

export const WalletSetup = ({
  loading,
  onFinish,
  // onNotificationFinish,
  $record,
  nextStep,
  stage,
  wallet,
  encryptingState,
  prevStep,
  savingWallet,
  chainId,
  step4,
  // uploadAvatarProps,
  // uploadCoverProps,
  // handlePreview,
  forms,
}: // onValidateUsername,
// isValidUsername,
// validatingUsername,
WalletSetupFormStyle): ReactElement => {
  // const router = useRouter();
  // const { tab } = router.query;

  // const defaultActiveKey: string = typeof tab != 'string' ? 'profile' : tab;

  return (
    <Wrapper data-testid="edit-account-component">
      <div className="main-layout" style={{ paddingTop: 20 }}>
        {stage == 1 && (
          <PasswordForm
            loading={loading}
            onFinish={onFinish}
            $record={$record}
            nextStep={nextStep}
            form={forms['password']}
          />
        )}
        {stage == 2 && (
          <KeyGenForm
            loading={loading}
            onFinish={onFinish}
            $record={$record}
            nextStep={nextStep}
            prevStep={prevStep}
            form={forms['keygen']}
            wallet={wallet}
          />
        )}
        {stage == 3 && (
          <KeyConfirmForm
            loading={loading}
            onFinish={onFinish}
            nextStep={nextStep}
            prevStep={prevStep}
            form={forms['keygen']}
            wallet={wallet}
          />
        )}
        {[4, 5].includes(stage) && (
          <EncryptForm
            loading={loading}
            onFinish={onFinish}
            nextStep={nextStep}
            prevStep={prevStep}
            form={forms['keygen']}
            chainId={chainId}
            encryptingState={encryptingState}
            savingWallet={savingWallet}
            wallet={wallet}
            step4={step4}
          />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .site-layout {
    padding-top: 100px;
  }
  .ant-upload-list {
    display: none;
  }
  .ant-tabs-nav {
    margin: 25px 0 100px 0 !important;
  }

  .main-layout {
    width: 80%;
    .ant-input {
      /* background-color: rgb(53, 56, 64); */
      border-radius: 10px;
      border: 1px solid var(--border-color-base);
    }
    .header {
      padding: 10px;
      font-size: 12px;
      font-weight: 700 !important;
      color: var(--text-color) !important;
    }
    .ant-btn {
      //color: var(--text-color) !important;
      font-weight: 700;
      font-size: 14px;
      //line-height: 16px;
    }
    .ant-layout-sider {
      & {
        background-color: transparent;
        border-right: 1px solid var(--border-color-base);
      }
      .ant-menu {
        background-color: transparent;
      }
      .ant-menu-item {
        color: var(--text-color) !important;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
  .content-notification {
    .ant-list-item-meta-description {
      color: var(--text-color-secondary) !important;
    }
    .ant-list-items {
      border: 1px solid var(--border-color-split);
      border-radius: 6px;
      .ant-list-item-meta {
        align-items: center;
        .ant-list-item-meta-avatar {
          display: flex;
          align-items: center;
          margin-left: 12px;
        }
      }
    }
    .sub-title {
      display: block;
      margin-bottom: 20px;
    }
    .ant-collapse-header > div {
      display: inline;
    }
    .bottom-title {
      margin-top: 20px;
    }
    .buttom-input .ant-input {
      line-height: 4;
    }
    .submit-button {
      margin-top: 10px;
      padding: 10px 20px;
    }
    .addonBefore-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
      }
    }
  }
  .content-profile {
    display: flex;
    flex-flow: column;
    .ant-form-item-label {
      font-weight: 600;
      font-size: 16px;
    }
    .title {
      display: flex;
      justify-content: space-between;
    }
    .left-fields {
      width: 100%;
      .ant-input-group-compact {
        display: flex;
        input {
          flex-grow: 1;
        }
      }
    }
    .right-fields {
      padding: 20px;
      width: 100%;
      .profile-image {
        border-radius: 150px;
      }
      .cover-image {
        border-radius: 20px;
      }
      .ant-image {
        width: 100% !important;
      }
    }
    .ant-input-disabled {
      color: var(--input-placeholder-color) !important;
    }
  }
  @media only screen and (min-width: 1440px) {
    & {
      /* margin-top: -50px !important;
      margin-bottom: -100px !important;
      margin-left: -50px !important;
      margin-right: -50px !important; */
    }
    .ant-tabs-nav {
      /* padding-top: 50px; */
    }
  }

  @media only screen and (min-width: 1024px) and (max-width: 1439px) {
    & {
      /* margin: -50px !important; */
    }
  }
  @media only screen and (min-width: 480px) and (max-width: 1023px) {
    & {
      /* margin: -40px !important; */
    }
  }
  @media only screen and (max-width: 479px) {
    & {
      /* margin: -24px !important; */
    }
  }
`;
