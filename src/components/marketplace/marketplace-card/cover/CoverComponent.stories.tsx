import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import '../../../../../styles/globals.css';
import { CoverComponent, CoverComponentType } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const CoverComponentReact = (props: CoverComponentType) => (
  <>{CoverComponent(props.menuItems ?? [], props.startDate, props.endDate)}</>
);
export default {
  title: 'Cover/CoverComponent',
  component: CoverComponentReact,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CoverComponentReact>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CoverComponentReact> = (args) => (
  <CoverComponentReact {...args} />
);

export const cover = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
cover.args = {
  countDown: '01:52:09 left 🔥',
  startDate: new Date(2022, 0, 1, 12, 30, 20, 0),
  endDate: new Date(2021, 11, 16, 12, 30, 7, 999),
  menuItems: ['Option A', 'Option B', 'Option c'],
};
