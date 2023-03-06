import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../../../styles/metacomic-theme.css';
import '../../../../styles/globals.css';
import { BrowseNFT } from './index';
import { shuffle } from 'lodash';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'marketplace/BrowseNFT',
  component: BrowseNFT,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    cardData: {
      control: {
        type: 'object',
        defaultValue: {
          name: 'Main Hero Buzi #282',
        },
      },
    },
    style: {
      control: {
        type: 'object',
        defaultValue: {
          width: '200px',
        },
      },
    },
  },
} as ComponentMeta<typeof BrowseNFT>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BrowseNFT> = (args) => (
  <BrowseNFT {...args} />
);

export const View = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
let images = [
  // {src:"/failed-image.png"},
  {
    src: 'https://i.picsum.photos/id/111/600/400.jpg?hmac=hVzgLIvxNZYaZkGV8HgOs6FO0aePt5tSEhb-sZBwbkk',
  },
  {
    src: 'https://i.picsum.photos/id/848/600/400.jpg?hmac=gdx1i308nOCrjtfzwAlWF5RCN8HKoQd-POMetrAmZxc',
  },
  {
    src: 'https://i.picsum.photos/id/800/600/400.jpg?hmac=BfxO4NSm5mSWXzJizt0AQmoYlCYW9naVm-m9n3YB6Ss',
  },
  {
    src: 'https://i.picsum.photos/id/48/600/400.jpg?hmac=cCi79K4z3DzPqjEvIrMM-D2KVfFRngC631Qx8g9PPxo',
  },
  {
    src: 'https://i.picsum.photos/id/891/600/400.jpg?hmac=h3MaYu1wv2Z6nZIe-h2Qr5f2hWgdwOXK-8IoJKWOi5o',
  },
  {
    src: 'https://i.picsum.photos/id/115/600/400.jpg?hmac=3JFSzdi5oc5InYvi2ShLRguL3tP9noN-CjNNPur1Ewg',
  },
  {
    src: 'https://i.picsum.photos/id/231/600/400.jpg?hmac=wCQ76f4r3xMWs5nO-BcnAxmfP83yigbQsiK0w30ZP7I',
  },
  {
    src: 'https://i.picsum.photos/id/491/600/400.jpg?hmac=Axi0j7R265OuvHkX08P7LInOnl0rwOIoF2y9rNfp4vU',
  },
  {
    src: 'https://i.picsum.photos/id/524/600/400.jpg?hmac=dHi4SzGwI6OXIEY7vXNpt6ohHGoDaZevHE0lBuB85xU',
  },
  {
    src: 'https://i.picsum.photos/id/256/600/400.jpg?hmac=fIC8k66mBPEEbMQSMJgJJrW_jcRlWHPQ_OE6UWum-Yg',
  },
  {
    src: 'https://i.picsum.photos/id/356/600/400.jpg?hmac=4PAfGd24yOPKaDUITNkm86-qmq9pktPbq6Fda2m3At0',
  },
];
let market_card = {
  coverInfo: {
    countDown: '01:52:09 left 🔥',
    coverImg:
      'https://robohash.org/a8cd9c187bb33c8a8f6e2774d71308fb?set=set4&bgset=&size=400x400',
    menuItems: ['Option A', 'Option B', 'Option c'],
  },
  cardData: {
    title: 'Burney #282',
    iconURL:
      'https://robohash.org/0f0383b8d198fb15c0ab7fc729a73028?set=set4&bgset=&size=400x400',
    itemPrice: '3.01 BTC',
    rates: '1/1',
    count: '17k',
    inWishlist: false,
    urlList: [
      'https://robohash.org/962440efdb9e25e8ff4360a7037acfb4?set=set4&bgset=&size=400x400',
      'https://robohash.org/887f430666b7d04d90b82a4b988df961?set=set4&bgset=&size=400x400',
      'https://robohash.org/15b76d2ec3afc53e3af6c4a316090c94?set=set4&bgset=&size=400x400',
    ],
  },
};
const onSontinChange = (value: string) => {
  //console.log('value', value);
};
View.args = {
  //@ts-ignore
  browseAuctionNfts: shuffle(images).map((nft) => ({
    ...market_card,
    coverInfo: { ...market_card.coverInfo, coverImg: nft.src },
  })),

  onBlockChangeChange: onSontinChange,
  blockSelectItems: [
    { value: 'eth', label: 'Etherium' },
    { value: 'btc', label: 'Bitcoin' },
  ],
  onGENRE_OPTIONSChangeChange: onSontinChange,
  genreselectItems: [
    { value: 'eth', label: 'G Etherium' },
    { value: 'btc', label: 'Bitcoin' },
  ],
  onSalesTypeChange: onSontinChange,
  salesSelectItems: [
    { value: 'eth', label: 'S Etherium' },
    { value: 'btc', label: 'Bitcoin' },
  ],
  onPriceRangeChange: onSontinChange,
  priceSelectItems: [
    { value: 'eth', label: 'P Etherium' },
    { value: 'btc', label: 'Bitcoin' },
  ],
  recentlyAddedCB: onSontinChange,
  onFinish: onSontinChange,

  loadMore: onSontinChange,
  loadingState: true,
  showLoad: true,
};
