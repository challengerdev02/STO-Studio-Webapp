import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LayoutHeader } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/header',
  component: LayoutHeader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof LayoutHeader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LayoutHeader> = (args) => (
  <LayoutHeader {...args} />
);

export const Header = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Header.args = {
  mdLogo: 'https://drive.google.com/uc?id=1xCWXBYJDvnia6oHIEpGg9ZWrCMG6Zvxk',
  smLogo: 'https://drive.google.com/uc?id=1md_gbZTjd728iZoKmrYfdIyQvEhLZjaD',
};
