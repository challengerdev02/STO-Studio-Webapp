import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import '../../../../node_modules/metacomicicons/fonts/metacomic.css';
import { ViewAsset } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'assets/view',
  component: ViewAsset,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ViewAsset>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ViewAsset> = (args) => (
  <ViewAsset {...args} />
);

export const Layout = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Layout.args = {
  title: 'Spider man: Home coming',
  infoLink: 'https://marvel.com/spiderman-series',
  description:
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a mor',
  coverImage:
    'https://i.picsum.photos/id/491/600/400.jpg?hmac=Axi0j7R265OuvHkX08P7LInOnl0rwOIoF2y9rNfp4vU',
  GENRE_OPTIONS: 'Blues',
  ageRating: '23 and above',
  characters: [],
  artists: [],
  onReviseBook: () => {
    //console.log('EEE');
  },
  onPreviewBook: () => {
    //console.log('EEE');
  },
  onSellBook: () => {
    //console.log('EEE');
  },
  onCreateScene: (e: any) => {
    //console.log('EEE', e);
  },
  onCreateCharacter: (e: any) => {
    //console.log('EEE', e);
  },
  onSceneActions: (e: string) => {
    //console.log('EEE', e);
  },
  onCharacterActions: (e: string) => {
    //console.log('EEE', e);
  },
};
