import { cleanup, queryByRole, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IsomorphicUpload } from './index';
import React from 'react';

describe('IsomorphicUpload component', function () {
  afterEach(cleanup);
  let props = {
    children: <div>Upload file</div>,
    draggerProps: {
      action: 'https://test.com',
    },
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<IsomorphicUpload {...props} {...extraProps} />);
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

  it('should Render Upload Component', () => {
    // @ts-ignore
    const { container } = setup();
    expect(queryByRole(document.body, 'button')).toBeInTheDocument();
  });

  it('should Render Upload Component with Children', () => {
    // @ts-ignore
    setup({ children: <p>Hello</p> });
    expect(queryByRole(document.body, 'button')).toBeInTheDocument();
  });

  it('should Render Upload Component with No Children', () => {
    // @ts-ignore
    setup({ children: false });
    expect(queryByRole(document.body, 'button')).toBeInTheDocument();
  });

  it('should Render Upload Component with Crop', () => {
    // @ts-ignore
    const { container } = setup({ allowCrop: true });
    expect(queryByRole(document.body, 'button')).toBeInTheDocument();
  });
});
