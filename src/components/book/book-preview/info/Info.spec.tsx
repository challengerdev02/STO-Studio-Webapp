import {
  cleanup,
  queryAllByText,
  queryByText,
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { InfoTab } from './index';
import React from 'react';
import { UserNamespace } from '@/shared/namespaces/user';
import { BookNamespace } from '@/shared/namespaces/book';

describe('MyBooksWrapper component', function () {
  afterEach(cleanup);

  const setup = (
    { attributes, ...props }: { attributes: BookNamespace.Attribute[] } = {
      attributes: [],
    }
  ) => {
    const utils = render(
      <InfoTab
        attributes={attributes}
        description="Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks. But when one goes much too far, her parents ground the young royal"
        numberOfPages={10}
        isbn={'isbnText'}
        GENRE_OPTIONS={'GENRE_OPTIONSText'}
        ageRating={'18+'}
        user={{ walletAddress: '0xbd724850xbd72485' } as UserNamespace.User}
        {...props}
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
  it('should test the my-book-preview-wrapper component paints on screen ', () => {
    const { getByTestId } = setup();
    expect(queryByText(document.body, 'GENRE_OPTIONSText')).toBeInTheDocument();
    expect(queryByText(document.body, 'Pages')).toBeInTheDocument();
    expect(queryByText(document.body, '10')).toBeInTheDocument();
    expect(queryByText(document.body, 'isbnText')).toBeInTheDocument();
    expect(queryByText(document.body, '18+')).toBeInTheDocument();
    expect(queryAllByText(document.body, '0xbd72…2485').length).toBe(2);
    expect(queryByText(document.body, 'GENRE_OPTIONSText')).toBeInTheDocument();
    expect(queryByText(document.body, 'No attributes')).toBeInTheDocument();
  });

  it('should test the my-book-preview-wrapper component paints on screen ', () => {
    const { getByTestId } = setup({
      attributes: [
        {
          title: 'attr-title',
          value: 'attr-value',
        } as BookNamespace.Attribute,
      ],
    });
    expect(queryByText(document.body, 'attr-title')).toBeInTheDocument();
    expect(queryByText(document.body, 'attr-value')).toBeInTheDocument();
    expect(queryByText(document.body, 'No attributes')).not.toBeInTheDocument();
  });
});
