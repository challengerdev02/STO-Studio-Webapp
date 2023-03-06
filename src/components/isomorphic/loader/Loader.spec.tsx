import {
  cleanup,
  queryAllByAttribute,
  queryByAttribute,
  queryByRole,
  render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MainLoader } from './index';

describe('MainLoader', function () {
  afterEach(cleanup);

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<MainLoader rate={0.8} {...extraProps} />);
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

  it('should get Rate', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByRole(document.body, '0.8')).toBeInTheDocument();
  });

  it('should have NO Rate', () => {
    // @ts-ignore
    const { container } = setup({ rate: null });
    expect(queryByRole(document.body, '0.8')).not.toBeInTheDocument();
  });

  it('should have NO Props', () => {
    // @ts-ignore
    render(<MainLoader />);
    expect(queryByRole(document.body, '0.8')).not.toBeInTheDocument();
  });

  it('should display the all Loader component', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryAllByAttribute('fill', document.body, '#FCFCFD').length).toBe(
      8
    );
  });

  it('should display the MainLoader', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByAttribute('fill', document.body, 'none')).toBeInTheDocument();
  });
});
