import { cleanup } from '@testing-library/react';
import ConnectToFrame from './index';

const resolvedObject = {
  isFrameNative: true,
};

describe('ConnectToFrame', () => {
  afterEach(cleanup);

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
  it('should test async ConnectToFrame "Fail"', async () => {
    await expect(ConnectToFrame({})).rejects.toThrow(
      'ethProvider is not a function'
    );
  });

  it('should test async ConnectToFrame', async () => {
    await expect(
      ConnectToFrame(function (data) {
        return resolvedObject;
      })
    ).resolves.toBe(resolvedObject);
  });
});
