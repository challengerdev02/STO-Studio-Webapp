import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { CreateCharacter } from './index';
import { Button, Input, Switch } from 'antd';

describe('CreateCharacter', function () {
  afterEach(cleanup);

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(
      <CreateCharacter
        onSubmit={() => {}}
        goBack={() => {}}
        attributes={[{}]}
        loading={false}
        allArtists={[]}
        title={'Create Character'}
        assetDomain={'create'}
        onAttributeModalVisibilityChange={() => {}}
        draggerProps={{}}
        uploadedFile={{}}
        form={{} as any}
        {...extraProps}
      />
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

  it('should test that the page is rendered', function () {
    const { container } = setup();
    expect(container).toBeDefined();
  });

  it('should test the necessary components and texts are in the document', function () {
    const { getByText } = setup();
    expect(getByText('Cover Image')).toBeInTheDocument();
    expect(Button).toBeDefined();
    expect(getByText(/Explicit or sensitive content/i)).toBeInTheDocument();
    expect(Switch.__ANT_SWITCH).toBe(true);
    expect(Input).toBeDefined();
  });
});
