import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BidCard } from './index';
import VerifiedAccountAvatar from '../../../../public/verified-account-avatar.svg';

export default {
  title: 'assets/bid-card',
  component: BidCard,
} as ComponentMeta<typeof BidCard>;

const Template: ComponentStory<typeof BidCard> = (args) => (
  <BidCard {...args} />
);

export const Card = Template.bind({});
Card.args = {
  user: '0x658d22456633334234iF0cC',
  cryptoValue: '1.46 ETH',
  priceEquivalent: '$2,764.89',
  startDate: new Date(2022, 0, 1, 12, 30, 20, 0),
  endDate: new Date(2021, 11, 16, 12, 30, 7, 999),
  userAvatar: VerifiedAccountAvatar,
};
