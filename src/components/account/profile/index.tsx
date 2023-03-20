import React from 'react';
import {
  Avatar,
  Button,
  Form,
  Image,
  Space,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import Text from 'antd/lib/typography/Text';
import format from 'date-fns/format';
import { ImageOverlay } from '../edit/profile';
import {
  ConnectionsWrapper,
  Count,
  CoverPhoto,
  CoverPhotoActionButton,
  CoverPhotoActionsWrapper,
  CoverPhotoWrapper,
  Details,
  Followers,
  Following,
  Hr,
  ProfileOverview,
  ProfileSection,
  UserName,
  UserNameWrapper,
  WalletAddressButton,
  WidgetWrapper,
  Wrapper,
} from './index.styled';
import {
  copyToClipboard,
  onBeforeImageUpload,
  truncateEthAddress,
} from '@/shared/utils';
import { get, toLower } from 'lodash';
import { GradientAvatar } from '@/shared/gradient-avatar';
import { ImagePlaceholder } from '../../account/edit/profile/index.styled';
import { ShareProfile } from '../../account/profile/share-profile';
import {
  InstagramFilled,
  RedditCircleFilled,
  SettingFilled,
  TwitterCircleFilled,
} from '@ant-design/icons';
import { ProfileTabs } from '../../account/profile/tab-rows';
import { isMobile } from 'react-device-detect';
import ImgCrop from 'antd-img-crop';

const { Paragraph } = Typography;

export interface ProfileScreenProps {
  onLoadMore: (action: Record<string, any>) => void;
  loadingState: Record<string, any>;
  showLoad: Record<string, any>;
  onFinish: (values: any) => void;
  uploadProps: Record<string, any>;
  uploadCoverProps: Record<string, any>;
  onEditProfile: (values: any) => void;
  handleChangeCoverPhoto: (values: any) => void;
  handleDeleteCoverPhoto: (values: any) => void;
  onResetForm: () => void;
  onTipUser: () => void;
  onFollowUser: (following: boolean) => void;
  onSearch: (values: any) => void;
  $record: Record<string, any>;
  isUserLoggedIn: boolean;
  followingUser: boolean;
  signedAddress?: string;
  accountAddress?: string;
}

export const ProfileScreen = (props: ProfileScreenProps) => {
  const [form] = Form.useForm();
  const {
    onLoadMore,
    showLoad,
    loadingState,
    onFinish,
    onEditProfile,
    handleChangeCoverPhoto,
    handleDeleteCoverPhoto,
    onResetForm,
    onSearch,
    onTipUser,
    onFollowUser,
    $record,
    uploadProps,
    uploadCoverProps,
    isUserLoggedIn,
    signedAddress,
    accountAddress,
    followingUser,
  } = props;
  // alert(JSON.stringify({ signedAddress, accountAddress }));
  return (
    <Wrapper data-testid="profile-screen-wrapper">
      <CoverPhotoWrapper>
        {isUserLoggedIn && (
          <Upload {...uploadCoverProps}>
            <ImageOverlay
              width={'100%'}
              height={'100%'}
              style={{
                pointerEvents:
                  accountAddress != null && signedAddress !== accountAddress
                    ? 'none'
                    : 'unset',
              }}
            >
              <i className="mc-pencil-fill" style={{ fontSize: '1.5em' }} />
            </ImageOverlay>
          </Upload>
        )}

        {$record?.coverImg ? (
          <CoverPhoto
            style={{
              transition: '2s',
              opacity:
                $record?.uploadStates?.banner ||
                $record?.loadings?.bannerLoading
                  ? 0.2
                  : 1,
            }}
            data-testid="cover-photo"
            alt=""
            src={$record?.coverImg}
          />
        ) : (
          <ImagePlaceholder size={'100%'}>
            <div className="meta-image-placeholder-box" />
          </ImagePlaceholder>
        )}

        {isUserLoggedIn &&
          (accountAddress != null
            ? signedAddress === accountAddress
            : true) && (
            <CoverPhotoActionsWrapper>
              <Upload {...uploadCoverProps}>
                <CoverPhotoActionButton
                  data-testid="change-cover-image"
                  shape="circle"
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.1129 3.17303C13.0893 2.19672 14.6722 2.19672 15.6485 3.17303L16.827 4.35154C17.8033 5.32785 17.8033 6.91076 16.827 7.88707L8.16657 16.5475C8.05023 16.6638 7.90207 16.7431 7.74074 16.7754L3.32132 17.6593C2.73822 17.7759 2.22412 17.2618 2.34074 16.6787L3.22463 12.2593C3.25689 12.098 3.33619 11.9498 3.45252 11.8335L12.1129 3.17303ZM14.47 4.35154L15.6485 5.53005C15.9739 5.85549 15.9739 6.38313 15.6485 6.70856L14.47 7.88708L12.1129 5.53005L13.2915 4.35154C13.6169 4.0261 14.1445 4.0261 14.47 4.35154ZM10.9344 6.70857L4.80944 12.8336L4.22019 15.7798L7.16647 15.1906L13.2915 9.06559L10.9344 6.70857Z"
                        fill="#6F767E"
                      />
                    </svg>
                  }
                  size="small"
                  onClick={handleChangeCoverPhoto}
                />
              </Upload>
              <CoverPhotoActionButton
                data-testid="delete-cover-image"
                shape="circle"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.33333 8.33331C8.79357 8.33331 9.16667 8.70641 9.16667 9.16665V13.3333C9.16667 13.7936 8.79357 14.1666 8.33333 14.1666C7.8731 14.1666 7.5 13.7936 7.5 13.3333V9.16665C7.5 8.70641 7.8731 8.33331 8.33333 8.33331Z"
                      fill="#6F767E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.6667 8.33331C12.1269 8.33331 12.5 8.70641 12.5 9.16665V13.3333C12.5 13.7936 12.1269 14.1666 11.6667 14.1666C11.2065 14.1666 10.8334 13.7936 10.8334 13.3333V9.16665C10.8334 8.70641 11.2065 8.33331 11.6667 8.33331Z"
                      fill="#6F767E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.33329 1.66663C6.95258 1.66663 5.83329 2.78591 5.83329 4.16663H3.33329H2.49996C2.03972 4.16663 1.66663 4.53972 1.66663 4.99996C1.66663 5.4602 2.03972 5.83329 2.49996 5.83329H3.33329V15.8333C3.33329 17.214 4.45258 18.3333 5.83329 18.3333H14.1666C15.5473 18.3333 16.6666 17.214 16.6666 15.8333V5.83329H17.5C17.9602 5.83329 18.3333 5.4602 18.3333 4.99996C18.3333 4.53972 17.9602 4.16663 17.5 4.16663H16.6666H14.1666C14.1666 2.78591 13.0473 1.66663 11.6666 1.66663H8.33329ZM12.5 4.16663C12.5 3.70639 12.1269 3.33329 11.6666 3.33329H8.33329C7.87306 3.33329 7.49996 3.70639 7.49996 4.16663H12.5ZM5.83329 5.83329H4.99996V15.8333C4.99996 16.2935 5.37306 16.6666 5.83329 16.6666H14.1666C14.6269 16.6666 15 16.2935 15 15.8333V5.83329H14.1666H5.83329Z"
                      fill="#6F767E"
                    />
                  </svg>
                }
                size="small"
                onClick={handleDeleteCoverPhoto}
              />
            </CoverPhotoActionsWrapper>
          )}
      </CoverPhotoWrapper>
      <div
        className="w-100 h-100 meta-flex meta-flex-j-c"
        style={{ padding: 24 }}
      >
        <ProfileOverview>
          <ProfileSection direction={isMobile ? 'vertical' : undefined}>
            <Details>
              {isUserLoggedIn ? (
                <div className="avatar-wrapper">
                  <ImgCrop
                    quality={1}
                    // aspect={1 / 1}
                    grid
                    rotate
                    minZoom={1}
                    maxZoom={3}
                    modalTitle={'Crop'}
                    modalWidth={'50vw'}
                    cropperProps={{
                      cropSize: {
                        width: 500,
                        height: 500,
                      },
                    }}
                    beforeCrop={(file) => onBeforeImageUpload(file, 10240)}
                  >
                    <Upload
                      style={{ borderRadius: '50%' }}
                      className={'user-avatar-uploader'}
                      data-testid="photo-uploader"
                      {...uploadProps}
                    >
                      {$record?.profileImage ? (
                        <Image
                          alt="profile image"
                          src={$record?.profileImage}
                          data-testid="user-avatar"
                          className="user-avatar-container"
                          preview={false}
                          style={{
                            borderRadius: '50%',
                            transition: '2s',
                            opacity:
                              $record?.uploadStates?.avatar ||
                              $record?.loadings?.avatarLoading
                                ? 0.2
                                : 1,
                          }}
                        />
                      ) : (
                        <Avatar
                          style={{
                            transition: '2s',
                            opacity:
                              $record?.uploadStates?.avatar ||
                              $record?.loadings?.avatarLoading
                                ? 0.2
                                : 1,
                          }}
                          data-testid="user-avatar"
                          size={80}
                          icon={
                            <GradientAvatar
                              size={80}
                              value={get($record, 'walletAddress', 'Metacomic')}
                            />
                          }
                        />
                      )}

                      <ImageOverlay
                        width={'100%'}
                        height={'80px'}
                        shape={'circle'}
                      >
                        <i
                          className="mc-pencil-fill"
                          style={{ fontSize: '1.5em' }}
                        />
                      </ImageOverlay>
                    </Upload>
                  </ImgCrop>
                </div>
              ) : (
                <div className="avatar-wrapper">
                  {$record?.profileImage ? (
                    <Image
                      alt="profile image"
                      src={$record?.profileImage}
                      data-testid="user-avatar"
                      preview={false}
                      className="user-avatar-container"
                      style={{
                        borderRadius: '50%',
                        transition: '2s',
                        opacity:
                          $record?.uploadStates?.avatar ||
                          $record?.loadings?.avatarLoading
                            ? 0.2
                            : 1,
                      }}
                    />
                  ) : (
                    <Avatar
                      style={{
                        transition: '2s',
                        opacity:
                          $record?.uploadStates?.avatar ||
                          $record?.loadings?.avatarLoading
                            ? 0.2
                            : 1,
                      }}
                      data-testid="user-avatar"
                      size={80}
                      icon={
                        <GradientAvatar
                          size={80}
                          value={get($record, 'walletAddress', 'Metacomics')}
                        />
                      }
                    />
                  )}
                </div>
              )}

              <UserNameWrapper>
                <Space
                  align={'center'}
                  size={50}
                  className={'meta-flex meta-profile-username-container'}
                >
                  <UserName data-testid="username">{$record?.name}</UserName>
                  <ConnectionsWrapper style={isMobile ? { width: '100%' } : {}}>
                    <Followers>
                      <Space align={'center'} size={2}>
                        <Count data-testid="followers">
                          {$record?.airdropPoints?.total}
                        </Count>{' '}
                        <span>Points</span>
                      </Space>
                    </Followers>
                    <Followers>
                      <Space align={'center'} size={2}>
                        <Count data-testid="followers">
                          {$record?.followers}
                        </Count>{' '}
                        <span>Followers</span>
                      </Space>
                    </Followers>
                    <Following>
                      <Count data-testid="following">
                        {$record?.followings ?? 0}
                      </Count>{' '}
                      Following
                    </Following>
                  </ConnectionsWrapper>
                </Space>
                <Space
                  align={isMobile ? 'center' : 'start'}
                  className={'w-100'}
                  style={{ justifyContent: isMobile ? 'center' : 'start' }}
                  wrap
                >
                  <Tooltip title="Wallet Address">
                    <WalletAddressButton
                      data-testid="wallet-address"
                      onClick={() => {
                        copyToClipboard($record?.walletAddress);
                      }}
                    >
                      {truncateEthAddress(`${$record?.walletAddress}`)}

                      <img src={'/assets/link.svg'} />
                    </WalletAddressButton>
                  </Tooltip>
                  {isUserLoggedIn && (
                    <Tooltip title="Invite people with this link. Click to copy it.">
                      <WalletAddressButton
                        data-testid="wallet-address"
                        onClick={() => {
                          copyToClipboard(
                            `https://${window?.location?.host}?u=${$record?.walletAddress}`
                          );
                        }}
                      >
                        {`Referral Link: https://meta...?u=${truncateEthAddress(
                          $record?.walletAddress
                        )}`}
                        <img src={'/assets/link.svg'} />
                      </WalletAddressButton>
                    </Tooltip>
                  )}
                  {/*{$record?.inviteCode && (*/}
                  {/*  <WalletAddressButton*/}
                  {/*    data-testid="wallet-address"*/}
                  {/*    onClick={() => {*/}
                  {/*      copyToClipboard($record?.inviteCode);*/}
                  {/*    }}*/}
                  {/*  >*/}
                  {/*    Creator Code: {`${$record?.inviteCode}`}*/}
                  {/*    <img src={'/assets/link.svg'} />*/}
                  {/*  </WalletAddressButton>*/}
                  {/*)}*/}
                </Space>
                {$record?.bio && (
                  <div className={'meta-profile-bio'}>
                    <Paragraph
                      ellipsis={{
                        rows: 4,
                        expandable: false,
                        symbol: '...',
                      }}
                      strong
                      style={{ color: 'var(--text-color-secondary)' }}
                    >
                      {get($record, 'bio')}
                    </Paragraph>
                  </div>
                )}

                <Space size={30}>
                  {$record?.createdAt && (
                    <Text strong>
                      Joined{' '}
                      {format(
                        new Date(Date.parse($record?.createdAt)),
                        'MMMM yyyy'
                      )}
                    </Text>
                  )}
                </Space>
              </UserNameWrapper>
            </Details>
            <Space direction={'vertical'} size={50}>
              <WidgetWrapper>
                {toLower(signedAddress) !== toLower($record.walletAddress) && (
                  <Button
                    type={$record.isFollowingUser ? 'default' : 'primary'}
                    shape="round"
                    onClick={() => onFollowUser(!$record.isFollowingUser)}
                    size={'small'}
                    data-testid="series-widget"
                    disabled={
                      toLower(signedAddress) == toLower($record.walletAddress)
                    }
                    loading={followingUser}
                  >
                    {$record.isFollowingUser ? 'Unfollow' : 'Follow'}
                  </Button>
                )}
                <Tooltip
                  placement={'bottom'}
                  title="Give a tip to support this artiste"
                >
                  <Button
                    type="default"
                    shape="round"
                    onClick={onTipUser}
                    size={'small'}
                    data-testid="series-widget"
                    disabled={
                      toLower(signedAddress) === toLower($record.walletAddress)
                    }
                  >
                    Tip
                  </Button>
                </Tooltip>
                {isUserLoggedIn && (
                  <Tooltip title="Settings">
                    <Button
                      type="default"
                      shape="circle"
                      onClick={onEditProfile}
                      icon={<SettingFilled />}
                      size={'small'}
                      data-testid="settings-widget"
                    />
                  </Tooltip>
                )}

                <ShareProfile
                  username={$record?.username ?? $record?.walletAddress}
                  address={$record?.walletAddress}
                />
              </WidgetWrapper>
              <div>
                {!!$record.socials?.twitter && (
                  <Button
                    style={{
                      fontSize: '1.5rem',
                      padding: '5px',
                      color: '#fff',
                      border: 0,
                    }}
                    type={'ghost'}
                    href={`https://twitter.com/${$record?.socials?.twitter}`}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <TwitterCircleFilled />
                  </Button>
                )}
                {!!$record.socials?.reddit && (
                  <Button
                    style={{
                      fontSize: '1.5rem',
                      padding: '5px',
                      color: '#fff',
                      border: 0,
                    }}
                    type={'ghost'}
                    href={`https://www.reddit.com/user/${$record?.socials?.reddit}`}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <RedditCircleFilled />
                  </Button>
                )}

                {!!$record.patreon && (
                  <Button
                    style={{
                      fontSize: '1.5rem',
                      textAlign: 'center',
                      color: '#fff',
                      border: 0,
                    }}
                    type={'ghost'}
                    href={`https://www.patreon.com/${$record?.patreon}`}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <img
                      style={{
                        fontSize: '1.5rem',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 5,
                        margin: 0,
                        width: '24px',
                        height: '24px',
                        marginTop: -7,
                      }}
                      src={'/images/patreon.png'}
                    />
                  </Button>
                )}

                {!!$record.socials?.instagram && (
                  <Button
                    style={{
                      fontSize: '1.5rem',
                      padding: '5px',
                      color: '#fff',
                      border: 0,
                    }}
                    type={'ghost'}
                    href={`https://www.instagram.com/${$record?.socials?.instagram}`}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <InstagramFilled />
                  </Button>
                )}
              </div>
            </Space>
          </ProfileSection>
          <Hr />
          <ProfileTabs
            form={form}
            onFinish={onFinish}
            onFilterReset={onResetForm}
            onFilterSearch={onSearch}
            $record={$record}
            onLoadMore={onLoadMore}
            loading={loadingState}
            showLoad={showLoad}
          />
        </ProfileOverview>
      </div>
    </Wrapper>
  );
};
