import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import { SceneCard } from './index';
import Img from '../../../../public/sellScene.png';

export default {
  title: 'scene/card',
  component: SceneCard,
  argTypes: {
    description: 'Description',
    attributes: 'Attributes',
    artists: 'Spider man',
  },
} as unknown as ComponentMeta<typeof SceneCard>;

const Template: ComponentStory<typeof SceneCard> = (args) => (
  <SceneCard {...args} />
);

export const sellScene = Template.bind({});
sellScene.args = {
  title: ' Time: Midnight, Location: Manhattan',
  artists: 'Spider Man, Magnito...',
  description:
    "It is a long established fact that a reader will be distracted in due season for the likes of himself aren't here.",
  // @ts-ignore
  label: 'SceneCardComponent',
  img: Img,
};
