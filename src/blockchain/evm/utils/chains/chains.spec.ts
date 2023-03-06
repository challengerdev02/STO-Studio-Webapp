import { cleanup } from '@testing-library/react';
import { Chains } from './index';

describe('Test Chains object', () => {
  afterEach(cleanup);

  const setup = () => {
    return {
      ...Chains,
    };
  };

  it('should test Chains', function () {
    const res = setup();

    expect(res).toBeTruthy();
    expect(res['1'].chainId).toBe(1);
    expect(res['1'].network).toBe('mainnet');
    expect(res['10'].network).toBe('optimism');
    expect(res['10'].chain).toBe('ETH');
    expect(res['4'].networkId).toBe(4);
    expect(res['4'].network).toBe('rinkeby');
  });

  it('should match with snapshot', () => {
    // @ts-ignore

    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
