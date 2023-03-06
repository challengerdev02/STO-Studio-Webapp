import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryByAttribute,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BookPreview } from './index';
import React from 'react';

describe('MyBooksWrapper component', function () {
  afterEach(cleanup);

  const onClose = jest.fn();
  let visible: boolean = false;

  let prop = {
    title: 'test-title',
    description:
      'Amaya, princess of House Amethyst in Gemworld, and her brother love magical pranks. But when one goes much too far, her parents ground the young royal',
    visibility: { visible },
    onClose: { onClose },
    _id: 'test-id',
    coverImage: '',
  };

  const setup = (
    { visible, ...props }: { visible: boolean } = { visible: true }
  ) => {
    const utils = render(
      <BookPreview
        scenes={[]}
        user={{
          firstName: 'cosmas',
          lastName: 'cossy',
          username: {
            // @ts-ignore
            link: 'test-link',
            name: 'cosmas',
          },
          followers: 10,
          followings: 2,
          avatar: 'avatar',
          banner: 'banner',
          walletAddress: '324251x464f',
        }}
        infoLink={''}
        numberOfPages={0}
        isbn={''}
        GENRE_OPTIONS={''}
        ageRating={''}
        likes={0}
        explicitContent={false}
        series={[]}
        attributes={[]}
        genres={[]}
        characters={[]}
        {...prop}
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
    const { container } = setup({ visible: true });
    expect(container).toMatchSnapshot();
  });

  it('should test component paints on screen ', () => {
    const { getByTestId, getByText } = setup({ visible: false });
    expect(getByText('test-title')).toBeInTheDocument();
    expect(getByTestId('isomorphic')).toBeInTheDocument();
    expect(getByTestId('my-book-preview-wrapper')).toBeInTheDocument();
    expect(getByTestId('component-slider')).toBeInTheDocument();
  });

  it('should test that the button is clicked ', () => {
    const { getByTestId } = setup();
    const btn = getByTestId('btn');
    expect(onClose).not.toBeCalledWith();
    if (btn) {
      fireEvent.click(btn);
    }
    waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('should have Tab buttons and Pane', () => {
    setup({ visible: true });
    expect(
      queryByAttribute(
        'class',
        document.body,
        'ant-tabs-tab ant-tabs-tab-active'
      )
    ).toBeInTheDocument();
    expect(
      queryAllByAttribute('class', document.body, 'ant-tabs-tab').length
    ).toBe(2);

    expect(
      queryByAttribute(
        'class',
        document.body,
        'ant-tabs-tabpane ant-tabs-tabpane-active'
      )
    ).toBeInTheDocument();
    expect(
      queryAllByAttribute('class', document.body, 'ant-tabs-tabpane').length
    ).toBe(2);
  });

  it('should fire Info Button Click', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-1')?.style
          .display
      ).not.toBe('none');
    });
    await waitFor(() => {
      const btn = queryByAttribute('id', document.body, 'rc-tabs-test-tab-1');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-1')?.style
          .display
      ).not.toBe('none');
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-2')?.style
          .display
      ).toBe('none');
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-3')?.style
          .display
      ).toBe('none');
    });

    await waitFor(() => {
      const btn = queryByAttribute('id', document.body, 'rc-tabs-test-tab-2');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-1')?.style
          .display
      ).toBe('none');
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-2')?.style
          .display
      ).not.toBe('none');
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-3')?.style
          .display
      ).toBe('none');
    });

    await waitFor(() => {
      const btn = queryByAttribute('id', document.body, 'rc-tabs-test-tab-3');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-1')?.style
          .display
      ).toBe('none');
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-2')?.style
          .display
      ).toBe('none');
      expect(
        queryByAttribute('id', document.body, 'rc-tabs-test-panel-3')?.style
          .display
      ).not.toBe('none');
    });
  });
});
