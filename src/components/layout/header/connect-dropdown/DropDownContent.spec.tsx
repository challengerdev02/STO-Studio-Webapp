import {
  cleanup,
  fireEvent,
  queryAllByRole,
  queryAllByText,
  queryByRole,
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DropDownContent } from './index';

describe('HybridHeaderComponent', function () {
  afterEach(cleanup);
  const logout = jest.fn();
  let props = {
    //   simulateMobile: false,
    // onFinish : jest.fn(),
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(
      <div {...props} {...extraProps}>
        <DropDownContent logout={logout} />
      </div>
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

  it('should display the dd-container', async () => {
    // @ts-ignore
    setup();
    expect(queryByRole(document.body, 'dd-container')).toBeInTheDocument();
  });

  it('should display the header divider', async () => {
    // @ts-ignore
    setup();
    expect(queryAllByRole(document.body, 'separator').length).toBe(3);
  });

  it('should display the header link', async () => {
    // @ts-ignore
    setup();
    expect(queryAllByText(document.body, 'Resource Center').length).toBe(1);
  });

  it('should display the other header links', async () => {
    // @ts-ignore
    setup();
    expect(queryAllByText(document.body, 'My Books').length).toBe(1);
    expect(queryAllByText(document.body, 'My Collections').length).toBe(1);
  });

  it('should logout', async () => {
    // @ts-ignore
    setup();
    const logoutButton = queryAllByText(document.body, 'Log out')[0];
    fireEvent.click(logoutButton);
    expect(logout).toHaveBeenCalled();
  });
});
