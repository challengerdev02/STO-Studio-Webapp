import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LiveAuctionCard } from './index';
import DummyImage from '../../../../../public/live-auction-card-cover.svg';

export default {
  title: 'live-auction/view/card',
  component: LiveAuctionCard,
} as ComponentMeta<typeof LiveAuctionCard>;

const Template: ComponentStory<typeof LiveAuctionCard> = (args) => (
  <LiveAuctionCard {...args} />
);

export const LiveAuctionCardComponent = Template.bind({});
LiveAuctionCardComponent.args = {
  GENRE_OPTIONS: 'Science Fiction',
  language: 'Japanese',
  ageRating: '13 and above',
  characters: ['Spiderman', 'Magnito'],
  imageSrc: DummyImage,
};
