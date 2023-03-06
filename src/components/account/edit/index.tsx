import { FormInstance } from 'antd';
import React, { ChangeEvent, ReactElement } from 'react';
import styled from 'styled-components';
// import { Notifications } from './notification';
import { Profile } from './profile';
// import { AccountSupport } from './support';
// import { useRouter } from 'next/router';

// const { TabPane } = Tabs;

interface AccountEditFormStyle {
  uploadAvatarProps: Record<string, any>;
  uploadCoverProps: Record<string, any>;
  loading: boolean;
  onFinish: (data: any) => void;
  onNotificationFinish?: (data: any) => void;
  handlePreview?: (e: any) => void;
  $record: Record<string, any>;
  form: FormInstance;
  onValidateUsername: (event: ChangeEvent<HTMLInputElement>) => void;
  isValidUsername: boolean;
  validatingUsername: boolean;
}

export const AccountEdit = ({
  loading,
  onFinish,
  // onNotificationFinish,
  $record,
  uploadAvatarProps,
  uploadCoverProps,
  handlePreview,
  form,
  onValidateUsername,
  isValidUsername,
  validatingUsername,
}: AccountEditFormStyle): ReactElement => {
  // const router = useRouter();
  // const { tab } = router.query;

  // const defaultActiveKey: string = typeof tab != 'string' ? 'profile' : tab;

  return (
    <Wrapper data-testid="edit-account-component">
      <div className="main-layout" style={{ paddingTop: 20 }}>
        <Profile
          loading={loading}
          onFinish={onFinish}
          $record={$record}
          uploadAvatarProps={uploadAvatarProps}
          uploadCoverProps={uploadCoverProps}
          form={form}
          handlePreview={handlePreview}
          onValidateUsername={onValidateUsername}
          isValidUsername={isValidUsername}
          validatingUsername={validatingUsername}
        />
      </div>
      {/*<Tabs*/}
      {/*  className="main-layout"*/}
      {/*  defaultActiveKey={defaultActiveKey}*/}
      {/*  centered*/}
      {/*>*/}
      {/*  <TabPane tab="Profile" key="profile">*/}
      {/*    <Profile*/}
      {/*      loading={loading}*/}
      {/*      onFinish={onFinish}*/}
      {/*      $record={$record}*/}
      {/*      uploadAvatarProps={uploadAvatarProps}*/}
      {/*      uploadCoverProps={uploadCoverProps}*/}
      {/*      form={form}*/}
      {/*      handlePreview={handlePreview}*/}
      {/*      onValidateUsername={onValidateUsername}*/}
      {/*      isValidUsername={isValidUsername}*/}
      {/*      validatingUsername={validatingUsername}*/}
      {/*    />*/}
      {/*  </TabPane>*/}
      {/*  <TabPane tab="Notifications" key="notifications">*/}
      {/*    <Notifications onFinish={onNotificationFinish} />*/}
      {/*  </TabPane>*/}
      {/*  <TabPane tab="Account Support" key="support">*/}
      {/*    <AccountSupport />*/}
      {/*  </TabPane>*/}
      {/*</Tabs>*/}
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
