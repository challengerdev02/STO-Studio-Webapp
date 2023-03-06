import { renderHook } from '@testing-library/react-hooks';
import { useBook } from './index';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ReactChild, ReactChildren } from 'react';

describe('Test hooks: useBook', () => {
  const store = configureMockStore([])({
    book: {
      books: {},
      booksById: {},
      book: {},
    },
  });
  //create a wrapper
  let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );

  //render hooks from library
  const { result } = renderHook(() => useBook({ key: 'test-key' }), {
    wrapper: Wrapper,
  });

  const mocBook = result.current.book;
  const mockHandleCreate = result.current.handleCreateBook;
  const mockHandleDelete = result.current.handleDeleteBook;
  const mockHandleFetch = result.current.handleFetchBooks;
  const mockHandleGet = result.current.handleGetBook;
  const mockHandleUpdate = result.current.handleUpdateBook;

  it('return default values', () => {
    expect(mocBook).toBeDefined();
    expect(mockHandleCreate).toBeDefined();
    expect(mockHandleDelete).toBeDefined();
    expect(mockHandleFetch).toBeDefined();
    expect(mockHandleGet).toBeDefined();
    expect(mockHandleUpdate).toBeDefined();
  });
});
