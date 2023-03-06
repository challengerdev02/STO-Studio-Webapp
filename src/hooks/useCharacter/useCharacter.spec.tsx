import { renderHook } from '@testing-library/react-hooks';
import { useCharacter } from './index';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ReactChild, ReactChildren } from 'react';

describe('Test hooks: useCharacter', () => {
  const store = configureMockStore([])({
    character: {
      characters: {},
      charactersById: {},
      character: {},
    },
  });
  //create a wrapper
  let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );

  //render hooks from library
  const { result } = renderHook(() => useCharacter({ key: 'test-key' }), {
    wrapper: Wrapper,
  });

  const mocBook = result.current.character;
  const mockHandleCreate = result.current.handleCreateCharacter;
  const mockHandleDelete = result.current.handleDeleteCharacter;
  const mockHandleFetch = result.current.handleFetchCharacters;
  const mockHandleGet = result.current.handleGetCharacter;
  const mockHandleUpdate = result.current.handleUpdateCharacter;

  it('return default values', () => {
    expect(mocBook).toBeDefined();
    expect(mockHandleCreate).toBeDefined();
    expect(mockHandleDelete).toBeDefined();
    expect(mockHandleFetch).toBeDefined();
    expect(mockHandleGet).toBeDefined();
    expect(mockHandleUpdate).toBeDefined();
  });
});
