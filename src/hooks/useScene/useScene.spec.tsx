import { renderHook } from '@testing-library/react-hooks';
import { useScene } from './index';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ReactChild, ReactChildren } from 'react';

describe('Test hooks: useScene', () => {
  const store = configureMockStore([])({
    scene: {
      scenes: {},
      scenesById: {},
      scene: {},
    },
  });
  //create a wrapper
  let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );

  //render hooks from library
  const { result } = renderHook(() => useScene({ key: 'test-key' }), {
    wrapper: Wrapper,
  });

  const mocBook = result.current.scene;
  const mockHandleCreate = result.current.handleCreateScene;
  const mockHandleDelete = result.current.handleDeleteScene;
  const mockHandleFetch = result.current.handleFetchScenes;
  const mockHandleGet = result.current.handleGetScene;
  const mockHandleUpdate = result.current.handleUpdateScene;

  it('return default values', () => {
    expect(mocBook).toBeDefined();
    expect(mockHandleCreate).toBeDefined();
    expect(mockHandleDelete).toBeDefined();
    expect(mockHandleFetch).toBeDefined();
    expect(mockHandleGet).toBeDefined();
    expect(mockHandleUpdate).toBeDefined();
  });
});
