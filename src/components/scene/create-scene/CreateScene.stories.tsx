import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CreateScene } from './index';
import { Form } from 'antd';

export default {
  title: 'scene/create-scene',
  component: CreateScene,
  argTypes: {},
} as ComponentMeta<typeof CreateScene>;

const Template: ComponentStory<typeof CreateScene> = (args) => {
  const [form] = Form.useForm();

  return <CreateScene {...args} form={form} />;
};

export const CreateNewScene = Template.bind({});
CreateNewScene.args = {
  loading: false,
  onSubmit: () => {},
  goBack: () => {},
  onAttributeModalVisibilityChange: () => {},
  draggerProps: {},
  uploadedFile: () => {},
  title: 'Create Scene',
  assetDomain: 'create',
  allArtists: [],
  attributes: [{}],
};
