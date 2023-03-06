import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileScreen } from './index';
import LiveAuctionCardImage from '../../../../public/zachary-kadolph-unsplash.svg';
import MathewBall from '../../../../public/mathew-ball.svg';
import BrianMcGowan from '../../../../public/brian-mcgowan.svg';
import CoverImage from '../../../../public/profile-cover-photo.svg';

export default {
  title: 'account/profile',
  component: ProfileScreen,
} as ComponentMeta<typeof ProfileScreen>;

const Template: ComponentStory<typeof ProfileScreen> = (args) => (
  <ProfileScreen {...args} />
);

export const ProfileScreenComponent = Template.bind({});
ProfileScreenComponent.args = {
  onLoadMore: () => {},
  loadingState: true,
  showLoad: true,
  onFinish: () => {},
  uploadProps: {},
  uploadCoverProps: {},
  onEditProfile: () => {},
  handleChangeCoverPhoto: () => {},
  handleDeleteCoverPhoto: () => {},
  onResetForm: () => {},
  $record: {
    id: '000001',
    name: 'Emmanuel Iroko',
    createdAt: '2022',
    walletAddress: '0x658d22456633334234iF0cC',
    connections: {
      followers: '230',
      following: '84',
    },
    auctions: [
      {
        itemCoverImage: LiveAuctionCardImage,
        itemName: 'Crypto Bull Society',
        bestOffer: '0.51',
        lastOffer: '0.42',
        likes: '1.7 k',
      },
      {
        itemCoverImage: BrianMcGowan,
        itemName: 'Crypto Bull Society',
        bestOffer: '0.51',
        lastOffer: '0.42',
        likes: '1.7 k',
      },
      {
        itemCoverImage: MathewBall,
        itemName: 'Crypto Bull Society',
        bestOffer: '0.51',
        lastOffer: '0.42',
        likes: '1.7 k',
      },
      {
        itemCoverImage: BrianMcGowan,
        itemName: 'Crypto Bull Society',
        bestOffer: '0.51',
        lastOffer: '0.42',
        likes: '1.7 k',
      },
      {
        itemCoverImage: MathewBall,
        itemName: 'Crypto Bull Society',
        bestOffer: '0.51',
        lastOffer: '0.42',
        likes: '1.7 k',
      },
      {
        itemCoverImage: LiveAuctionCardImage,
        itemName: 'Crypto Bull Society',
        bestOffer: '0.51',
        lastOffer: '0.42',
        likes: '1.7 k',
      },
      {
        itemCoverImage: MathewBall,
        itemName: 'Crypto Bull Society',
        bestOffer: '0.51',
        lastOffer: '0.42',
        likes: '1.7 k',
      },
    ],
    coverImg: CoverImage,
    profileImage: null,
    uploadStates: {
      banner: false,
      avatar: false,
    },
    loadings: {
      banner: false,
      avatar: false,
    },
  },
};
