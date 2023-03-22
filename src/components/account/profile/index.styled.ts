import styled from 'styled-components';
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Tabs,
  Upload,
} from 'antd';

export const Wrapper = styled.div`
  width: 100%;
  height: max-content;
  //max-width: 1440px;
  //min-height: 1983px;
  //margin: auto;
  background: rgba(4, 4, 21, 1);
  position: relative;
  //overflow-x: hidden;
  .ant-upload-list {
    display: none;
  }
`;

export const CoverPhotoWrapper = styled.div`
  width: 100%;
  //max-width: 1440px;
  height: 276px;
  position: absolute;
`;

export const CoverPhoto = styled.img`
  width: 100%;
  object-fit: cover;
  max-height: 100%;
`;

export const AltCoverPhoto = styled.div`
  width: 100%;
  height: 276px;
  background: rgba(4, 4, 21, 1);
  position: absolute;
  z-index: 1;
`;

export const CoverPhotoActionsWrapper = styled.div`
  display: flex;
  column-gap: 15px;
  position: absolute;
  width: 88px;
  height: 36px;
  right: 11.5%;
  top: 17%;

  @media only screen and (max-width: 1112px) {
    right: 6%;
  }
`;

export const CoverPhotoActionButton = styled(Button)`
  background: rgba(252, 252, 252, 1) !important;
  border: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 2;
`;

export const ProfileOverview = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 60px 70px 30px 70px;
  top: 182px;
  background: var(--background-primary);
  border-radius: 8px;
  z-index: 2;
  transform: translateY(182px);
  margin-bottom: 182px;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 1336px) {
    width: 100%;
    padding: 60px 24px 30px 24px;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 60px 15px 30px 15px;
  }
`;

export const ProfileSection = styled(Space)`
  width: 100%;
  //height: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Details = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 15px;
  position: relative;

  @media only screen and (max-width: 1439px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .avatar-wrapper {
    position: relative;
    .ant-image-mask {
      opacity: 0 !important;
    }
    .ant-upload-list {
      display: none !important;
    }

    .ant-image {
      width: 80px;
      height: 80px;
      border-radius: 200px;
      overflow: hidden;
      .user-avatar-container {
        width: auto;
        height: 100% !important;
        position: absolute;
        top: -9999px;
        bottom: -9999px;
        left: -9999px;
        right: -9999px;
        margin: auto;
      }
    }
    .ant-image-img {
      aspect-ratio: 1/1;
    }
    img {
      aspect-ratio: 1/1;
    }
  }
`;

export const WidgetWrapper = styled.div`
  width: 41%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  column-gap: 15px;
  position: absolute;
  right: 0;
  top: 0;

  @media only screen and (max-width: 1439px) {
    height: max-content;
    width: max-content;
  }
  @media (max-width: 480px) {
    column-gap: 10px;
    position: unset;
  }
`;

export const EditProfileButton = styled(Button)`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 105px !important;
  height: 40px !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 14px;
  line-height: 16px;
`;

export const ShareButton = styled(Button)`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;
export const MenuButton = styled(Button)`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;

export const UploadProfilePhotoButton = styled(Upload)`
  position: absolute;
  right: 1.3%;
  top: 68.5%;
  border-radius: 100% !important;
  background: rgba(42, 133, 255, 1) !important;
  cursor: pointer;
  width: 24px !important;
  height: 24px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;

  .ant-upload {
    width: 24px !important;
    height: 24px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
`;

export const WalletAddressButton = styled(Button)`
  display: flex !important;
  column-gap: 5px !important;
  justify-content: center !important;
  align-items: center !important;
  min-width: 204px !important;
  max-width: 404px !important;
  height: 28px !important;
  background: rgba(252, 252, 253, 0.1) !important;
  border-radius: 20px !important;
  border: none !important;
  margin: 6px 0px !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 24px !important;
  color: var(--dropdown-arrow-color) !important;
`;
export const UserNameWrapper = styled.div`
  padding-top: 5px;
  display: flex;
  flex-flow: column;
  gap: 5px;
  .meta-profile-bio {
    width: 60%;
  }

  @media only screen and (max-width: 1439px) {
    padding-top: 0px;
    align-items: center;
    justify-content: center;

    .meta-profile-username-container {
      flex-flow: column;
      gap: 5px !important;
    }
    .meta-profile-bio {
      width: 60%;
      text-align: center;
    }
  }
  @media only screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .meta-profile-bio {
      width: 95%;
      text-align: center;
    }
  }
`;
export const UserName = styled.span`
  width: 100%;
  display: flex;
  font-weight: 600;
  font-size: 24px;
  //line-height: 10px;
  color: var(--heading-color) !important;
  text-transform: capitalize;

  @media (max-width: 413px) {
    justify-content: center;
  }
`;
export const ConnectionsWrapper = styled.div`
  width: 189px;
  display: flex;
  column-gap: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  justify-content: center;
`;
export const Followers = styled.span`
  width: 100%;
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  column-gap: 5px;
`;
export const Following = styled.span`
  width: 100%;
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  column-gap: 5px;
`;
export const Count = styled.span`
  color: var(--heading-color) !important;
`;
export const Hr = styled(Divider)`
  margin: 36px 0px !important;
  background: var(--border-color-split) !important;
  height: 1px;
`;

export const TabRow = styled.div`
  width: 100%;
  //max-width: 1120px;
  height: 100%;
  margin: 0px 0px 32px 0px;
`;

export const TabWrapper = styled.div`
  width: 100%;
  //max-width: 1120px;
  display: flex;

  @media (max-width: 1112px) {
    width: 100% !important;
  }
  @media (max-width: 768px) {
    width: 75%;
  }
  @media (max-width: 413px) {
    width: 100%;
  }
`;
export const Tab = styled(Tabs)`
  width: 100%;
  color: var(--text-color-secondary) !important;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

  .ant-tabs-tab {
    border: none !important;
    background: transparent !important;
  }

  .ant-tabs-nav {
    .ant-tabs-nav-list {
      border: none !important;
      border-radius: 36px !important;
      padding: 6px 0px !important;
      height: 44px !important;
    }
  }
  .ant-tabs-nav::before {
    border: none !important;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: var(--foreground) !important;
    }

    &.ant-tabs-tab {
      border: none !important;
      background: rgba(230, 232, 236, 1) !important;
      border-radius: 100px !important;
      padding: 6px 12px !important;
    }
  }
