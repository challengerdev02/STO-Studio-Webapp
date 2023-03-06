import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import { SceneAdd } from './index';

export default {
  title: 'scene/add-card',
  component: SceneAdd,
  argTypes: {},
} as ComponentMeta<typeof SceneAdd>;

const Template: ComponentStory<typeof SceneAdd> = (args) => (
  <SceneAdd {...args} />
);

export const AddScene = Template.bind({});
AddScene.args = {
  onCreateScene: (value?: any) => {
    //console.log(value);
  },
};
