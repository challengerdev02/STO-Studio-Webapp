import { cleanup } from '@testing-library/react';
import ConnectToVenly from './index';

const resolveRequest = jest
  .fn()
  .mockImplementation((data) => Promise.resolve('0x1'));
// const rejectRequest = jest.fn().mockRejectedValue(new Error('User Rejected'));
const resolvedObject = { createProviderEngine: resolveRequest };

describe('ConnectToVenly', () => {
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
  it('should test async ConnectToVenly "Fail"', async () => {
    await expect(
      ConnectToVenly({ clientId: '', network: 'network' })
    ).rejects.toThrow('Please provide an Venly client id');
  });

  it('should test async ConnectToVenly', async () => {
    await expect(
      ConnectToVenly({ clientId: 'networkName', network: 'network' })
    ).rejects.toThrow('Failed to login to Venly');
  });

  it('should test async ConnectToVenly with login false', async () => {
    Object.defineProperty(window, 'Venly', {
      writable: true,
      value: resolvedObject,
    });
    await expect(
      ConnectToVenly({
        clientId: 'networkName',
        secretType: 'network',
        environment: 'environment',
        network: 'network',
      })
    ).resolves.toBe('0x1');
  });
});
