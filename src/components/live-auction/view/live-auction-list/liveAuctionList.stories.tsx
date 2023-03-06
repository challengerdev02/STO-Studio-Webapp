import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LiveAuctionList } from './index';
import VerifiedAccountAvatar from '../../../../../public/verified-account-avatar.svg';

export default {
  title: 'live-auction/view/list',
  component: LiveAuctionList,
} as ComponentMeta<typeof LiveAuctionList>;

const Template: ComponentStory<typeof LiveAuctionList> = (args) => (
  <LiveAuctionList {...args} />
);

export const List = Template.bind({});
List.args = {
  data: [
    {
      cryptoValue: '7.00698',
      cryptoCurrency: 'ETH',
      user: '0x658d22456633334234iF0cC',
      date: '2021-11-17',

      userAvatar: VerifiedAccountAvatar,
    },
    {
      cryptoValue: '7.00698',
      cryptoCurrency: 'ETH',
      user: '0x658d22456633334234iF0cC',
      date: '2021-11-17',

      userAvatar: VerifiedAccountAvatar,
    },
  ],
};
