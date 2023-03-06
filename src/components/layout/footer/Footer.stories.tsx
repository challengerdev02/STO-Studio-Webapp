import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Footer } from './index';
import Image from '/public/assets/logo-dark.svg';

export default {
  title: 'layout/footer',
  component: Footer,
  argTypes: {},
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const FooterComponent = Template.bind({});
FooterComponent.args = {
  imgSrc: Image,
};
