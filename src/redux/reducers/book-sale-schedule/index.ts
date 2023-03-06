import { Action } from '../../types';
import {
  CREATE_BOOK_SALE_SCHEDULE,
  GET_BOOKS_SALE_SCHEDULE,
  GET_BOOK_SALE_SCHEDULE,
  UPDATE_BOOK_SALE_SCHEDULE,
} from '../../actions';
import { arrayToById } from '../../../_shared/utils/helpers';
import { BookSaleScheduleNamespace } from '../../../_shared/namespaces/book-sale-schedule';

export interface BookSaleScheduleReducerState {
  booksSaleSchedule: Record<
    string,
    BookSaleScheduleNamespace.BookSaleSchedule[]
  >;
  booksSaleScheduleById: Record<
    string,
    Record<string, BookSaleScheduleNamespace.BookSaleSchedule>
  >;
  bookSaleSchedule: Record<string, BookSaleScheduleNamespace.BookSaleSchedule>;
}

export const BookSaleScheduleDefaultState: BookSaleScheduleReducerState = {
  booksSaleSchedule: {},
  booksSaleScheduleById: {},
  bookSaleSchedule: {},
};

const BookSaleScheduleReducer = (
  state = BookSaleScheduleDefaultState,
  action: Action
) => {
  switch (action.type) {
    case CREATE_BOOK_SALE_SCHEDULE.SUCCESS:
      return {
        ...state,
        bookSaleSchedule: {
          ...state.bookSaleSchedule,
          [action.key]: action.payload,
        },
      };

    case GET_BOOK_SALE_SCHEDULE.SUCCESS:
      return {
        ...state,
        bookSaleSchedule: {
          ...state.bookSaleSchedule,
          [action.key]: action.payload,
        },
      };

    case GET_BOOKS_SALE_SCHEDULE.SUCCESS: {
      const byId = arrayToById(action?.payload ?? []);

      return {
        ...state,
        booksSaleScheduleById: {
          ...state.booksSaleScheduleById,
          [action.key]: byId,
        },
        booksSaleSchedule: {
          ...state.booksSaleSchedule,
          [action.key]: action.payload ?? [],
        },
      };
    }

    case UPDATE_BOOK_SALE_SCHEDULE.SUCCESS: {
      const booksSaleSchedule = state.booksSaleSchedule[action.key] ?? [];

      const index = booksSaleSchedule.findIndex(
        (o) => o?._id === action.payload?._id
      );

      let currentBookSaleSchedule = {};

      if (index !== -1) {
        currentBookSaleSchedule = Object.assign(
          {},
          booksSaleSchedule[index],
          action.payload
        );
        booksSaleSchedule[index] = Object.assign(
          {},
          booksSaleSchedule[index],
          action.payload
        );
      } else {
        currentBookSaleSchedule = Object.assign({}, action.payload);
        booksSaleSchedule.push(action.payload);
      }

      const byId = arrayToById(booksSaleSchedule ?? []);

      return {
        ...state,
        booksSaleScheduleById: {
          ...state.booksSaleScheduleById,
          [action.key]: byId,
        },
        booksSaleSchedule: {
          ...state.booksSaleSchedule,
          [action.key]: booksSaleSchedule ?? [],
        },
        bookSaleSchedule: {
          ...state.bookSaleSchedule,
          [action.key]: currentBookSaleSchedule,
        },
      };
    }

    default:
      return state;
  }
};

export default BookSaleScheduleReducer;
