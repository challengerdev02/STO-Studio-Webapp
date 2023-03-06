import {
  cleanup,
  fireEvent,
  queryAllByText,
  queryByAttribute,
  queryByRole,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AttributeModalForm } from './index';

describe('AttributeModalForm', function () {
  afterEach(cleanup);
  let props = {
    visible: false,
    sub_title:
      'Properties show up underneath your item, are clickable, and can be filtered in your collection’s sidebar.',
    types: ['Number', 'Text'],
    title: 'Add Attributes',
    onFinish: jest.fn(),
    onClose: jest.fn(),
    handleCancel: jest.fn(),
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<AttributeModalForm {...props} {...extraProps} />);
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

  it('should have title "Add Attributes"', () => {
    // @ts-ignore
    const {} = setup({ visible: true });
    expect(queryByText(document.body, 'Add Attributes')).toBeInTheDocument();
    expect(queryByText(document.body, 'Add Attributes')).toHaveClass(
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

  it('should have Add more "This is a test for add more"', () => {
    // @ts-ignore
    const {} = setup({ visible: true });
    expect(queryByText(document.body, 'Add More')).toBeInTheDocument();
  });

  it('should fire onFinish callback when modal is closed', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'save-btn');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onFinish).toHaveBeenCalled();
    });
  });

  it('should fire Add More', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'add-more');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(queryAllByText(document.body, 'VALUE')[0]).toBeInTheDocument();
    });
  });
});
