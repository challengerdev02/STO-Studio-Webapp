import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LiveAuctionInfo } from './index';

export default {
  title: 'live-auction/view/info',
  component: LiveAuctionInfo,
} as ComponentMeta<typeof LiveAuctionInfo>;

const Template: ComponentStory<typeof LiveAuctionInfo> = (args) => (
  <LiveAuctionInfo {...args} />
);

export const AuctionInfo = Template.bind({});
AuctionInfo.args = {
  title: 'Amethyst: Princess of Gemworld',
  auctioneer: 'macauley',
  itemDescription: ` Amaya, princess of House Amethyst in Gemworld, and her brother love
    magical pranks. But when one goes much too far, her parents ground the
    young royal. Amaya, princess of House Amethyst in Gemworld, and her
    brother love magical pranks.`,
};
