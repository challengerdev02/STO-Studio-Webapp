import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CreateBook } from './index';
import { FormInstance } from 'antd';

export default {
  title: 'book/create',
  component: CreateBook,
  argTypes: {},
} as ComponentMeta<typeof CreateBook>;

const Template: ComponentStory<typeof CreateBook> = () => (
  <CreateBook
    onSubmit={(form: Record<string, any>) => {
      //console.log(form);
    }}
    goBack={() => {}}
    ageOptions={[]}
    attributes={[]}
    form={
      {
        resetFields: () => {},
        validateFields: () => Promise.resolve({}),
      } as FormInstance
    }
    GENRE_OPTIONSOptions={[]}
    onAttributeModalVisibilityChange={() => {}}
    onGENRE_OPTIONSChange={() => {}}
    seriesDropdownComponent={() => <div data-testid="series-ddc" />}
    seriesOptions={[]}
    loading={false}
    allArtists={[]}
    draggerProps={{}}
    initialValues={{}}
    uploadedFile={{}}
    title={''}
    assetDomain={''}
  />
);

export const CreateBookStory = Template.bind({});
CreateBookStory.args = {
  onSubmit: () => {},
  ageOptions: [],
  attributes: [],
  form: undefined,
  GENRE_OPTIONSOptions: [],
  onAttributeModalVisibilityChange: () => {},
  onGENRE_OPTIONSChange: () => {},
  seriesDropdownComponent: () => <div data-testid="series-ddc" />,
  seriesOptions: [],
  loading: false,
  allArtists: [],
};
