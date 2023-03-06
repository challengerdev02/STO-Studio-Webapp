import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import '../../../../../styles/globals.css';
import { CustomStyledImage } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Image/CustomStyledImages',
  component: CustomStyledImage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CustomStyledImage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomStyledImage> = (args) => (
  <CustomStyledImage {...args} />
);

export const CustomStyled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CustomStyled.args = {
  src: 'https://robohash.org/a8cd9c187bb33c8a8f6e2774d71308fb?set=set4&bgset=&size=400x400',
  width: '50px',
  height: '50px',
};
