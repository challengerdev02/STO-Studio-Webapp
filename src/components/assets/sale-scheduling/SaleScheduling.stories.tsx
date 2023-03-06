import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import 'metacomicicons/fonts/metacomic.css';
import { SaleScheduling } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'assets/sale-scheduling',
  component: SaleScheduling,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onFormTypeChange: {
      action: 'onFormTypeChange',
    },
  },
} as ComponentMeta<typeof SaleScheduling>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SaleScheduling> = (args) => (
  <SaleScheduling {...args} />
);

export const Form = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Form.args = {
  loading: true,
  selectedForm: 'buy-now',
  title: "{'spider man'}",
  onFormTypeChange: (str) => {
    //console.log(str);
  },
};
