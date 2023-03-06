import { cleanup } from '@testing-library/react';
import { Web3ProvidersInfo } from './index';

describe('Test Web3ProvidersInfo object', () => {
  afterEach(cleanup);

  const setup = () => {
    return {
      ...Web3ProvidersInfo,
    };
  };

  it('should test Web3ProvidersInfo', function () {
    const res = setup();

    expect(res).toBeTruthy();
    expect(res['bsc'].check).toBe('isBinanceChainWallet');
    expect(res['bsc'].id).toBe('bsc');
    expect(res['fortmatic'].id).toBe('fortmatic');
    expect(res['fortmatic'].type).toBe('web');
    expect(res['authereum'].name).toEqual('Authereum');
  });

  it('should match with snapshot', () => {
    // @ts-ignore
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
