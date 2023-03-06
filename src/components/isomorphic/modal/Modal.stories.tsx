import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import { IsomorphicModal } from './index';
import { Button } from 'antd';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'isomorphic/modal',
  component: IsomorphicModal,
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
} as ComponentMeta<typeof IsomorphicModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IsomorphicModal> = (args) => (
  <IsomorphicModal
    {...args}
    footer={
      <div className="meta-flex meta-flex-center w-100-vh">
        <Button type={'primary'} shape={'round'}>
          This is a button
        </Button>
      </div>
    }
  >
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci
    aspernatur commodi consequuntur, molestiae perspiciatis quidem voluptatibus?
    Accusantium ducimus eaque itaque. Ad animi eius in, ipsa molestiae quaerat
    qui quis.
  </IsomorphicModal>
);

export const Modal = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Modal.args = {
  label: 'IsomorphicModal',
};
