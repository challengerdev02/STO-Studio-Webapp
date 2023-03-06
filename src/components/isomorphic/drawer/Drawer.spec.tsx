import {
  cleanup,
  fireEvent,
  queryByAttribute,
  queryByTestId,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IsomorphicDrawer } from './index';

describe('IsomorphicModal', function () {
  afterEach(cleanup);
  let props = {
    visible: true,
    onClose: jest.fn(),
    children: <div data-testid={'modal-test'}>This is a test child</div>,
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<IsomorphicDrawer {...props} {...extraProps} />);
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

  it('should display the drawer when "visible" is true', () => {
    // @ts-ignore
    const { container } = setup({ visible: true });
    expect(
      queryByTestId(document.body, 'drawer-container')
    ).toBeInTheDocument();
    expect(
      queryByTestId(document.body, 'drawer-container')?.classList
    ).toContain('ant-drawer-open');
  });

  it('should have a close button', () => {
    // @ts-ignore
    const { container } = setup({ visible: true });
    expect(
      queryByAttribute('aria-label', document.body, 'Close')
    ).toBeInTheDocument();
    expect(queryByAttribute('aria-label', document.body, 'Close')).toHaveClass(
      'ant-drawer-close'
    );
  });

  it('should fire onClose callback when drawer is closed', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'Close');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  it('should have a child component with class="ant-drawer-body"', () => {
    // @ts-ignore
    const { container } = setup({ visible: true });
    expect(
      queryByAttribute('class', document.body, 'ant-drawer-body')
    ).toBeInTheDocument();
  });
});
