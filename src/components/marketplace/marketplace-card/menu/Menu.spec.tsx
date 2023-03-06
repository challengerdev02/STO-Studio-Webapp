import {
  cleanup,
  fireEvent,
  queryAllByAttribute,
  queryByAttribute,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DropDownMenu } from './index';

describe('Container', function () {
  afterEach(cleanup);
  let props = {
    menuItems: ['ABC', 'b'],
    onDropDown: jest.fn(),
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<DropDownMenu {...props} {...extraProps} />);
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

  it('should have DropDownMenu "This is a test DropDownMenu"', () => {
    // @ts-ignore
    const { container } = setup();
    expect(
      queryAllByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-default ant-btn-icon-only ant-dropdown-trigger'
      )[0]
    ).toBeInTheDocument();
  });

  it('should fire onDropDown callback when click', async () => {
    // @ts-ignore
    const { container } = setup({ visible: true });

    await waitFor(() => {
      const btn = queryByAttribute(
        'class',
        document.body,
        'ant-btn ant-btn-default'
      );

      if (btn) {
        fireEvent.click(btn);
      }
    });

    await waitFor(() => {
      expect(props.onDropDown).toHaveBeenCalled();
    });
  });
});
