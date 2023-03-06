import { DELETE_BOOK_SALE_SCHEDULE, deleteBookSaleSchedule } from './index';

describe('Delete Book Sale Schedule Actions', () => {
  it('should dispatch an action to delete bok sale schedule actions', () => {
    const bookSaleSchedulePayload = {
      id: 'test-id',
      key: '@@delete-book-sale-schedule-key',
      onFinish: () => {},
    };

    const { id, key, onFinish } = bookSaleSchedulePayload;

    const expectedAction = {
      type: DELETE_BOOK_SALE_SCHEDULE.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(deleteBookSaleSchedule(id, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(DELETE_BOOK_SALE_SCHEDULE.START).toEqual(
      '@@book/delete_book_sale_schedule_START'
    );

    expect(DELETE_BOOK_SALE_SCHEDULE.END).toEqual(
      '@@book/delete_book_sale_schedule_END'
    );
    expect(DELETE_BOOK_SALE_SCHEDULE.SUCCESS).toEqual(
      '@@book/delete_book_sale_schedule_SUCCESS'
    );
    expect(DELETE_BOOK_SALE_SCHEDULE.ERROR).toEqual(
      '@@book/delete_book_sale_schedule_ERROR'
    );
  });
});
