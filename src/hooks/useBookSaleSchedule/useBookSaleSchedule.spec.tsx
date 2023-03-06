import { renderHook } from '@testing-library/react-hooks';
import { useBookSaleSchedule } from './index';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ReactChild, ReactChildren } from 'react';

describe('Test hooks: useBookSaleSchedule', () => {
  const store = configureMockStore([])({
    bookSaleSchedule: {
      booksSaleSchedule: {},
      booksSaleScheduleById: {},
      bookSaleSchedule: {},
    },
  });
  //create a wrapper
  let Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );

  //render hooks from library
  const { result } = renderHook(
    () => useBookSaleSchedule({ key: 'test-key' }),
    { wrapper: Wrapper }
  );

  const mocBookSaleSchedule = result.current.bookSaleSchedule;
  const mockHandleCreate = result.current.handleCreateBookSaleSchedule;
  const mockHandleDelete = result.current.handleDeleteBookSaleSchedule;
  const mockHandleFetch = result.current.handleFetchBookSaleSchedules;
  const mockHandleGet = result.current.handleGetBookSaleSchedule;
  const mockHandleUpdate = result.current.handleUpdateBookSaleSchedule;

  it('return default values', () => {
    expect(mocBookSaleSchedule).toBeDefined();
    expect(mockHandleCreate).toBeDefined();
    expect(mockHandleDelete).toBeDefined();
    expect(mockHandleFetch).toBeDefined();
    expect(mockHandleGet).toBeDefined();
    expect(mockHandleUpdate).toBeDefined();
  });
});
