import {
  cleanup,
  fireEvent,
  queryByAttribute,
  queryByRole,
  queryByTestId,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IsomorphicModal } from './index';

describe('IsomorphicModal', function () {
  afterEach(cleanup);
  let props = {
    visible: false,
    title: 'This is a test title',
    onCancel: jest.fn(),
    children: <div data-testid={'modal-test'}>This is a test child</div>,
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<IsomorphicModal {...props} {...extraProps} />);
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

  it('should not display the modal when "visible" is false', async () => {
    // @ts-ignore
    setup();
    expect(queryByRole(document.body, 'dialog')).toBeNull();
  });

  it('should display the modal when "visible" is true', () => {
    // @ts-ignore
    const { container } = setup({ visible: true });
    expect(queryByRole(document.body, 'dialog')).toBeInTheDocument();
    expect(queryByRole(document.body, 'dialog')).not.toHaveStyle(
      'display: none'
    );
  });

  it('should have title "This is a test title"', () => {
    // @ts-ignore
    const {} = setup({ visible: true });
    expect(
      queryByText(document.body, 'This is a test title')
    ).toBeInTheDocument();
    expect(queryByText(document.body, 'This is a test title')).toHaveClass(
      'ant-modal-title'
    );
  });

  it('should have a close button', () => {
    // @ts-ignore
    const { container } = setup({ visible: true });
    expect(
      queryByAttribute('aria-label', document.body, 'Close')
    ).toBeInTheDocument();
    expect(queryByAttribute('aria-label', document.body, 'Close')).toHaveClass(
      'ant-modal-close'
    );
  });

  it('should fire onCancel callback when modal is closed', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'Close');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onCancel).toHaveBeenCalled();
    });
  });

  it('should have a child component with data-testid="modal-test"', () => {
    // @ts-ignore
    const { container } = setup({ visible: true });
    expect(queryByTestId(document.body, 'modal-test')).toBeInTheDocument();
  });
});
