import { cleanup, fireEvent, render } from '@testing-library/react';
import { SceneCard } from './index';
import React from 'react';
import Img from '../../../../public/sellScene.png';

describe('SceneCard', function () {
  afterEach(cleanup);

  let props = {
    description: 'description',
    artists: 'spider-man',
    title: 'title',
    img: Img,
    onRevise: jest.fn(),
  };

  const setup = () => {
    const utils = render(<SceneCard {...props} />);
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

  it('should test that the card is rendered', () => {
    const { container } = setup();
    expect(container).toBeDefined();
  });

  it('should return the character string in the component correctly', () => {
    const { getByText } = setup();
    expect(getByText('spider-man')).toBeInTheDocument();
  });

  it('should test the Scene card has a cover image', () => {
    const { getByTestId } = setup();
    const coverImg = getByTestId('cover-image');
    expect(coverImg).toBeInTheDocument();

    expect(coverImg).toHaveAttribute('src');

    expect(coverImg).toHaveAttribute('src', expect.stringContaining('/'));
  });

  it('should test the Scene card has a title', () => {
    const { getByTestId } = setup();

    const scene_title = getByTestId('scene-title');
    expect(scene_title).toBeInTheDocument();
  });

  it('should test the Scene card has a description', () => {
    const { getByTestId } = setup();

    const scene_description = getByTestId('scene-description');
    expect(scene_description).toBeInTheDocument();
  });

  it('should test the Scene card has an artist', () => {
    const { getByTestId } = setup();

    const scene_artist = getByTestId('scene-artist');
    expect(scene_artist).toBeInTheDocument();
  });

  it('should test the Scene card has a sell button', () => {
    const { getByTestId } = setup();

    const sell_btn = getByTestId('sell-btn');
    expect(sell_btn).toBeInTheDocument();
  });

  it('should test the Scene card is clickable', () => {
    const { getByTestId } = setup();

    const scene_card = getByTestId('scene-card');
    if (scene_card) {
      fireEvent.click(scene_card);
      expect(props.onRevise).toHaveBeenCalled();
    }
  });
});
