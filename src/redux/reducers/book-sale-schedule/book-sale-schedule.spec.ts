import BookSaleScheduleReducer, {
  BookSaleScheduleDefaultState as defaultState,
} from './index';
import { arrayToById } from '../../../_shared/utils';
import {
  CREATE_BOOK_SALE_SCHEDULE,
  GET_BOOK_SALE_SCHEDULE,
  GET_BOOKS_SALE_SCHEDULE,
} from '@/actions';

describe('Reducer: Books Sale Schedule', () => {
  it('Should return list of books sale schedules', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const byIdFind = arrayToById(mockPayload || []);

    const mockAction = {
      type: GET_BOOKS_SALE_SCHEDULE.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      booksSaleScheduleById: {
        ...defaultState.booksSaleScheduleById,
        [mockAction.key]: byIdFind,
      },
      booksSaleSchedule: {
        ...defaultState.booksSaleSchedule,
        [mockAction.key]: mockAction.payload,
      },
    };
    expect(BookSaleScheduleReducer(defaultState, mockAction)).toEqual(
      expectedResult
    );
  });

  it('Should get a book sale schedule', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];
    const mockAction = {
      type: GET_BOOK_SALE_SCHEDULE.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };

    const expectedResult = {
      ...defaultState,
      bookSaleSchedule: {
        ...defaultState.bookSaleSchedule,
        [mockAction.key]: mockAction.payload,
      },
    };
    expect(BookSaleScheduleReducer(defaultState, mockAction)).toEqual(
      expectedResult
    );
  });

  it('Should Create a book sale schedule', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const mockAction = {
      type: CREATE_BOOK_SALE_SCHEDULE.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      bookSaleSchedule: {
        ...defaultState.bookSaleSchedule,
        [mockAction.key]: mockAction.payload,
      },
    };

    expect(BookSaleScheduleReducer(defaultState, mockAction)).toEqual(
      expectedResult
    );
  });

  it('should return initial state when there is no action', () => {
    expect(BookSaleScheduleReducer(defaultState, { type: '' })).toEqual(
      defaultState
    );
  });
});
