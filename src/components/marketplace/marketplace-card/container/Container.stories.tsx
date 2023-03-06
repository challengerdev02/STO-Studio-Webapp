import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import '../../../../../styles/globals.css';
import { CustomStyledBox } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Container/CustomStyledBox',
  component: CustomStyledBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CustomStyledBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomStyledBox> = (args) => (
  <CustomStyledBox {...args}>A</CustomStyledBox>
);

export const CustomStyled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CustomStyled.args = {
  width: '50px',
  height: '50px',
};
