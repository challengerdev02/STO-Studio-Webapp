import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import { AddFund } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'layout/add-fund',
  component: AddFund,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    visibility: {
      control: {
        type: 'boolean',
        defaultValue: true,
      },
    },
    title: {
      control: {
        type: 'text',
        defaultValue: 'Isomorphic modal',
      },
    },
    onCancel: {
      action: 'Closed',
    },
  },
} as ComponentMeta<typeof AddFund>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddFund> = (args) => (
  <AddFund {...args} />
);

export const Modal = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Modal.args = {
  visibility: true,
  address: 'This is a test title',
  onVisibilityChange: () => {},
};
