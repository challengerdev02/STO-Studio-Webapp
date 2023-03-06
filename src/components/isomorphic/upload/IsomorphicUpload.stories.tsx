import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IsomorphicUpload } from './index';

export default {
  title: 'isomorphic/upload',
  component: IsomorphicUpload,
} as ComponentMeta<typeof IsomorphicUpload>;

const Template: ComponentStory<typeof IsomorphicUpload> = () => (
  <IsomorphicUpload draggerProps={{}} />
);

export const UploadLinkCard = Template.bind({});
UploadLinkCard.args = {};
