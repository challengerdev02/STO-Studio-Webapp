import { CREATE_BOOK_SALE_SCHEDULE, createBookSaleSchedule } from './index';

describe('Create Book Sale Schedule Actions', () => {
  it('should dispatch an action to create a book sale schedule ', () => {
    const bookSaleSchedulePayload = {
      salesType: 'test-title',
      price: 0.03,
      key: '@@create-book-sale-schedule-key',
      loyaltyOnBookSale: 2,
      loyaltySceneSale: 3,
      copiesAvailable: 10,
      onFinish: () => {},
    };

    const {
      salesType,
      price,
      loyaltyOnBookSale,
      loyaltySceneSale,
      copiesAvailable,
      key,
      onFinish,
    } = bookSaleSchedulePayload;

    const expectedAction = {
      type: CREATE_BOOK_SALE_SCHEDULE.START,
      meta: {
        payload: {
          salesType,
          price,
          loyaltyOnBookSale,
          loyaltySceneSale,
          copiesAvailable,
        },
        key,
        onFinish,
      },
    };
    expect(
      createBookSaleSchedule(
        {
          salesType,
          price,
          loyaltyOnBookSale,
          loyaltySceneSale,
          copiesAvailable,
        },
        { key, onFinish }
      )
    ).toEqual(expectedAction);

    expect(CREATE_BOOK_SALE_SCHEDULE.START).toEqual(
      '@@book/create_book_sale_schedule_START'
    );
    expect(CREATE_BOOK_SALE_SCHEDULE.END).toEqual(
      '@@book/create_book_sale_schedule_END'
    );
    expect(CREATE_BOOK_SALE_SCHEDULE.SUCCESS).toEqual(
      '@@book/create_book_sale_schedule_SUCCESS'
    );
    expect(CREATE_BOOK_SALE_SCHEDULE.ERROR).toEqual(
      '@@book/create_book_sale_schedule_ERROR'
    );
  });
});
