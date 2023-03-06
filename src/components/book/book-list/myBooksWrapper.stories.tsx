import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MyBooksWrapper } from './index';
import DummyImage from '../../../../public/book-cover.png';

export default {
  title: 'book/list',
  component: MyBooksWrapper,
} as ComponentMeta<typeof MyBooksWrapper>;

const Template: ComponentStory<typeof MyBooksWrapper> = (args) => (
  <MyBooksWrapper {...args} />
);

export const Wrapper = Template.bind({});
Wrapper.args = {
  title: 'Amethyst: Princess of Gemworld',
  author: 'macauley',
  description:
    'Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks. But when one goes much too far, her parents ground the young royal. Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks.',
  imageUrl: DummyImage,
};
