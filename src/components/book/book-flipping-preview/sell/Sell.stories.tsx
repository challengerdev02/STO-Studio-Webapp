import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SellTab } from './index';

export default {
  title: 'book/preview/sell',
  component: SellTab,
  argTypes: {},
} as ComponentMeta<typeof SellTab>;

const Template: ComponentStory<typeof SellTab> = () => <SellTab />;

export const CreateBookTabStory = Template.bind({});
CreateBookTabStory.args = {};
