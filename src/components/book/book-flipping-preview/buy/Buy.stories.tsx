import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BuyTab } from './index';

export default {
  title: 'book/preview/buy',
  component: BuyTab,
  argTypes: {},
} as ComponentMeta<typeof BuyTab>;

const Template: ComponentStory<typeof BuyTab> = () => <BuyTab />;

export const CreateBookTabStory = Template.bind({});
CreateBookTabStory.args = {};
