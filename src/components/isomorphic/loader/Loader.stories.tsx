import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import 'metacomicicons/fonts/metacomic.css';
import { MainLoader } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'isomorphic/loader',
  component: MainLoader,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof MainLoader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MainLoader> = (args) => (
  <MainLoader {...args} />
);

export const Loader = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Loader.args = {};
