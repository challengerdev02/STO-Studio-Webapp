import { cleanup, queryByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewAsset } from './index';
import React from 'react';

describe('ViewAsset', function () {
  afterEach(cleanup);
  let props = {
    title: 'Spider man: Home coming',
    titleLink: 'https://marvel.com/spiderman-series',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a mor',
    mainImageUrl:
      'https://i.picsum.photos/id/115/600/400.jpg?hmac=3JFSzdi5oc5InYvi2ShLRguL3tP9noN-CjNNPur1Ewg',
    GENRE_OPTIONS: 'Blues',
    language: 'Japanese',
    ageRating: '23 and above',
    characters: ['Spiderman', 'Magnito', 'John Legend'],
    artists: 'John McKane, Perter Simon',
    sellScene: {
      img: 'https://i.picsum.photos/id/115/600/400.jpg?hmac=3JFSzdi5oc5InYvi2ShLRguL3tP9noN-CjNNPur1Ewg',
      description:
        'It is a long established fact that a reader will be distracted',
      characters: 'Spider Man, Magnito',
      attributes: 'Time: Midnight, Location: Manhattan',
    },
    buttonsFn: {
      saleCopies: (e: any) => {
        //console.log('EEE', e);
      },
      edit: (e: any) => {
        //console.log('EEE', e);
      },
      preview: (e: any) => {
        //console.log('EEE', e);
      },
    },
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(
      <ViewAsset
        attributes={[]}
        scenes={[]}
        handleCreateScene={() => {}}
        {...props}
        {...extraProps}
      />
    );
    return {
      ...utils,
    };
  };

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
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should have title "Spider man: Home coming"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryByText(document.body, 'Spider man: Home coming')
    ).toBeInTheDocument();
  });

  it('should have title link "https://marvel.com/spiderman-series"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryByText(document.body, 'https://marvel.com/spiderman-series')
    ).toBeInTheDocument();
  });

  it('should have title description "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a mor"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryByText(
        document.body,
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a mor'
      )
    ).toBeInTheDocument();
  });
});
