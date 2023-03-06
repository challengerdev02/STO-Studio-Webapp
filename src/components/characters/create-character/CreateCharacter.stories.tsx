import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CreateCharacter } from './index';

export default {
  title: 'character/create-character',
  component: CreateCharacter,
  argTypes: {},
} as ComponentMeta<typeof CreateCharacter>;

const Template: ComponentStory<typeof CreateCharacter> = () => (
  <CreateCharacter
    onSubmit={() => {}}
    goBack={() => {}}
    attributes={[{}]}
    loading={false}
    allArtists={[]}
    title={'Create Character'}
    assetDomain={'create'}
    onAttributeModalVisibilityChange={() => {}}
    draggerProps={{}}
    uploadedFile={{}}
    form={{} as any}
  />
);

export const CreateCharacterStory = Template.bind({});
CreateCharacterStory.args = {
  onSubmit: () => {},
  attributes: [],
  loading: false,
  allArtists: [],
};
