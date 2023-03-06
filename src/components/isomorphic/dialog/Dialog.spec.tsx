import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryAllByText,
  queryByAttribute,
  queryByRole,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dialog, { DialogActions } from './index';
import { useRef } from 'react';

describe('MainLayout', function () {
  afterEach(cleanup);
  let dialogRef: any = null;
  const sellFn = jest.fn(),
    reviseFn = jest.fn(),
    cancelFn = jest.fn();
  const content = `Do you want to revise this scene or sell it?`;

  const actions: DialogActions = [
    [
      {
        key: 'sell',
        text: 'Sell',
        type: 'link',
        style: {
          fontWeight: 600,
        },
        onClick: sellFn,
      },
      {
        key: 'revise',
        text: 'Revise',
        type: 'text',
        style: {
          fontWeight: 600,
          fontSize: '1em',
        },
        onClick: reviseFn,
      },
    ],
    {
      key: 'cancel',
      text: 'Cancel',
      type: 'text',
      onClick: cancelFn,
    },
    {
      key: 'ghost',
      text: 'Ghost',
      type: 'ghost',
      onClick: cancelFn,
    },
  ];

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
    dialogRef?.destroy();
    dialogRef = Dialog.show({ content, actions });
  });

  it('should match with snapshot', async () => {
    // @ts-ignore

    await waitFor(() => {
      expect(document.body).toMatchSnapshot();
    });
  });

  it('should display the modal ', async () => {
    // @ts-ignore

    await waitFor(() => {
      expect(queryByRole(document.body, 'dialog')).toBeInTheDocument();
    });
  });

  it('should fire Sell callback', async () => {
    // @ts-ignore

    await waitFor(() => {
      const btn = queryByText(document.body, 'Sell');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(sellFn).toHaveBeenCalled();
    });
  });

  it('should fire Revise callback', async () => {
    // @ts-ignore

    await waitFor(() => {
      const btn = queryByText(document.body, 'Revise');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(reviseFn).toHaveBeenCalled();
    });
  });

  it('should fire onCancel callback when modal is closed', async () => {
    // @ts-ignore

    await waitFor(() => {
      const btn = queryByText(document.body, 'Cancel');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(cancelFn).toHaveBeenCalled();
    });
  });
});
