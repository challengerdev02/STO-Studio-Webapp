import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import { CharacterAdd } from './index';

export default {
  title: 'character/add-card',
  component: CharacterAdd,
  argTypes: {},
} as ComponentMeta<typeof CharacterAdd>;

const Template: ComponentStory<typeof CharacterAdd> = (args) => (
  <CharacterAdd {...args} />
);

export const CharacterAddStory = Template.bind({});
CharacterAddStory.args = {
  onCreateCharacter: () => {},
};
