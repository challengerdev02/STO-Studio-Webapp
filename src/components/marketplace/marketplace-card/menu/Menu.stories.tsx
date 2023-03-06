import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import '../../../../../styles/globals.css';
import { DropDownMenu } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Menu/DropDownMenu',
  component: DropDownMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof DropDownMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DropDownMenu> = (args) => (
  <DropDownMenu {...args} />
);

export const DropDown = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DropDown.args = {
  menuItems: ['Option A', 'Option B', 'Option c'],
};
