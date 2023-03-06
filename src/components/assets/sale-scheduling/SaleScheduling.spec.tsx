import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryByAttribute,
  queryByPlaceholderText,
  queryByText,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SaleScheduling } from './index';

describe('SaleScheduling', function () {
  afterEach(cleanup);

  let props = {
    loading: true,
    title: 'Spider man: Home coming',
    selectedForm: 'Buy',
    onFormTypeChange: jest.fn(),
    onFinish: jest.fn(),
    onCancel: jest.fn(),
    children: <div data-testid={'modal-test'}>This is a test child</div>,
  };
  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<SaleScheduling {...props} {...extraProps} />);
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

  it('should have form tag', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryByAttribute(
        'class',
        document.body,
        'ant-form ant-form-vertical ant-form-hide-required-mark'
      )
    ).toHaveAttribute('id', 'sale-scheduling-form');
  });
  it('should have form radio tag', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryAllByAttribute('type', document.body, 'radio')[0]
    ).toBeChecked();
  });
  it('should have title "Spider man: Home coming"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryByText(document.body, 'Spider man: Home coming')
    ).toBeInTheDocument();
  });

  it('should have title "copies available "', () => {
    // @ts-ignore
    const {} = setup();
    expect(queryByText(document.body, 'copies available')).toBeInTheDocument();
  });

  it('should have title "Price (ETHER)"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByText(document.body, 'Price (ETHER)')).toBeInTheDocument();
  });

  it('should have input "Enter number of copies"', () => {
    // @ts-ignore
    const {} = setup();
    expect(
      queryByPlaceholderText(document.body, 'Enter number of copies')
    ).toBeInTheDocument();
    expect(
      queryByPlaceholderText(document.body, 'Enter number of copies')
    ).toHaveClass('ant-input-number-input');
  });

  // it('should have input "You will be charged 2 ETH"', () => {
  //   // @ts-ignore
  //   const {} = setup();
  //   expect(
  //     queryByText(document.body, 'You will be charged 2 ETH')
  //   ).toBeInTheDocument();
  // });

  it('should have date picker ', () => {
    // @ts-ignore
    const {} = setup();
    expect(
      queryAllByAttribute('class', document.body, 'ant-picker')
    ).toHaveLength(1);
  });
  it('should have date picker panel', async () => {
    // @ts-ignore
    const {} = setup();
    await waitFor(() => {
      const input = queryAllByAttribute(
        'id',
        document.body,
        'sale-scheduling-form_startDate'
      )[0];

      if (input) {
        fireEvent.mouseDown(input);
      }
    });

    await waitFor(() => {
      expect(
        queryAllByAttribute('class', document.body, 'ant-picker')
      ).toHaveLength(1);
      expect(
        queryAllByAttribute(
          'class',
          document.body,
          'ant-picker-panel-container'
        )
      ).toHaveLength(1);
    });
  });

  it('should Not have Auto saving ', () => {
    // @ts-ignore
    const {} = setup({ loading: false });
    expect(queryByText(document.body, 'Auto saving')).not.toBeInTheDocument();
  });

  it('should have submit button ', () => {
    // @ts-ignore
    const {} = setup();
    expect(
      queryByAttribute('type', document.body, 'submit')
    ).toBeInTheDocument();
    expect(queryByAttribute('type', document.body, 'submit')).toContainHTML(
      `<span>Schedule Sale </span>`
    );
  });

  it('should show aution form', async () => {
    // @ts-ignore
    const { container } = setup({ selectedForm: 'Auction' });

    await waitFor(() => {
      const btn = queryByAttribute('value', document.body, 'Auction');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      const btn = queryByAttribute('value', document.body, 'Auction');
      expect(btn).toBeInTheDocument();
      expect(
        queryAllByAttribute('type', document.body, 'radio')[1]
      ).toBeChecked();
      expect(queryByText(document.body, 'duration')).toBeInTheDocument();
      expect(queryByAttribute('type', document.body, 'submit')).toContainHTML(
        `<span>Schedule Sale </span>`
      );
    });
  });

  it('should show Launch Event form', async () => {
    // @ts-ignore
    const { container } = setup({ selectedForm: 'Launch' });

    await waitFor(() => {
      const btn = queryByAttribute('value', document.body, 'Launch');

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(
        queryAllByAttribute('type', document.body, 'radio')[2]
      ).toBeChecked();
      expect(queryByText(document.body, 'phone number')).toBeInTheDocument();
      expect(queryByAttribute('type', document.body, 'submit')).toContainHTML(
        `<span>Schedule Launch </span>`
      );
    });
  });
});
