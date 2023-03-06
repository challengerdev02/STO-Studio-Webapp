import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import Dialog, { DialogActions } from './index';

const DialogComponent = () => {
  const content = `Do you want to revise this scene or sell it?`;

  const actions: DialogActions = [
    [
      {
        key: 'sell',
        text: 'Sell',
        type: 'link',
        style: {
          fontWeight: 600,
        },
        onClick: () => {},
      },
      {
        key: 'revise',
        text: 'Revise',
        type: 'text',
        style: {
          fontWeight: 600,
          fontSize: '1em',
        },
        onClick: () => {},
      },
    ],
    {
      key: 'cancel',
      text: 'Cancel',
      type: 'text',
      onClick: () => {},
    },
  ];
  Dialog.show({ content, actions });

  return (
    <div>
      <h1>DialogComponent</h1>
    </div>
  );
};
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'DialogComponent/show',
  component: DialogComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    visible: {
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
} as ComponentMeta<typeof DialogComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DialogComponent> = () => (
  <DialogComponent />
);

export const Modal = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Modal.args = {
  label: 'DialogComponent',
};
