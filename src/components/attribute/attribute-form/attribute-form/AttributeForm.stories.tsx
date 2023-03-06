import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import 'metacomicicons/fonts/metacomic.css';
import { AttributeForm } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'attribute/form',
  component: AttributeForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AttributeForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AttributeForm> = (args) => (
  <AttributeForm {...args} />
);

export const FormModal = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FormModal.args = {
  subtitle:
    'Properties show up underneath your item, are clickable, and can be filtered in your collection’s sidebar.',
  types: ['Number', 'Text'],
  onFinish: (values) => {
    //console.log(values);
    alert(JSON.stringify(values));
  },
};
