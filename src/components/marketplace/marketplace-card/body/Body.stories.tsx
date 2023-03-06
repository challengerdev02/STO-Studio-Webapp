import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import '../../../../../styles/globals.css';
import { BodyComponent } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Marketplace/BodyComponent',
  component: BodyComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof BodyComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BodyComponent> = (args) => (
  <BodyComponent {...args} />
);

export const CustomStyled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CustomStyled.args = {
  title: 'Main Title',
  placeBid: () => console.log(''),
  itemPrice: 'Coin Value',
  rates: '2.0',
  iconURL: 'www.url.com',
  count: '10',
  inWishlist: true,
  urlList: [],
};
