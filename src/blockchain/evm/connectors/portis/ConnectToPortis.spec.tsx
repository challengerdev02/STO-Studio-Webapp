import { cleanup } from '@testing-library/react';
import ConnectToPortis from './index';

const resolvedObject = {
  enable: jest.fn().mockImplementation(() => Promise.resolve('enable')),
};

describe('ConnectToPortis', () => {
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
  it('should test async ConnectToPortis "Fail"', async () => {
    await expect(
      ConnectToPortis({}, { id: '', network: 'network', config: {} })
    ).rejects.toThrow('Missing Portis Id');
  });

  it('should test async ConnectToPortis "Fail" No Config', async () => {
    await expect(
      ConnectToPortis({}, { id: 'xxx', network: 'network', config: {} })
    ).rejects.toThrow('Portis is not a constructor');
  });

  it('should test async ConnectToPortis "Resolves"', async () => {
    await expect(
      ConnectToPortis(
        function (id, network, config) {
          return { provider: resolvedObject };
        },
        { id: 'xxx', network: '', config: {} }
      )
    ).resolves.toBe(resolvedObject);
  });
});
