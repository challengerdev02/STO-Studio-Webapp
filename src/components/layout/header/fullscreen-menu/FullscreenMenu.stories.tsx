import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FullscreenMenu } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/header/fullscreenMenu',
  component: FullscreenMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FullscreenMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FullscreenMenu> = (args) => (
  <FullscreenMenu {...args} />
);

export const Menu = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Menu.args = {
  visibility: true,
  onVisibilityChange: () => {},
};
