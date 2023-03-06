import { UPDATE_BOOK_SALE_SCHEDULE, updateBookSaleSchedule } from './index';

describe('Update Book Sale Schedule Actions', () => {
  it('should dispatch an action to update book sale schedule', () => {
    const bookSaleSchedulePayload = {
      salesType: 'test-title',
      price: 0.03,
      key: '@@create-book-sale-schedule-key',
      loyaltyOnBookSale: 2,
      loyaltySceneSale: 3,
      copiesAvailable: 10,
      onFinish: () => {},
      id: 'test-id',
    };

    const {
      id,
      loyaltyOnBookSale,
      loyaltySceneSale,
      copiesAvailable,
      key,
      onFinish,
      price,
      salesType,
    } = bookSaleSchedulePayload;
    const payload = {
      salesType,
      price,
      copiesAvailable,
      loyaltySceneSale,
      loyaltyOnBookSale,
    };

    const expectedAction = {
      type: UPDATE_BOOK_SALE_SCHEDULE.START,
      meta: {
        payload: payload,
        id,
        key,
        onFinish,
      },
    };
    expect(updateBookSaleSchedule(payload, id, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(UPDATE_BOOK_SALE_SCHEDULE.START).toEqual(
      '@@book/update_book_sale_schedule_START'
    );
    expect(UPDATE_BOOK_SALE_SCHEDULE.END).toEqual(
      '@@book/update_book_sale_schedule_END'
    );
    expect(UPDATE_BOOK_SALE_SCHEDULE.SUCCESS).toEqual(
      '@@book/update_book_sale_schedule_SUCCESS'
    );
    expect(UPDATE_BOOK_SALE_SCHEDULE.ERROR).toEqual(
      '@@book/update_book_sale_schedule_ERROR'
    );
  });
});