`;

export const FilterRow = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
  height: auto;
  margin: 0px 0px 22px 0px;

  .ant-form-item {
    margin-bottom: 0px !important;
  }
  .options-inner {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  @media only screen and (max-width: 1112px) {
    width: 100%;
    flex-wrap: wrap;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormItem = styled(Form.Item)`
  @media only screen and (max-width: 768px) {
    width: 100% !important;
  }
`;

export const SelectMenu = styled(Select)`
  background: transparent;
  border-radius: 100px !important;
  border: 1px solid var(--border-color-split);
  padding: 0 5px !important;
  height: 40px !important;
  line-height: 24px !important;
  display: flex !important;
  align-items: center !important;

  .ant-select-arrow {
    color: var(--dropdown-arrow-color) !important;
  }
  .ant-select-selection-item {
    font-weight: 600 !important;
    font-size: 14px !important;
  }

  .down-arrow {
    position: absolute !important;
    top: -7px;
    right: -7px;
  }

  @media only screen and (max-width: 768px) {
    width: 100% !important;
  }
`;

export const SearchBar = styled(Input)`
  width: 100% !important;
  height: 40px !important;
  max-width: 300px !important ;
  border: 1px solid var(--border-color-base) !important ;
  border-radius: 100px !important;

  @media only screen and (max-width: 768px) {
    width: 100% !important;
    max-width: 100% !important ;
  }
`;
export const Gallery = styled.section`
  width: 100%;
  //max-width: 1120px;
  //height: max-content;
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 30px;
  padding-bottom: 24px;
  //overflow-x: scroll;
  //overflow-y: hidden;
  overflow: hidden;
  place-items: center;

  @media only screen and (max-width: 1112px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    //overflow-x: scroll;
    //overflow-y: hidden;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
  }

  @media only screen and (max-width: 430px) {
    width: 100%;
    display: grid;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    //overflow: hidden;
    column-gap: 20px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const LoadMore = styled.div`
  width: 100%;
  //max-width: 972px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
`;

export const LoadMoreButton = styled(Button)`
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 14px !important;
  line-height: 16px;
  color: var(--heading-color) !important;
  width: 211px !important;
  height: 40px !important;
  padding: 12px 16px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 5px;
  border: 2px solid rgba(119, 126, 144, 1) !important;
`;
