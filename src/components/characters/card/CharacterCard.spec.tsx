import { cleanup, render } from '@testing-library/react';
import { CharacterCard } from './index';
import React from 'react';
import Img from '../../../../public/sellScene.png';

describe('CharacterCard', function () {
  afterEach(cleanup);

  const setup = () => {
    const utils = render(
      <CharacterCard
        description={'description'}
        artists={'spider-man'}
        title={'title'}
        img={Img}
        onRevise={jest.fn()}
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

  it('should test that the card is rendered', function () {
    const { container } = setup();
    expect(container).toBeDefined();
  });

  it('should return the character string in the component correctly', function () {
    const { getByText } = setup();
    expect(getByText('spider-man')).toBeInTheDocument();
  });
});
