import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IsomorphicSelect } from './index';
import { Select } from 'antd';

const { Option } = Select;

export default {
  title: 'isomorphic/select',
  component: IsomorphicSelect,
} as ComponentMeta<typeof IsomorphicSelect>;

const Template: ComponentStory<typeof IsomorphicSelect> = (args) => (
  <IsomorphicSelect {...args}>
    {' '}
    <Option value="blockchain" title="Blockchain">
      Blockchain
    </Option>
    <Option value="anotheroption" title="Another Option">
      Another Option
    </Option>{' '}
  </IsomorphicSelect>
);

export const SelectMenu = Template.bind({});
SelectMenu.args = {
  background: 'var(--switch-background-color) !important',
  border: 'none',
  height: '40px !important',
};
