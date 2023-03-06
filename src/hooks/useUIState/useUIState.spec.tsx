import { renderHook } from '@testing-library/react-hooks';
import { useUIState } from './index';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ReactChild, ReactChildren } from 'react';

describe('Test hooks: useUIState', () => {
  const store = configureMockStore([])({});
  //create a wrapper
  let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );

  //render hooks from library
  const { result } = renderHook(() => useUIState(), { wrapper: Wrapper });

  const mockHandleUIError = result.current.uiErrors;
  const mockHandleLoaduiLoaders = result.current.uiLoaders;

  it('return default values', () => {
    expect(mockHandleUIError).not.toBeDefined();
    expect(mockHandleLoaduiLoaders).not.toBeDefined();
  });
});
