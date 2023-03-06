import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CharacterCard } from './index';
import Img from '../../../../public/sellScene.png';

export default {
  title: 'character/card',
  component: CharacterCard,
  argTypes: {
    description: 'Description',
    attributes: 'Attributes',
    artists: 'Spider man',
  },
} as unknown as ComponentMeta<typeof CharacterCard>;

const Template: ComponentStory<typeof CharacterCard> = (args) => (
  <CharacterCard {...args} />
);

export const CharacterCardStory = Template.bind({});
CharacterCardStory.args = {
  title: ' Time: Midnight, Location: Manhattan',
  artists: 'Spider Man, Magnito...',
  description:
    "It is a long established fact that a reader will be distracted in due season for the likes of himself aren't here.",
  // @ts-ignore
  label: 'CharacterCardComponent',
  img: Img,
  onRevise: () => {},
};
