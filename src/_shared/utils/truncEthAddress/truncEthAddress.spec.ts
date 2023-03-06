import { truncateEthAddress } from './index';

describe('truncateEthAddress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be defined', () => {
    const value = truncateEthAddress(
      '0x1234567890123456789012345678901234567890'
    );
    expect(value).toBe('0x1234…7890');
  });

  it('should return address', () => {
    const value = truncateEthAddress('0x1234');
    expect(value).toBe('0x1234');
  });
});
