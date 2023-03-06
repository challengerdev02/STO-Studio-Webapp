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
import { LaunchEvent } from './index';
import { Form } from 'antd';

describe('LaunchEvent', function () {
  afterEach(cleanup);

  const setup = () => {
    const utils = render(
      <Form>
        <LaunchEvent />
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

  it('should have title "Proposed launch price"', () => {
    // @ts-ignore
    const { container } = setup();

    const price: any = queryByTestId(document.body, 'proposed-price');
    fireEvent.change(price, { target: { value: 100 } });
    expect(price).toBeInTheDocument();
    expect(price.value).toBe('100.00');
    expect(
      queryByText(document.body, 'Proposed launch price')
    ).toBeInTheDocument();
  });

  it('should test email field', () => {
    // @ts-ignore
    const { container } = setup();

    const email: any = queryByTestId(document.body, 'email');
    fireEvent.change(email, { target: { value: 'cosmas@gmail.com' } });
    expect(email).toBeInTheDocument();
    expect(email.value).toBe('cosmas@gmail.com');
    expect(
      queryByText(document.body, 'Proposed launch price')
    ).toBeInTheDocument();
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

  it('should have date picker ', () => {
    // @ts-ignore
    const {} = setup();
    expect(
      queryAllByAttribute('class', document.body, 'ant-picker')[0]
    ).toBeInTheDocument();
  });
});
