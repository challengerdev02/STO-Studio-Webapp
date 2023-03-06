import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import '../../../../styles/globals.css';
import { MarketplaceCard } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'marketplace/card',
  component: MarketplaceCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    cardData: {
      control: {
        type: 'object',
        defaultValue: {
          name: 'Main Hero Buzi #282',
        },
      },
    },
    style: {
      control: {
        type: 'object',
        defaultValue: {
          width: '200px',
        },
      },
    },
  },
} as ComponentMeta<typeof MarketplaceCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MarketplaceCard> = (args) => (
  <MarketplaceCard {...args} />
);

export const Card = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Card.args = {
  coverInfo: {
    countDown: '01:52:09 left 🔥',
    startDate: new Date(2022, 0, 1, 12, 30, 20, 0),
    endDate: new Date(2021, 11, 16, 12, 30, 7, 999),
    coverImg:
      'https://robohash.org/a8cd9c187bb33c8a8f6e2774d71308fb?set=set4&bgset=&size=400x400',
    menuItems: ['Option A', 'Option B', 'Option c'],
  },
  cardData: {
    title: 'SuperR Hero Buzi #282',
    iconURL:
      'https://robohash.org/0f0383b8d198fb15c0ab7fc729a73028?set=set4&bgset=&size=400x400',
    itemPrice: '0.01 ETH',
    rates: '1/1',
    count: '17k',
    inWishlist: false,
    urlList: [
      'https://robohash.org/962440efdb9e25e8ff4360a7037acfb4?set=set4&bgset=&size=400x400',
      'https://robohash.org/887f430666b7d04d90b82a4b988df961?set=set4&bgset=&size=400x400',
      'https://robohash.org/15b76d2ec3afc53e3af6c4a316090c94?set=set4&bgset=&size=400x400',
    ],
  },
  style: {
    width: '256px',
  },
  hoverable: true,
};
