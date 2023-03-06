import { renderHook } from '@testing-library/react-hooks';
import { useTheme } from './index';

describe('Test hooks: useTheme', () => {
  //render hooks from library
  const { result } = renderHook(() => useTheme());

  const mockHandleChange = result.current.change;
  const mockHandleLoad = result.current.loadAndObserve;

  it('return default values', () => {
    const mockHandleChangeJest = jest.fn(mockHandleChange).mockReturnValue();
    const mockHandleLoadJest = jest.fn(mockHandleLoad).mockReturnValue();
    expect(mockHandleChangeJest).toBeDefined();
    expect(mockHandleLoadJest).toBeDefined();
    expect(result).toBeDefined();
  });

  it('should test the return values', () => {
    expect(result.current.value).toEqual(null);
    expect(typeof mockHandleChange).toEqual('function');
    expect(typeof mockHandleLoad).toEqual('function');
  });
});
