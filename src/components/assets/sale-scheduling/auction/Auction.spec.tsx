import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryByPlaceholderText,
  queryByTestId,
  queryByText,
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Auction } from './index';
import { Form } from 'antd';

describe('Auction', function () {
  afterEach(cleanup);

  const setup = () => {
    const utils = render(
      <Form>
        <Auction />
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

  it('should test that price changes values', () => {
    // @ts-ignore
    const {} = setup();
    const price: any = queryByTestId(document.body, 'price');
    fireEvent.change(price, { target: { value: 100 } });
    expect(price).toBeInTheDocument();
    expect(price.value).toBe('100.00');
  });

  it('should have input "Enter number of copies"', () => {
    // @ts-ignore
    const {} = setup();
    const numberOfCopies = queryByPlaceholderText(
      document.body,
      'Enter number of copies'
    );
    expect(numberOfCopies).toBeInTheDocument();
    expect(numberOfCopies).toHaveClass('ant-input-number-input');
  });

  it('should have date picker ', () => {
    // @ts-ignore
    const {} = setup();
    expect(
      queryAllByAttribute('class', document.body, 'ant-picker')[0]
    ).toBeInTheDocument();
  });
});
