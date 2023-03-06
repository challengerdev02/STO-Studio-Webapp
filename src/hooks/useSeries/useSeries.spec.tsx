import { renderHook } from '@testing-library/react-hooks';
import { useSeries } from './index';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ReactChild, ReactChildren } from 'react';

describe('Test hooks: useSeries', () => {
  const store = configureMockStore([])({
    series: {
      allSeries: {},
      seriesById: {},
      series: {},
    },
  });
  //create a wrapper
  let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );

  //render hooks from library
  const { result } = renderHook(() => useSeries({ key: 'test-key' }), {
    wrapper: Wrapper,
  });

  const mocBook = result.current.series;
  const mockHandleCreate = result.current.handleCreate;
  const mockHandleDelete = result.current.handleDelete;
  const mockHandleFetch = result.current.handleGetAll;
  const mockHandleGet = result.current.handleGet;
  const mockHandleUpdate = result.current.handleUpdate;

  it('return default values', () => {
    expect(mocBook).toBeDefined();
    expect(mockHandleCreate).toBeDefined();
    expect(mockHandleDelete).toBeDefined();
    expect(mockHandleFetch).toBeDefined();
    expect(mockHandleGet).toBeDefined();
    expect(mockHandleUpdate).toBeDefined();
  });
});
