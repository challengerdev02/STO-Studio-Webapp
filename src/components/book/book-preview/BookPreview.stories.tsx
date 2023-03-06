import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BookPreview } from './index';
import { SceneNamespace } from '@/shared/namespaces/scene';
import { UserNamespace } from '@/shared/namespaces/user';

export default {
  title: 'book/preview',
  component: BookPreview,
} as ComponentMeta<typeof BookPreview>;
const images = [
  { src: '/failed-image.png' },
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
const Template: ComponentStory<typeof BookPreview> = (args) => (
  <BookPreview
    {...args}
    title="xxxxxxx"
    description="Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks. But when one goes much too far, her parents ground the young royal"
    visibility={true}
    onClose={() => ({})}
    scenes={images.map(
      (image) => ({ coverImage: image.src } as SceneNamespace.Scene)
    )}
    coverImage={''}
    infoLink={''}
    numberOfPages={10}
    isbn={''}
    GENRE_OPTIONS={''}
    ageRating={''}
    likes={0}
    explicitContent={false}
    series={[]}
    attributes={[]}
    genres={[]}
    characters={[]}
    user={
      { walletAddress: '0xbd724850xbd72485' } as UserNamespace.User & {
        username: {
          link: string;
          name: string;
        };
      }
    }
    _id={''}
  />
);

export const Wrapper = Template.bind({});
Wrapper.args = {
  title: 'Amethyst: Princess of Gemworld',
  description:
    'Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks. But when one goes much too far, her parents ground the young royal. Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks.',
};
