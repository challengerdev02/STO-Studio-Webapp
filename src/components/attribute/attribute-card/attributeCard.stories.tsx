import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AttributesCard } from './index';

export default {
  title: 'attribute/attributes-card',
  component: AttributesCard,
} as ComponentMeta<typeof AttributesCard>;

const Template: ComponentStory<typeof AttributesCard> = (args) => (
  <AttributesCard {...args} />
);

export const AttributesCardComponent = Template.bind({});
AttributesCardComponent.args = {
  icon: <i className="mc-check-fill mc-1x" />,
  title: 'Lorem ipsum lorem',
  bottomText: 'story line',
  backgroundColor: 'voilet',
};
