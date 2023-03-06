import { cleanup } from '@testing-library/react';
import ConnectToFortmatic from './index';

const resolvedObject = {
  enable: jest.fn().mockImplementation(() => Promise.resolve('enable')),
};

describe('ConnectToFortmatic', () => {
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
  it('should test async ConnectToFortmatic "Fail"', async () => {
    await expect(
      ConnectToFortmatic({}, { key: '', network: 'network' })
    ).rejects.toThrow('Missing Fortmatic key');
  });

  it('should test async ConnectToFortmatic "Fail" with no constructor', async () => {
    await expect(
      ConnectToFortmatic({}, { key: 'xxx', network: 'network' })
    ).rejects.toThrow('Fortmatic is not a constructor');
  });

  it('should test async ConnectToFortmatic', async () => {
    await expect(
      ConnectToFortmatic(
        function (key, network) {
          const getProvider = jest
            .fn()
            .mockImplementation(() => resolvedObject);
          return {
            user: {
              login: jest.fn().mockImplementation(() => Promise.resolve(true)),
              isLoggedIn: jest
                .fn()
                .mockImplementation(() => Promise.resolve(true)),
            },
            getProvider,
          };
        },
        { key: 'networkName', network: 'network' }
      )
    ).resolves.toBe(resolvedObject);
  });

  it('should test async ConnectToFortmatic with login false', async () => {
    await expect(
      ConnectToFortmatic(
        function (key, network) {
          const getProvider = jest
            .fn()
            .mockImplementation(() => resolvedObject);
          return {
            user: {
              login: jest.fn().mockImplementation(() => Promise.resolve(true)),
              isLoggedIn: jest
                .fn()
                .mockImplementation(() => Promise.resolve(false)),
            },
            getProvider,
          };
        },
        { key: 'networkName', network: 'network' }
      )
    ).rejects.toThrow('Failed to login to Fortmatic');
  });
});
