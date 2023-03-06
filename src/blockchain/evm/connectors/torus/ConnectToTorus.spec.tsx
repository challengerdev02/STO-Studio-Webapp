import { cleanup } from '@testing-library/react';
import ConnectToTorus from './index';

const enableObject = jest
  .fn()
  .mockImplementation(() => Promise.resolve('enable'));
const resolvedObject = {
  enable: enableObject,
};

describe('ConnectToTorus', () => {
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
  it('should test async ConnectToTorus "Fail"', async () => {
    await expect(ConnectToTorus({}, {})).rejects.toThrow(
      'Torus is not a constructor'
    );
  });

  it('should test async ConnectToTorus "No 2" ', async () => {
    await expect(
      ConnectToTorus(
        function (params) {
          const init = jest.fn().mockImplementation((data) => resolvedObject);
          return { provider: resolvedObject, init, login: init };
        },
        {
          networkParams: { host: 'host' },
          network: 'network',
          loginParams: { verifier: '' },
        }
      )
    ).resolves.toBe(resolvedObject);
  });

  it('should test async ConnectToTorus "No 2" ', async () => {
    await expect(
      ConnectToTorus(
        function (params) {
          const init = jest.fn().mockImplementation((data) => resolvedObject);
          return { provider: resolvedObject, init, login: init };
        },
        { networkParams: { host: 'host' }, loginParams: { verifier: '' } }
      )
    ).resolves.toBe(resolvedObject);
  });

  it('should test async ConnectToTorus "No 3" ', async () => {
    await expect(
      ConnectToTorus(
        function (params) {
          const init = jest.fn().mockImplementation((data) => resolvedObject);
          return { provider: resolvedObject, init, login: init };
        },
        { networkParams: { host: 'host' }, loginParams: undefined }
      )
    ).resolves.toBe(resolvedObject);
  });
});
