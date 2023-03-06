import { cleanup } from '@testing-library/react';
import ConnectToAuthereum from './index';

const resolvedObject = {
  enable: jest.fn().mockImplementation(() => Promise.resolve('enable')),
};
const rejectObject = {
  enable: jest.fn().mockImplementation(() => Promise.reject('reject')),
};

describe('ConnectToAuthereum', () => {
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
  it('should test async ConnectToAuthereum "Fail"', async () => {
    await expect(
      ConnectToAuthereum({}, { networkName: 'networkName', network: 'network' })
    ).rejects.toThrow('Authereum is not a constructor');
  });

  it('should test async ConnectToAuthereum "Fail" with no options', async () => {
    await expect(ConnectToAuthereum({})).rejects.toThrow(
      'Authereum is not a constructor'
    );
  });

  it('should test async ConnectToAuthereum', async () => {
    await expect(
      ConnectToAuthereum(
        function (params) {
          const getProvider = jest
            .fn()
            .mockImplementation(() => resolvedObject);
          return { getProvider };
        },
        { networkName: 'networkName', network: 'network' }
      )
    ).resolves.toBe(resolvedObject);
  });

  it('should test async ConnectToAuthereum with Constructor to Fail', async () => {
    await expect(
      ConnectToAuthereum(
        function (params) {
          const getProvider = jest.fn().mockImplementation(() => rejectObject);
          return { getProvider };
        },
        { networkName: 'networkName', network: 'network' }
      )
    ).rejects.toBe('reject');
  });
});
