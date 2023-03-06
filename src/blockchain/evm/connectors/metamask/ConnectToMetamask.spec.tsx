import { cleanup } from '@testing-library/react';
import connectToMetamask, { isMetamask } from './index';

const resolveRequest = jest
  .fn()
  .mockImplementation((data) => Promise.resolve('0x1'));
const rejectRequest = jest.fn().mockRejectedValue(new Error('User Rejected'));
const resolvedObject = { request: resolveRequest };
const rejectObject = { request: rejectRequest };

const web3ResolvedObject = { currentProvider: resolveRequest };

describe('connectToMetamask', () => {
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

  it('should test async isMetamask "False"', () => {
    expect(isMetamask()).toBe(false);
  });

  it('should test async connectToMetamask "Fail"', async () => {
    await expect(connectToMetamask()).rejects.toThrow('No Web3 Provider found');
  });

  it('should test async connectToMetamask with web3 "web3ResolvedObject" ', async () => {
    Object.defineProperty(window, 'web3', {
      writable: true,
      value: web3ResolvedObject,
    });
    await expect(connectToMetamask()).resolves.toBe(resolveRequest);
  });

  it('should test async connectToMetamask with ethereum "resolvedObject" ', async () => {
    Object.defineProperty(window, 'ethereum', {
      writable: true,
      value: resolvedObject,
    });
    await expect(connectToMetamask()).resolves.toBe(resolvedObject);
  });

  it('should test async connectToMetamask with ethereum "User Rejected" ', async () => {
    Object.defineProperty(window, 'ethereum', {
      writable: true,
      value: rejectObject,
    });
    await expect(connectToMetamask()).rejects.toThrow('User Rejected');
  });

  it('should test async isMetamask "False"', () => {
    expect(isMetamask()).not.toBe(false);
  });
});
