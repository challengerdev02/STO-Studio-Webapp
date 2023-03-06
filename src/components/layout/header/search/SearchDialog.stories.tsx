import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SearchDialog } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/header/search',
  component: SearchDialog,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof SearchDialog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchDialog> = (args) => (
  <SearchDialog {...args} />
);

export const Dialog = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dialog.args = {
  onVisibilityChange: () => {},
  visibility: true,
  walletAddress:
    'https://drive.google.com/uc?id=1md_gbZTjd728iZoKmrYfdIyQvEhLZjaD',
};
