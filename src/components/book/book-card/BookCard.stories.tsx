import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BookCard } from './index';
import DummyImage from '../../../../public/book-cover.svg';

export default {
  title: 'book/card',
  component: BookCard,
} as ComponentMeta<typeof BookCard>;

const Template: ComponentStory<typeof BookCard> = (args) => (
  <BookCard {...args} />
);

export const CreateBookStory = Template.bind({});
CreateBookStory.args = {
  title: 'Amethyst: Princess of Gemworld',
  author: 'macauley',
  description: `Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks. But when one goes much too far, her parents ground the young royal. Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks.`,
  imageUrl: DummyImage,
};
