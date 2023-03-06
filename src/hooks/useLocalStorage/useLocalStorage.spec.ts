import { renderHook } from '@testing-library/react-hooks';
import { useLocalStorage } from './index';

describe('Test hooks: useLocalStorage', () => {
  //create a wrapper
  // let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
  //     <Provider store={store}>{children}</Provider>
  // );

  const customEvents = {};
  const defaultValue = {};
  const key = 'storage-test';
  //render hooks from library
  const { result } = renderHook(
    () => useLocalStorage(key, defaultValue, customEvents)
    // { wrapper: Wrapper }
  );

  it('return default values', () => {
    expect(typeof result.current).toBe('object');
    //@ts-ignore
    expect(result.current.storageKey).toBe('storage-test');
  });
});
