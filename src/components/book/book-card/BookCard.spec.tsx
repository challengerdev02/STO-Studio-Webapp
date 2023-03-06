import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BookCard } from './index';

describe('BookCard component', function () {
  afterEach(cleanup);
  let props = {
    title: 'This is a test title',
    author: 'John Doe',
    description: 'This is metacomic',
    imageUrl: '/book-cover.png',
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<BookCard {...props} {...extraProps} />);
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

  it('should test the BookCard component has a display image ', () => {
    const { getByTestId } = setup();
    const displayImg = getByTestId('display-image');
    expect(displayImg).toBeInTheDocument();
    expect(displayImg).toHaveAttribute('src', props.imageUrl);
  });

  it('should test the BookCard component has a title displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('book-title')).toBeInTheDocument();
  });

  it('should test the BookCard component has an author text displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('book-author')).toBeInTheDocument();
  });

  it('should test the BookCard component has a description displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('book-description')).toBeInTheDocument();
  });

  it('should test the Sell button is painted on screen ', () => {
    const { getByRole } = setup();
    const button = getByRole('button', { name: /sell/i });
    expect(button).toBeInTheDocument();
  });

  it('should test the BookCard component has an options component displayed ', () => {
    const { getByTestId } = setup();
    expect(getByTestId('options')).toBeInTheDocument();
  });
});
