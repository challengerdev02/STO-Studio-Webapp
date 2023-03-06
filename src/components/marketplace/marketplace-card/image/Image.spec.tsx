import {
  cleanup,
  queryByAttribute,
  queryByRole,
  render,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CustomStyledImage, generateStackedImage } from './index';

describe('Container', function () {
  afterEach(cleanup);
  const StackImageReact = ({ urlList }: any) => (
    <>{generateStackedImage(urlList ?? [])}</>
  );
  let props = {
    width: '256px',
    height: '256px',

    hoverable: true,
    urlList: [
      'https://robohash.org/962440efdb9e25e8ff4360a7037acfb4?set=set4&bgset=&size=400x400',
      'https://robohash.org/887f430666b7d04d90b82a4b988df961?set=set4&bgset=&size=400x400',
      'https://robohash.org/15b76d2ec3afc53e3af6c4a316090c94?set=set4&bgset=&size=400x400',
    ],
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<CustomStyledImage {...props} {...extraProps} />);
    return {
      ...utils,
    };
  };

  const setupImage = (extraProps: Record<string, any> = {}) => {
    const StackImageContent = ({ ...props }: { urlList: string[] }) => {
      return (
        <div
          role={'stack-container'}
          style={{ display: 'flex', position: 'relative' }}
        >
          {generateStackedImage(props.urlList)}
        </div>
      );
    };
    const utils = render(<StackImageContent {...props} {...extraProps} />);
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

  it('should have Image "This is a test Image"', () => {
    // @ts-ignore
    const { container } = setup({
      src: 'https://robohash.org/962440efdb9e25e8ff4360a7037acfb4?set=set4&bgset=&size=400x400',
    });
    expect(
      queryByAttribute(
        'src',
        document.body,
        'https://robohash.org/962440efdb9e25e8ff4360a7037acfb4?set=set4&bgset=&size=400x400'
      )
    ).toBeInTheDocument();
  });

  it('should match with snapshot "generateStackedImage"', async () => {
    // @ts-ignore
    const { container } = setupImage();
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should have Image "This is a test Stacked Image"', () => {
    // @ts-ignore
    const { container } = setupImage();
    expect(queryByRole(document.body, 'stack-container')).toBeInTheDocument();
  });
});
