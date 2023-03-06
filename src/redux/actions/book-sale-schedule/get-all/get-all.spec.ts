import { GET_BOOKS_SALE_SCHEDULE, fetchBookSaleSchedules } from './index';

describe('Get Book Actions', () => {
  it('should dispatch an action to get book', () => {
    const booksSaleSchedulePayload = {
      key: '@@delete-book-sale-schedule-key',
      onFinish: () => {},
    };

    const { key, onFinish } = booksSaleSchedulePayload;

    const expectedAction = {
      type: GET_BOOKS_SALE_SCHEDULE.START,
      meta: {
        key,
        onFinish,
      },
    };
    expect(fetchBookSaleSchedules({ key, onFinish })).toEqual(expectedAction);

    expect(GET_BOOKS_SALE_SCHEDULE.START).toEqual(
      '@@book/get_books_sale_schedule_START'
    );
    expect(GET_BOOKS_SALE_SCHEDULE.END).toEqual(
      '@@book/get_books_sale_schedule_END'
    );
    expect(GET_BOOKS_SALE_SCHEDULE.SUCCESS).toEqual(
      '@@book/get_books_sale_schedule_SUCCESS'
    );
    expect(GET_BOOKS_SALE_SCHEDULE.ERROR).toEqual(
      '@@book/get_books_sale_schedule_ERROR'
    );
  });
});
