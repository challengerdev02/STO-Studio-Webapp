import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import LiveAuction from './index';
import VerifiedAccountAvatar from '../../../../public/verified-account-avatar.svg';
import UserAvatar from '../../../../public/verified-account-avatar.svg';
import DummyImage from '../../../../public/live-auction-card-cover.svg';

export default {
  title: 'live-auction/view',
  component: LiveAuction,
} as ComponentMeta<typeof LiveAuction>;

const Template: ComponentStory<typeof LiveAuction> = (args) => {
  return <LiveAuction {...args} />;
};

const mockData = [
  {
    cryptoValue: '7.00698',
    cryptoCurrency: 'ETH',
    user: '0x658d22456633334234iF0cC',
    date: '2016, 0, 1',
    userAvatar: VerifiedAccountAvatar,
  },
  {
    cryptoValue: '7.00698',
    cryptoCurrency: 'ETH',
    user: '0x658d22456633334234iF0cC',
    date: '2016, 0, 1',
    userAvatar: VerifiedAccountAvatar,
  },
];

export const Wrapper = Template.bind({});
Wrapper.args = {
  GENRE_OPTIONS: 'Science Fiction',
  language: 'Japanese',
  ageRating: '13 and above',
  characters: ['Spiderman', 'Magnito'],
  imageSrc: DummyImage,
  title: 'Amethyst: Princess of Gemworld',
  auctioneer: 'macauley',
  itemDescription: ` Amaya, princess of House Amethyst in Gemworld, and her brother love
magical pranks. But when one goes much too far, her parents ground the
young royal. Amaya, princess of House Amethyst in Gemworld, and her
brother love magical pranks.`,
  user: '0x658d22456633334234iF0cC',
  cryptoValue: '1.46 ETH',
  priceEquivalent: '$2,764.89',
  startDate: new Date(2022, 0, 1, 12, 30, 20, 0),
  endDate: new Date(2021, 11, 16, 12, 30, 7, 999),
  userAvatar: UserAvatar,
  data: mockData,
};
