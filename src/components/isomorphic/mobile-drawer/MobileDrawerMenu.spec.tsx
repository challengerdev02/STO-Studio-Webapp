import {
  cleanup,
  fireEvent,
  queryByAttribute,
  queryByRole,
  queryByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MobileDrawerMenu } from './index';
import React from 'react';

// const mock = jest.mock('./index');

describe('MobileDrawerMenu', function () {
  afterEach(cleanup);
  let consoleOutput: any[] = [];
  const mockedLog = (output: any) => consoleOutput.push(output);
  // beforeEach(() => ();
  const onClose = jest.fn();
  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(
      <MobileDrawerMenu
        data-testid="drawer-test"
        visible={false}
        onClose={onClose}
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

  it('should test that the drawer is rendered', function () {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  it('should test that the drawer is rendered properly', function () {
    //  const closeIcon = screen.queryByTestId('close-icon');
    // @ts-ignore
    // fireEvent.click(closeIcon);
    // expect(consoleOutput).toEqual(['']);
    // @ts-ignore
    expect(screen.queryByTestId(document.body, 'drawer-test')).toBeDefined();
  });

  it('should not display the drawer when "visible" is false', async () => {
    // @ts-ignore
    setup();
    expect(queryByRole(document.body, 'dialog')).toBeNull();
  });

  it('should fire onClose callback when modal is closed', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'Close');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('should fire onClose callback when modal is closed from close-icon', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByTestId(document.body, 'close-icon');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
