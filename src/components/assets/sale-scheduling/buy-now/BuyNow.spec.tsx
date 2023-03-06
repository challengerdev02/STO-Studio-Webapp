import {
  cleanup,
  queryAllByAttribute,
  queryByPlaceholderText,
  queryByTestId,
  queryByText,
  render,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BuyNow } from './index';
import { Form } from 'antd';

describe('Buy now', function () {
  afterEach(cleanup);

  const setup = () => {
    const utils = render(
      <Form>
        <BuyNow />
      </Form>
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

  it('should test that price changes values', () => {
    // @ts-ignore
    const {} = setup();
    const inputNumber: any = queryByTestId(document.body, 'input-N');
    fireEvent.change(inputNumber, { target: { value: 10 } });
    expect(inputNumber).toBeInTheDocument();
    expect(inputNumber.value).toBe('10.00');
  });

  it('should test that royalty changes values', () => {
    // @ts-ignore
    const {} = setup();
    const inputNumber: any = queryByTestId(document.body, 'royalty-on-sale');
    fireEvent.change(inputNumber, { target: { value: 100 } });
    expect(inputNumber).toBeInTheDocument();
    expect(inputNumber.value).toBe('100.00');
  });

  it('should have date picker ', () => {
    // @ts-ignore
    const {} = setup();
    expect(
      queryAllByAttribute('class', document.body, 'ant-picker')[0]
    ).toBeInTheDocument();
  });
});
