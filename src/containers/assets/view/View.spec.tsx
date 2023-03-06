import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryAllByTestId,
  queryAllByText,
  queryByAttribute,
  queryByTestId,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react';
import { ViewBookContainer } from './index';

const mockHandleUpdateAccountFn = jest.fn();
const mockFindOneAccountFn = jest.fn();
const mockHandleGetBook = jest.fn();
const mockPush = jest.fn();

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'), // use actual for all non-hook parts
  useParams: () => ({
    teamId: 'someTeamId',
    eventId: 'someEventId',
    broadcastId: 'someShowId',
  }),
  useRouter: () => ({
    query: { assetID: 'x' },
    push: mockPush,
  }),
  useLocation: jest.fn(),
}));

jest.mock('@/hooks', () => {
  return {
    ...jest.requireActual('@/hooks'), // use actual for all non-hook parts

    useBook: () => ({
      book: {
        _id: '6239640090d7cf5e4ef52b3a',
        active: true,
        walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
        likes: 0,
        editors: [],
        genres: [],
        isbn: '235142586-3',
        ageRating: '30 - Above',
        infoLink: 'www.hafiz.com',
        explicitContent: false,
        description: 'Book description 623963e50870e0a8f9db9742_6_5_3',
        coverImage:
          'https://storage.googleapis.com/bytegum_dev/1643286935082-file',
        title: 'book_title_0x9c1b1c10406d11757067f03ce14a875c18a24e88_6_5_3',
        user: {
          emailAccount: {
            verified: false,
            verifyCodeExpiration: null,
          },
          _id: '623963e50870e0a8f9db9742',
          walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
          __v: 0,
          active: true,
          createdAt: '2022-03-22T05:51:33.772Z',
          followers: 0,
          followings: 0,
          publicId: 'usr_Lb5h1OBncx7TM7B5',
          updatedAt: '2022-03-22T05:51:33.772Z',
        },
        publicId: 'bok_hh3nGbqt5pKBJQiO',
        createdAt: '2022-03-22T05:52:00.936Z',
        updatedAt: '2022-03-22T05:52:00.936Z',
        __v: 0,
        scenes: [
          {
            _id: '623964660870e0a8f9dc36f3',
            title:
              'scene title for book_title_0x9c1b1c10406d11757067f03ce14a875c18a24e88_6_5_3 22_0',
            __v: 0,
            active: true,
            book: '6239640090d7cf5e4ef52b3a',
            coverImage: 'http://dummyimage.com/862x990.png/cc0000/ffffff',
            createdAt: '2022-03-22T05:53:42.791Z',
            description:
              'Scene description for Book description 623963e50870e0a8f9db9742_6_5_3',
            explicitContent: true,
            publicId: 'scene_CPtYAmoeiX6zZPCK',
            updatedAt: '2022-03-22T05:53:42.791Z',
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            artists: [
              {
                _id: '6239646790d7cf5e4ef5309e',
                active: true,
                assetType: 'Book',
                asset: '623964660870e0a8f9dc36f3',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Idalia Marchington',
                publicId: 'art_sQj6K97SdCdR7KKK',
                __v: 0,
                createdAt: '2022-03-22T05:53:43.103Z',
                updatedAt: '2022-03-22T05:53:43.103Z',
              },
              {
                _id: '6239646790d7cf5e4ef5309f',
                active: true,
                assetType: 'Book',
                asset: '623964660870e0a8f9dc36f3',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Loralee Ellerman',
                publicId: 'art_2JDeUOa9ztI9gOoL',
                __v: 0,
                createdAt: '2022-03-22T05:53:43.103Z',
                updatedAt: '2022-03-22T05:53:43.103Z',
              },
            ],
            attributes: [
              {
                _id: '6239646690d7cf5e4ef5309c',
                active: true,
                assetType: 'Book',
                asset: '623964660870e0a8f9dc36f3',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'South Africa',
                attributeType: 'text',
                title: 'Country',
                publicId: 'att_EeINToQNF9lItRZR',
                __v: 0,
                createdAt: '2022-03-22T05:53:42.914Z',
                updatedAt: '2022-03-22T05:53:42.914Z',
              },
            ],
            id: '623964660870e0a8f9dc36f3',
          },
          {
            _id: '623964680870e0a8f9dc38e7',
            title:
              'scene title for book_title_0x9c1b1c10406d11757067f03ce14a875c18a24e88_6_5_3 22_1',
            __v: 0,
            active: true,
            book: '6239640090d7cf5e4ef52b3a',
            coverImage: 'http://dummyimage.com/862x990.png/cc0000/ffffff',
            createdAt: '2022-03-22T05:53:44.225Z',
            description:
              'Scene description for Book description 623963e50870e0a8f9db9742_6_5_3',
            explicitContent: true,
            publicId: 'scene_LMVcxLk3vAaqTBj4',
            updatedAt: '2022-03-22T05:53:44.225Z',
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            artists: [
              {
                _id: '6239646890d7cf5e4ef530b1',
                active: true,
                assetType: 'Book',
                asset: '623964680870e0a8f9dc38e7',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Manfred Carruthers',
                publicId: 'art_ao4TNsIFTLRCK4T3',
                __v: 0,
                createdAt: '2022-03-22T05:53:44.635Z',
                updatedAt: '2022-03-22T05:53:44.635Z',
              },
            ],
            attributes: [
              {
                _id: '6239646890d7cf5e4ef530ac',
                active: true,
                assetType: 'Book',
                asset: '623964680870e0a8f9dc38e7',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: '10',
                attributeType: 'int',
                title: 'Age',
                publicId: 'att_DZNW7tHqYQgkxTEF',
                __v: 0,
                createdAt: '2022-03-22T05:53:44.435Z',
                updatedAt: '2022-03-22T05:53:44.435Z',
              },
              {
                _id: '6239646890d7cf5e4ef530ad',
                active: true,
                assetType: 'Book',
                asset: '623964680870e0a8f9dc38e7',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'Nigeria',
                attributeType: 'text',
                title: 'Country',
                publicId: 'att_9bEWt6MKv5XOpf7m',
                __v: 0,
                createdAt: '2022-03-22T05:53:44.436Z',
                updatedAt: '2022-03-22T05:53:44.436Z',
              },
              {
                _id: '6239646890d7cf5e4ef530af',
                active: true,
                assetType: 'Book',
                asset: '623964680870e0a8f9dc38e7',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'South Africa',
                attributeType: 'text',
                title: 'Country',
                publicId: 'att_k2nS3KXDmLMc8XMm',
                __v: 0,
                createdAt: '2022-03-22T05:53:44.436Z',
                updatedAt: '2022-03-22T05:53:44.436Z',
              },
              {
                _id: '6239646890d7cf5e4ef530ae',
                active: true,
                assetType: 'Book',
                asset: '623964680870e0a8f9dc38e7',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'Hinduism',
                attributeType: 'text',
                title: 'Religion',
                publicId: 'att_UH7DbDJ2ScDZHcYj',
                __v: 0,
                createdAt: '2022-03-22T05:53:44.436Z',
                updatedAt: '2022-03-22T05:53:44.436Z',
              },
              {
                _id: '6239646890d7cf5e4ef530ab',
                active: true,
                assetType: 'Book',
                asset: '623964680870e0a8f9dc38e7',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'Islam',
                attributeType: 'text',
                title: 'Religion',
                publicId: 'att_QGN4kfO02e48NYk7',
                __v: 0,
                createdAt: '2022-03-22T05:53:44.435Z',
                updatedAt: '2022-03-22T05:53:44.435Z',
              },
            ],
            id: '623964680870e0a8f9dc38e7',
          },
          {
            _id: '623964690870e0a8f9dc3ae0',
            title:
              'scene title for book_title_0x9c1b1c10406d11757067f03ce14a875c18a24e88_6_5_3 22_2',
            __v: 0,
            active: true,
            book: '6239640090d7cf5e4ef52b3a',
            coverImage: 'http://dummyimage.com/862x990.png/cc0000/ffffff',
            createdAt: '2022-03-22T05:53:45.351Z',
            description:
              'Scene description for Book description 623963e50870e0a8f9db9742_6_5_3',
            explicitContent: true,
            publicId: 'scene_kYDsucezJkPu84AQ',
            updatedAt: '2022-03-22T05:53:45.351Z',
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            artists: [
              {
                _id: '6239646990d7cf5e4ef530be',
                active: true,
                assetType: 'Book',
                asset: '623964690870e0a8f9dc3ae0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Corbet Topley',
                publicId: 'art_eDJZNo1mfA2M9urg',
                __v: 0,
                createdAt: '2022-03-22T05:53:45.659Z',
                updatedAt: '2022-03-22T05:53:45.659Z',
              },
            ],
            attributes: [
              {
                _id: '6239646990d7cf5e4ef530bb',
                active: true,
                assetType: 'Book',
                asset: '623964690870e0a8f9dc3ae0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'Female',
                attributeType: 'text',
                title: 'Gender',
                publicId: 'att_IYACdTt5DAqeQZA5',
                __v: 0,
                createdAt: '2022-03-22T05:53:45.483Z',
                updatedAt: '2022-03-22T05:53:45.483Z',
              },
              {
                _id: '6239646990d7cf5e4ef530bc',
                active: true,
                assetType: 'Book',
                asset: '623964690870e0a8f9dc3ae0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: '40',
                attributeType: 'int',
                title: 'Age',
                publicId: 'att_A8DFP4EPdRSd9r1u',
                __v: 0,
                createdAt: '2022-03-22T05:53:45.484Z',
                updatedAt: '2022-03-22T05:53:45.484Z',
              },
            ],
            id: '623964690870e0a8f9dc3ae0',
          },
        ],
        characters: [
          {
            _id: '623964d80870e0a8f9dcc1a3',
            title:
              'character title for book_title_0x9c1b1c10406d11757067f03ce14a875c18a24e88_6_5_3 22_0',
            __v: 0,
            active: true,
            book: '6239640090d7cf5e4ef52b3a',
            coverImage: 'http://dummyimage.com/904x870.png/5fa2dd/ffffff',
            createdAt: '2022-03-22T05:55:36.314Z',
            description:
              'Scene description for Book description 623963e50870e0a8f9db9742_6_5_3',
            explicitContent: false,
            publicId: 'character_72JQjU0UxZ9yVP2F',
            updatedAt: '2022-03-22T05:55:36.314Z',
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            artists: [
              {
                _id: '623964d890d7cf5e4ef536f0',
                active: true,
                assetType: 'Character',
                asset: '623964d80870e0a8f9dcc1a3',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Vyky Kerslake',
                publicId: 'art_X9ha00kO6zadTMeb',
                __v: 0,
                createdAt: '2022-03-22T05:55:36.560Z',
                updatedAt: '2022-03-22T05:55:36.560Z',
              },
              {
                _id: '623964d890d7cf5e4ef536f2',
                active: true,
                assetType: 'Character',
                asset: '623964d80870e0a8f9dcc1a3',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Rorke Galfour',
                publicId: 'art_UboBWBR6XGEtZ7xQ',
                __v: 0,
                createdAt: '2022-03-22T05:55:36.560Z',
                updatedAt: '2022-03-22T05:55:36.560Z',
              },
              {
                _id: '623964d890d7cf5e4ef536f3',
                active: true,
                assetType: 'Character',
                asset: '623964d80870e0a8f9dcc1a3',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Giuditta Whiteson',
                publicId: 'art_7SFybgtbu2ecWlUz',
                __v: 0,
                createdAt: '2022-03-22T05:55:36.560Z',
                updatedAt: '2022-03-22T05:55:36.560Z',
              },
              {
                _id: '623964d890d7cf5e4ef536f4',
                active: true,
                assetType: 'Character',
                asset: '623964d80870e0a8f9dcc1a3',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Almeda Lovel',
                publicId: 'art_FFqyVttjZ03Mlmyj',
                __v: 0,
                createdAt: '2022-03-22T05:55:36.560Z',
                updatedAt: '2022-03-22T05:55:36.560Z',
              },
              {
                _id: '623964d890d7cf5e4ef536f1',
                active: true,
                assetType: 'Character',
                asset: '623964d80870e0a8f9dcc1a3',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Charlot Bennedsen',
                publicId: 'art_9d0TA4XkDJ7qXeVJ',
                __v: 0,
                createdAt: '2022-03-22T05:55:36.560Z',
                updatedAt: '2022-03-22T05:55:36.560Z',
              },
            ],
            attributes: [
              {
                _id: '623964d890d7cf5e4ef536ee',
                active: true,
                assetType: 'Character',
                asset: '623964d80870e0a8f9dcc1a3',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'USA',
                attributeType: 'text',
                title: 'Country',
                publicId: 'att_9Vsie8nqt5DTt8qi',
                __v: 0,
                createdAt: '2022-03-22T05:55:36.438Z',
                updatedAt: '2022-03-22T05:55:36.438Z',
              },
            ],
            id: '623964d80870e0a8f9dcc1a3',
          },
          {
            _id: '623964d90870e0a8f9dcc2c2',
            title:
              'character title for book_title_0x9c1b1c10406d11757067f03ce14a875c18a24e88_6_5_3 22_1',
            __v: 0,
            active: true,
            book: '6239640090d7cf5e4ef52b3a',
            coverImage: 'http://dummyimage.com/904x870.png/5fa2dd/ffffff',
            createdAt: '2022-03-22T05:55:37.393Z',
            description:
              'Scene description for Book description 623963e50870e0a8f9db9742_6_5_3',
            explicitContent: false,
            publicId: 'character_zjvgjiWmdZQSlnO9',
            updatedAt: '2022-03-22T05:55:37.393Z',
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            artists: [
              {
                _id: '623964d990d7cf5e4ef53706',
                active: true,
                assetType: 'Character',
                asset: '623964d90870e0a8f9dcc2c2',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Dion Dugmore',
                publicId: 'art_0wO5MvG2LE70zQlc',
                __v: 0,
                createdAt: '2022-03-22T05:55:37.691Z',
                updatedAt: '2022-03-22T05:55:37.691Z',
              },
              {
                _id: '623964d990d7cf5e4ef53708',
                active: true,
                assetType: 'Character',
                asset: '623964d90870e0a8f9dcc2c2',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Deny Matevosian',
                publicId: 'art_qnWIuLrNKjMLY2pf',
                __v: 0,
                createdAt: '2022-03-22T05:55:37.691Z',
                updatedAt: '2022-03-22T05:55:37.691Z',
              },
              {
                _id: '623964d990d7cf5e4ef53707',
                active: true,
                assetType: 'Character',
                asset: '623964d90870e0a8f9dcc2c2',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Marcella Giovanizio',
                publicId: 'art_U0PYVZE1FALiLyWR',
                __v: 0,
                createdAt: '2022-03-22T05:55:37.691Z',
                updatedAt: '2022-03-22T05:55:37.691Z',
              },
              {
                _id: '623964d990d7cf5e4ef53709',
                active: true,
                assetType: 'Character',
                asset: '623964d90870e0a8f9dcc2c2',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Ruby Ollet',
                publicId: 'art_gfCaOlBlUe2PbCZQ',
                __v: 0,
                createdAt: '2022-03-22T05:55:37.692Z',
                updatedAt: '2022-03-22T05:55:37.692Z',
              },
              {
                _id: '623964d990d7cf5e4ef5370a',
                active: true,
                assetType: 'Character',
                asset: '623964d90870e0a8f9dcc2c2',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Manfred Carruthers',
                publicId: 'art_dgQNpUVQAIQ5Svlb',
                __v: 0,
                createdAt: '2022-03-22T05:55:37.692Z',
                updatedAt: '2022-03-22T05:55:37.692Z',
              },
              {
                _id: '623964d990d7cf5e4ef5370b',
                active: true,
                assetType: 'Character',
                asset: '623964d90870e0a8f9dcc2c2',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Coop Burkman',
                publicId: 'art_GzUDbsT2GSc064cf',
                __v: 0,
                createdAt: '2022-03-22T05:55:37.692Z',
                updatedAt: '2022-03-22T05:55:37.692Z',
              },
            ],
            attributes: [
              {
                _id: '623964d990d7cf5e4ef53703',
                active: true,
                assetType: 'Character',
                asset: '623964d90870e0a8f9dcc2c2',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'Hinduism',
                attributeType: 'text',
                title: 'Religion',
                publicId: 'att_f6Uc9FnPUx1lTZyX',
                __v: 0,
                createdAt: '2022-03-22T05:55:37.510Z',
                updatedAt: '2022-03-22T05:55:37.510Z',
              },
              {
                _id: '623964d990d7cf5e4ef53704',
                active: true,
                assetType: 'Character',
                asset: '623964d90870e0a8f9dcc2c2',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'Ghana',
                attributeType: 'text',
                title: 'Country',
                publicId: 'att_f7obOT0HdQ34l0Wq',
                __v: 0,
                createdAt: '2022-03-22T05:55:37.511Z',
                updatedAt: '2022-03-22T05:55:37.511Z',
              },
            ],
            id: '623964d90870e0a8f9dcc2c2',
          },
          {
            _id: '623964da0870e0a8f9dcc3e0',
            title:
              'character title for book_title_0x9c1b1c10406d11757067f03ce14a875c18a24e88_6_5_3 22_2',
            __v: 0,
            active: true,
            book: '6239640090d7cf5e4ef52b3a',
            coverImage: 'http://dummyimage.com/904x870.png/5fa2dd/ffffff',
            createdAt: '2022-03-22T05:55:38.202Z',
            description:
              'Scene description for Book description 623963e50870e0a8f9db9742_6_5_3',
            explicitContent: false,
            publicId: 'character_Kc9Ixc26zUugvPY7',
            updatedAt: '2022-03-22T05:55:38.202Z',
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            artists: [
              {
                _id: '623964dc90d7cf5e4ef53721',
                active: true,
                assetType: 'Character',
                asset: '623964da0870e0a8f9dcc3e0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Ozzy Stirton',
                publicId: 'art_NyfnoriBoIN1Cg9f',
                __v: 0,
                createdAt: '2022-03-22T05:55:40.149Z',
                updatedAt: '2022-03-22T05:55:40.149Z',
              },
              {
                _id: '623964dc90d7cf5e4ef5371b',
                active: true,
                assetType: 'Character',
                asset: '623964da0870e0a8f9dcc3e0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Elsie Seemmonds',
                publicId: 'art_KiwtTJyQexJwcwAP',
                __v: 0,
                createdAt: '2022-03-22T05:55:40.149Z',
                updatedAt: '2022-03-22T05:55:40.149Z',
              },
              {
                _id: '623964dc90d7cf5e4ef5371c',
                active: true,
                assetType: 'Character',
                asset: '623964da0870e0a8f9dcc3e0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Charlot Bennedsen',
                publicId: 'art_lb1TzEUEaexPToxm',
                __v: 0,
                createdAt: '2022-03-22T05:55:40.149Z',
                updatedAt: '2022-03-22T05:55:40.149Z',
              },
              {
                _id: '623964dc90d7cf5e4ef5371e',
                active: true,
                assetType: 'Character',
                asset: '623964da0870e0a8f9dcc3e0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Idalia Marchington',
                publicId: 'art_xxp17bx2inqyWqGa',
                __v: 0,
                createdAt: '2022-03-22T05:55:40.149Z',
                updatedAt: '2022-03-22T05:55:40.149Z',
              },
              {
                _id: '623964dc90d7cf5e4ef53720',
                active: true,
                assetType: 'Character',
                asset: '623964da0870e0a8f9dcc3e0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Grantley Leupold',
                publicId: 'art_wHnCJqBgbvKBAPJD',
                __v: 0,
                createdAt: '2022-03-22T05:55:40.149Z',
                updatedAt: '2022-03-22T05:55:40.149Z',
              },
              {
                _id: '623964dc90d7cf5e4ef5371f',
                active: true,
                assetType: 'Character',
                asset: '623964da0870e0a8f9dcc3e0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Corbet Topley',
                publicId: 'art_MFDc0PhN6ktaM22v',
                __v: 0,
                createdAt: '2022-03-22T05:55:40.149Z',
                updatedAt: '2022-03-22T05:55:40.149Z',
              },
              {
                _id: '623964dc90d7cf5e4ef5371d',
                active: true,
                assetType: 'Character',
                asset: '623964da0870e0a8f9dcc3e0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Dion Dugmore',
                publicId: 'art_wlb5VtKXQjUULghI',
                __v: 0,
                createdAt: '2022-03-22T05:55:40.149Z',
                updatedAt: '2022-03-22T05:55:40.149Z',
              },
              {
                _id: '623964dc90d7cf5e4ef53722',
                active: true,
                assetType: 'Character',
                asset: '623964da0870e0a8f9dcc3e0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                name: 'Broderick Sainter',
                publicId: 'art_F0v5PWpal0BqgBJX',
                __v: 0,
                createdAt: '2022-03-22T05:55:40.149Z',
                updatedAt: '2022-03-22T05:55:40.149Z',
              },
            ],
            attributes: [
              {
                _id: '623964db90d7cf5e4ef53719',
                active: true,
                assetType: 'Character',
                asset: '623964da0870e0a8f9dcc3e0',
                walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
                value: 'South Africa',
                attributeType: 'text',
                title: 'Country',
                publicId: 'att_rkIij9oJVsxgFRjh',
                __v: 0,
                createdAt: '2022-03-22T05:55:39.970Z',
                updatedAt: '2022-03-22T05:55:39.970Z',
              },
            ],
            id: '623964da0870e0a8f9dcc3e0',
          },
        ],
        series: [
          {
            _id: '6239640090d7cf5e4ef52b4c',
            deleted: false,
            assetType: 'Book',
            asset: '6239640090d7cf5e4ef52b3a',
            active: true,
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            title: 'Blackadder Back & Forth',
            publicId: 'ser_U5AI0RsgVaTkelM7',
            __v: 0,
            createdAt: '2022-03-22T05:52:00.814Z',
            updatedAt: '2022-03-22T05:52:00.814Z',
          },
          {
            _id: '6239640090d7cf5e4ef52b4b',
            deleted: false,
            assetType: 'Book',
            asset: '6239640090d7cf5e4ef52b3a',
            active: true,
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            title: 'Reversal of Fortune',
            publicId: 'ser_NvxRKv0kLbdcX2l6',
            __v: 0,
            createdAt: '2022-03-22T05:52:00.813Z',
            updatedAt: '2022-03-22T05:52:00.813Z',
          },
          {
            _id: '6239640090d7cf5e4ef52b49',
            deleted: false,
            assetType: 'Book',
            asset: '6239640090d7cf5e4ef52b3a',
            active: true,
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            title: 'Man of Aran',
            publicId: 'ser_5bKuw52KgRGVociP',
            __v: 0,
            createdAt: '2022-03-22T05:52:00.813Z',
            updatedAt: '2022-03-22T05:52:00.813Z',
          },
          {
            _id: '6239640090d7cf5e4ef52b4a',
            deleted: false,
            assetType: 'Book',
            asset: '6239640090d7cf5e4ef52b3a',
            active: true,
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            title: 'Brake',
            publicId: 'ser_91GVic289ObFfBVD',
            __v: 0,
            createdAt: '2022-03-22T05:52:00.813Z',
            updatedAt: '2022-03-22T05:52:00.813Z',
          },
        ],
        attributes: [
          {
            _id: '6239640090d7cf5e4ef52b3c',
            active: true,
            assetType: 'Book',
            asset: '6239640090d7cf5e4ef52b3a',
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            value: 'Nigeria',
            attributeType: 'text',
            title: 'Country',
            publicId: 'att_OH4LIwqD7mQHpwbl',
            __v: 0,
            createdAt: '2022-03-22T05:52:00.397Z',
            updatedAt: '2022-03-22T05:52:00.397Z',
          },
          {
            _id: '6239640090d7cf5e4ef52b3b',
            active: true,
            assetType: 'Book',
            asset: '6239640090d7cf5e4ef52b3a',
            walletAddress: '0x9c1b1c10406d11757067f03ce14a875c18a24e88',
            value: '30',
            attributeType: 'int',
            title: 'Age',
            publicId: 'att_MntRlcwY8pEM0aZm',
            __v: 0,
            createdAt: '2022-03-22T05:52:00.397Z',
            updatedAt: '2022-03-22T05:52:00.397Z',
          },
        ],
        id: '6239640090d7cf5e4ef52b3a',
      },
      handleGetBook: mockHandleGetBook,
    }),
    useAccount: jest.fn().mockImplementation(() => ({
      user: {
        username: 'mike',
        walletAddress: '0xrrr',
        url: 'url string',
        emailAccount: {
          email: 'hs@gimal.vom',
        },
      },
      search: jest.fn(),
      handleUpdateAccount: mockHandleUpdateAccountFn,
      handleFindOneAccount: mockFindOneAccountFn,
    })),
    useUIState: () => ({
      uiLoaders: [],
    }),
  };
});

