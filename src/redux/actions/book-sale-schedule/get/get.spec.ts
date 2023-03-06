import { GET_BOOK_SALE_SCHEDULE, getBookSaleSchedule } from './index';

describe('Get Book Sale Schedule Actions', () => {
  it('should dispatch an action to get book sale schedule', () => {
    const bookSaleSchedulePayload = {
      id: 'test-id',
      key: '@@delete-book-sale-schedule-key',
      onFinish: () => {},
    };

    const { id, key, onFinish } = bookSaleSchedulePayload;

    const expectedAction = {
      type: GET_BOOK_SALE_SCHEDULE.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };

    expect(getBookSaleSchedule(id, { key, onFinish })).toEqual(expectedAction);

    expect(GET_BOOK_SALE_SCHEDULE.START).toEqual(
      '@@book/get_book_sale_schedule_START'
    );
    expect(GET_BOOK_SALE_SCHEDULE.END).toEqual(
      '@@book/get_book_sale_schedule_END'
    );
    expect(GET_BOOK_SALE_SCHEDULE.SUCCESS).toEqual(
      '@@book/get_book_sale_schedule_SUCCESS'
    );
    expect(GET_BOOK_SALE_SCHEDULE.ERROR).toEqual(
      '@@book/get_book_sale_schedule_ERROR'
    );
  });
});
