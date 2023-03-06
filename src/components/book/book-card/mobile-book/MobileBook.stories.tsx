import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import DummyImage from '../../../../../public/assets/mobile-book-img.svg';
import { MobileBook } from './index';

export default {
  title: 'book/card/mobile',
  component: MobileBook,
} as ComponentMeta<typeof MobileBook>;

const Template: ComponentStory<typeof MobileBook> = (args) => (
  <MobileBook {...args} />
);

export const MobileBookCard = Template.bind({});
MobileBookCard.args = {
  simulateMobile: true,
  title: 'Amethyst: Princess of Gemworld',
  author: 'macauley',
  description: 'Amaya, princess of House Amethyst in Gemworld ...',
  imageUrl: DummyImage,
};