// import { useBook } from '@/hooks';
const useBook = jest.spyOn(require('@/hooks'), 'useBook');

describe('View Asset Container', function () {
  afterEach(cleanup);
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  it('should match with snapshot', () => {
    // @ts-ignore
    const { container } = render(<ViewBookContainer />);
    expect(container).toMatchSnapshot();
  });
  it('should fire preview button', async () => {
    // @ts-ignore
    render(<ViewBookContainer />);

    await waitFor(() => {
      expect(mockHandleGetBook).toHaveBeenCalled();
    });
  });

  it('should fire Create Book', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryByTestId(document.body, 'add-scene-card');
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Revise Book', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryAllByText(document.body, 'Revise')[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Sell Copies Book', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryByText(document.body, 'Sell Copies');
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Sell Scene', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryAllByTestId(document.body, 'sell-btn')[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      const btn = queryByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-link ant-btn-sm ant-btn-block'
      );
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Revise Scene', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryAllByTestId(document.body, 'sell-btn')[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      const btn = queryAllByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-text ant-btn-sm ant-btn-block'
      )[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Cancel Sell Scene', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryAllByTestId(document.body, 'sell-btn')[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      const btn = queryAllByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-text ant-btn-sm ant-btn-block'
      )[1];

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Preview', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryByText(document.body, 'Preview');
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should Add Character', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryByText(document.body, 'Add new character');
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Revise Sell Character', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryAllByText(document.body, 'Sell Character')[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      const btn = queryAllByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-text ant-btn-sm ant-btn-block'
      )[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Cancel Sell Character', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryAllByText(document.body, 'Sell Character')[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      const btn = queryAllByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-text ant-btn-sm ant-btn-block'
      )[1];

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should fire Sell Character', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryAllByText(document.body, 'Sell Character')[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      const btn = queryAllByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-link ant-btn-sm ant-btn-block'
      )[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should match without name ', () => {
    // @ts-ignore
    useBook.mockImplementation(() => ({
      book: {},
      handleGetBook: mockHandleGetBook,
    }));
    const { container } = render(<ViewBookContainer />);
    expect(container).toMatchSnapshot();
  });

  it('should fire Cancel Sell Character', async () => {
    // @ts-ignore
    const container = render(<ViewBookContainer />);

    await waitFor(() => {
      const btn = queryAllByText(document.body, 'Sell Character')[0];
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      const btn = queryAllByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-text ant-btn-sm ant-btn-block'
      )[1];

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });
});
