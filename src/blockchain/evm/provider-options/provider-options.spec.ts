import { cleanup } from '@testing-library/react';
import { providerOptions } from './index';

describe('ProviderOptions object', () => {
  afterEach(cleanup);

  const setup = () => {
    return {
      ...providerOptions,
    };
  };

  it('should test providerOptions', function () {
    const res = setup();

    expect(res).toBeTruthy();
    expect(res.bsc).toBeTruthy();
    expect(res.authereum).toBeTruthy();
    expect(res.fortmatic).toBeTruthy();
    expect(res.frame).toBeTruthy();
    expect(res.portis).toBeTruthy();
  });

  it('should match with snapshot', () => {
    // @ts-ignore
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
