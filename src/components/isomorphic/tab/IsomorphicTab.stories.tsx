import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IsomorphicTab } from './index';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default {
  title: 'isomorphic/tab',
  component: IsomorphicTab,
} as ComponentMeta<typeof IsomorphicTab>;

const Template: ComponentStory<typeof IsomorphicTab> = (args) => (
  <IsomorphicTab {...args}>
    <TabPane tab="Info" key="1" />
    <TabPane tab="Buy" key="2" />
    <TabPane tab="Sell" key="3" />
  </IsomorphicTab>
);

export const Tab = Template.bind({});
Tab.args = {
  border: '2px solid !important',
  height: '55px !important',
  padding: '6px !important',
  maxWidth: '485px',
};
