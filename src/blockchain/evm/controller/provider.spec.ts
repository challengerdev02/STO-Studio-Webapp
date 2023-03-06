import { cleanup } from '@testing-library/react';
import { Web3Controller } from './index';

describe('Web3Controller', () => {
  afterEach(cleanup);
  let options = {
    providerOptions: {},
    network: 'test-network',
  };

  it('defines getConnector() to check that the class was instantiated', () => {
    const $web3Controller = new Web3Controller(options);
    const $web3ControllerProto = Object.getPrototypeOf($web3Controller);
    expect(typeof $web3ControllerProto.getConnector).toBe('function');
  });

  it('should check connect() is called with an argument', () => {
    let providerName = 'test-provider-name';
    const $web3Controller = new Web3Controller(options);

    const connectorMock = jest.spyOn($web3Controller, 'connect');

    const result = $web3Controller.connect(providerName);

    // Check the spy if the method was called correctly.
    expect(connectorMock).toHaveBeenCalledWith(providerName);
    expect(typeof result).toBe('object');

    connectorMock.mockClear();
  });
});
