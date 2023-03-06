import {
  cleanup,
  fireEvent,
  queryByAttribute,
  queryByPlaceholderText,
  queryByRole,
  queryByTestId,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchDialog } from './index';

describe('SearchDialog', function () {
  afterEach(cleanup);
  let props = {
    visibility: true,
    walletAddress: 'This is a test title',
    onVisibilityChange: jest.fn(),
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<SearchDialog {...props} {...extraProps} />);
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

  it('should display the modal when "visible" is true', () => {
    // @ts-ignore
    const { container } = setup({ visibility: true });
    expect(
      queryByAttribute('class', document.body, 'ant-modal-root')
    ).toBeInTheDocument();
  });

  it('should have placeholde "Item, Collection, Artist, etc."', () => {
    // @ts-ignore
    const {} = setup({ visible: true });
    expect(
      queryByPlaceholderText(document.body, 'Item, Collection, Artist, etc.')
    ).toBeInTheDocument();
  });

  it('should have a close button', () => {
    // @ts-ignore
    const { container } = setup({ visibility: true });
    expect(
      queryByAttribute('aria-label', document.body, 'Close')
    ).toBeInTheDocument();
    expect(queryByAttribute('aria-label', document.body, 'Close')).toHaveClass(
      'ant-modal-close'
    );
  });

  it('should fire onVisibilityChange callback when modal is closed', async () => {
    // @ts-ignore
    const { container } = setup({ visibility: true });

    await waitFor(() => {
      const btn = queryByAttribute('class', document.body, 'mc-close-line');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onVisibilityChange).toHaveBeenCalled();
    });
  });
  it('should fire onVisibilityChange callback when modal is closed On Mask', async () => {
    // @ts-ignore
    const { container } = setup({ visibility: true });

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'Close');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onVisibilityChange).toHaveBeenCalled();
    });
  });

  it('should have a child component with Search by Item, Collection, Artist, etc."', () => {
    // @ts-ignore
    const { container } = setup({ visible: true });
    expect(
      queryByText(document.body, 'Search by Item, Collection, Artist, etc.')
    ).toBeInTheDocument();
  });
});
