import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import 'metacomicicons/fonts/metacomic.css';
import { BuyNow } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'assets/sale-scheduling/buy-now',
  component: BuyNow,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof BuyNow>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
//@ts-ignore
const Template: ComponentStory<typeof BuyNow> = () => <BuyNow />;

export const Form = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
