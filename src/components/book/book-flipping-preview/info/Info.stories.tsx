import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InfoTab } from './index';
import { UserNamespace } from '@/shared/namespaces/user';

export default {
  title: 'book/preview/info',
  component: InfoTab,
  argTypes: {},
} as ComponentMeta<typeof InfoTab>;

const Template: ComponentStory<typeof InfoTab> = (args) => (
  <InfoTab
    {...args}
    description="Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks. But when one goes much too far, her parents ground the young royal"
    numberOfPages={10}
    isbn={''}
    GENRE_OPTIONS={''}
    ageRating={''}
    attributes={[]}
    user={{ walletAddress: '0xbd724850xbd72485' } as UserNamespace.User}
  />
);

export const CreateBookTabStory = Template.bind({});
CreateBookTabStory.args = {};
