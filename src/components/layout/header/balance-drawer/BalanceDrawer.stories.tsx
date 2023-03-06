import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BalanceDrawer } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/header/BalanceDrawer',
  component: BalanceDrawer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof BalanceDrawer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BalanceDrawer> = (args) => (
  <BalanceDrawer {...args} />
);

export const Drawer = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Drawer.args = {
  onDisconnectWallet: () => {},
  onVisibilityChange: () => {},
  visibility: true,
  balance: 'xxxxxx',
  address: 'yyyyyyyy',
};
