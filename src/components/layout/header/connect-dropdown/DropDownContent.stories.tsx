import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DropDownContent } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/header/dropDownContent',
  component: DropDownContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof DropDownContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DropDownContent> = (args) => (
  <DropDownContent {...args} />
);

export const Menu = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Menu.args = {
  logout: () => {},
};
