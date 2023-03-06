import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LiveAuctionCard } from './index';
import LiveAuctionCardImage from '../../../../public/zachary-kadolph-unsplash.svg';

export default {
  title: 'live-auction/card',
  component: LiveAuctionCard,
} as ComponentMeta<typeof LiveAuctionCard>;

const Template: ComponentStory<typeof LiveAuctionCard> = (args) => (
  <LiveAuctionCard {...args} />
);

export const AuctionCard = Template.bind({});
AuctionCard.args = {
  itemCoverImage: LiveAuctionCardImage,
  itemName: 'Crypto Bull Society',
  bestOffer: '0.51',
  lastOffer: '0.42',
  likes: '1.7 k',
  onClick: () => {},
};
