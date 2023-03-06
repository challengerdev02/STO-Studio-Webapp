import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import '../../../../../styles/globals.css';
import { CustomStyledText } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Typography/CustomStyledText',
  component: CustomStyledText,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CustomStyledText>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomStyledText> = (args) => (
  <CustomStyledText {...args}>Hello team</CustomStyledText>
);

export const CustomStyled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
