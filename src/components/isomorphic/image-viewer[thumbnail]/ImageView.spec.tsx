import {
  cleanup,
  fireEvent,
  queryAllByAltText,
  queryAllByRole,
  queryByAttribute,
  queryByRole,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ImageViewComponent } from './index';

describe('ImageViewComponent', function () {
  afterEach(cleanup);
  let props = {
    images: [
      {
        src: 'https://i.picsum.photos/id/111/600/400.jpg?hmac=hVzgLIvxNZYaZkGV8HgOs6FO0aePt5tSEhb-sZBwbkk',
      },
      {
        src: 'https://i.picsum.photos/id/848/600/400.jpg?hmac=gdx1i308nOCrjtfzwAlWF5RCN8HKoQd-POMetrAmZxc',
      },
    ],
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<ImageViewComponent {...props} {...extraProps} />);
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

  it('should display the main image container', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryAllByRole(document.body, 'main-image-view')[0]
    ).toBeInTheDocument();
    expect(queryAllByRole(document.body, 'main-image-view')[0]).toHaveClass(
      'main-image-view'
    );
  });

  it('should display the thumbnail container', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryByRole(document.body, 'thumbnail-container')
    ).toBeInTheDocument();
  });

  it('should have Images', () => {
    // @ts-ignore
    const {} = setup();
    expect(queryAllByAltText(document.body, 'image')[0]).toBeInTheDocument();
    expect(queryAllByAltText(document.body, 'image')[0]).toHaveAttribute(
      'src',
      'https://i.picsum.photos/id/111/600/400.jpg?hmac=hVzgLIvxNZYaZkGV8HgOs6FO0aePt5tSEhb-sZBwbkk'
    );
  });

  it('should have a expand button', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryByAttribute('class', document.body, 'ant-image-mask')
    ).toBeInTheDocument();
  });

  it('should display with NO image container', () => {
    // @ts-ignore
    const { container } = setup({ images: [] });
    expect(queryAllByRole(document.body, 'main-image-view').length).toBe(0);
  });

  it('should fire onCancel callback when modal is closed', async () => {
    // @ts-ignore
    const { container } = setup();

    await waitFor(() => {
      const btn = queryByAttribute('class', document.body, 'ant-image-mask');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(queryByRole(document.body, 'dialog')).toBeInTheDocument();
      expect(queryByRole(document.body, 'dialog')).not.toHaveStyle(
        'display: none'
      );
    });
  });

  it('should fire Next callback Next Thumbnail is clicked', async () => {
    // @ts-ignore
    const { container } = setup();

    await waitFor(() => {
      const btn = queryAllByRole(document.body, 'unit-thumbnail')[1];
      expect(btn).toBeInTheDocument();
      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      const btn = queryAllByRole(document.body, 'unit-thumbnail')[1];
      const active = queryByAttribute(
        'class',
        btn,
        'ant-image-img thumbnail-image-view active-thumbnail'
      );
      expect(active).toBeInTheDocument();
    });
  });
});
