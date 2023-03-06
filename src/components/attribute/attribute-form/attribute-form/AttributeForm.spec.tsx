import {
  act,
  cleanup,
  fireEvent,
  queryAllByText,
  queryByAttribute,
  queryByLabelText,
  queryByTestId,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AttributeForm } from './index';

describe('AttributeForm', function () {
  afterEach(cleanup);

  let props = {
    sub_title: 'Properties show up underneath',
    types: ['Number', 'Text'],
    title: 'Add Attributes',
    onFinish: jest.fn(),
    form: undefined,
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<AttributeForm {...props} {...extraProps} />);
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

  it('should have sub_title "Properties show up underneath"', () => {
    // @ts-ignore
    const {} = setup({ visible: true });
    expect(queryByLabelText(document.body, 'sub-title')).toBeInTheDocument();
  });

  it('should have Add more "This is a test for add more"', () => {
    // @ts-ignore
    const {} = setup({ visible: true });
    expect(queryByLabelText(document.body, 'add-more')).toBeInTheDocument();
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

  it('should add a new row containing Form-Items when the Add more button is clicked', async () => {
    // @ts-ignore
    const { container, getByTestId } = setup({ visible: true });
    expect(queryByTestId(document.body, 'unit-row')).not.toBeInTheDocument();

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'add-more');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(getByTestId('unit-row')).toBeInTheDocument();
    });
  });

  it('should test that when a new row supposed to contain Form-Items are added, the form items paint on screen', async () => {
    // @ts-ignore
    const { container, getByTestId, getByLabelText } = setup({ visible: true });
    expect(queryByTestId(document.body, 'unit-row')).not.toBeInTheDocument();

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'add-more');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(getByTestId('unit-row')).toBeInTheDocument();
    });

    await waitFor(() => {
      const name = getByLabelText(/name/i);
      expect(name).toBeInTheDocument();

      const value = getByLabelText(/value/i);
      expect(value).toBeInTheDocument();

      const type = getByLabelText(/type/i);
      expect(type).toBeInTheDocument();
    });
  });

  it('should test that when the Form-Items paint on screen, the Form-Items are clickable and fire a change event', async () => {
    // @ts-ignore
    const { container, getByTestId, getByLabelText, getByRole } = setup({
      visible: true,
    });
    expect(queryByTestId(document.body, 'unit-row')).not.toBeInTheDocument();

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'add-more');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(getByTestId('unit-row')).toBeInTheDocument();

      const name = getByLabelText(/name/i);
      expect(name).toBeInTheDocument();

      const value = getByLabelText(/value/i);
      expect(value).toBeInTheDocument();

      const type = getByRole('combobox');
      expect(type).toBeInTheDocument();

      act(() => {
        fireEvent.change(name, {
          target: { value: 'location' },
        });
      });

      act(() => {
        fireEvent.change(value, {
          target: { value: 'Honolulu' },
        });
      });

      act(() => {
        fireEvent.change(type, {
          target: { value: 'text' },
        });
      });
    });

    await waitFor(() => {
      const name = getByLabelText(/name/i);
      expect(name).toHaveAttribute(
        'value',
        expect.stringContaining('location')
      );

      const value = getByLabelText(/value/i);
      expect(value).toHaveAttribute(
        'value',
        expect.stringContaining('Honolulu')
      );
    });
  });

  it('should test that the Remove button is in the document and deletes its unit row when clicked ', async () => {
    // @ts-ignore

    const { container, getByTestId } = setup({ visible: true });
    expect(queryByTestId(document.body, 'unit-row')).not.toBeInTheDocument();

    await waitFor(() => {
      const btn = queryByAttribute('aria-label', document.body, 'add-more');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(getByTestId('unit-row')).toBeInTheDocument();
      expect(
        queryByAttribute('aria-label', document.body, 'remove-row')
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      const removeBtn = queryByAttribute(
        'aria-label',
        document.body,
        'remove-row'
      );

      if (removeBtn) {
        fireEvent.click(removeBtn);
        expect(getByTestId('unit-row')).not.toBeInTheDocument();
      }
    });
  });
});
