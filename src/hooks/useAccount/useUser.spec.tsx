import { renderHook } from '@testing-library/react-hooks';
import { useAccount } from './index';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ReactChild, ReactChildren } from 'react';

describe('Test hooks: useUser', () => {
  const store = configureMockStore([])({
    app: {
      user: {},
    },
  });
  //create a wrapper

  let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    // @ts-ignore
    <Provider store={store}>{children}</Provider>
  );

  //render hooks from library
  const { result } = renderHook(() => useAccount({ key: 'test-key' }), {
    wrapper: Wrapper,
  });

  const mockUser = result.current.user;
  const mockHandleGet = result.current.handleGetAccount;
  const mockHandleUpdate = result.current.handleUpdateAccount;

  it('return default values', () => {
    expect(mockUser).toBeDefined();
    expect(mockHandleGet).toBeDefined();
    expect(mockHandleUpdate).toBeDefined();
  });
});
