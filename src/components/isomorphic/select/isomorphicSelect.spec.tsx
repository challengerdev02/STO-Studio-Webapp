import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IsomorphicSelect } from './index';

describe('Isomorphic select component', function () {
  afterEach(cleanup);

  const setup = () => {
    const utils = render(<IsomorphicSelect />);
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

  it('should check that the Isomorpic select component displays', () => {
    const { getByTestId } = setup();

    expect(getByTestId('isomorphic-select')).toBeInTheDocument();
  });
});
