import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import { IsomorphicDrawer } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'isomorphic/Drawer',
  component: IsomorphicDrawer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    visible: {
      control: {
        type: 'boolean',
        defaultValue: true,
      },
    },
    onClose: {
      action: 'Closed',
    },
  },
} as ComponentMeta<typeof IsomorphicDrawer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IsomorphicDrawer> = (args) => (
  <IsomorphicDrawer {...args}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci
    aspernatur commodi consequuntur, molestiae perspiciatis quidem voluptatibus?
    Accusantium ducimus eaque itaque. Ad animi eius in, ipsa molestiae quaerat
    qui quis.
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </IsomorphicDrawer>
);

export const Drawer = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Drawer.args = {
  visible: true,
};
