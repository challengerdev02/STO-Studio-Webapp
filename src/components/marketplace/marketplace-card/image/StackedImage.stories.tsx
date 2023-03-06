import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../../styles/metacomic-theme.css';
import '../../../../../styles/globals.css';
import { generateStackedImage } from './index';

const StackImageContent = ({ ...props }: { urlList: string[] }) => {
  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      {generateStackedImage(props.urlList)}
    </div>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Image/StackedImage',
  component: StackImageContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof StackImageContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StackImageContent> = (args) => (
  <StackImageContent {...args} />
);

export const StackedImage = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
StackedImage.args = {
  urlList: [
    'https://robohash.org/962440efdb9e25e8ff4360a7037acfb4?set=set4&bgset=&size=400x400',
    'https://robohash.org/887f430666b7d04d90b82a4b988df961?set=set4&bgset=&size=400x400',
    'https://robohash.org/15b76d2ec3afc53e3af6c4a316090c94?set=set4&bgset=&size=400x400',
  ],
};
