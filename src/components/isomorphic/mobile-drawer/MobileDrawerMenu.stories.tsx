import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MobileDrawerMenu } from './index';

export default {
  title: 'MobileDrawerMenuComponent',
  component: MobileDrawerMenu,
  argTypes: {},
} as ComponentMeta<typeof MobileDrawerMenu>;

let visible = true;
const Template: ComponentStory<typeof MobileDrawerMenu> = () => (
  <MobileDrawerMenu
    onClose={() => console.log('another black')}
    visible={visible}
  />
);

export const MobileMenuDrawer = Template.bind({});
MobileMenuDrawer.args = {};
