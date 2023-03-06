import { Action } from '../../types';
import {
  CLEAR_SEARCH_ITEMS,
  CREATE_BOOK,
  GET_BOOK,
  GET_BOOKS,
  SEARCH_ITEMS,
  UPDATE_BOOK,
} from '../../actions';
import { arrayToById } from '../../../_shared/utils/helpers';
import { BookNamespace } from '../../../_shared/namespaces/book';

export interface BookReducerState {
  books: Record<string, BookNamespace.Book[]>;
  booksById: Record<string, Record<string, BookNamespace.Book>>;
  book: Record<string, BookNamespace.Book>;
  searchItems: Record<string, BookNamespace.SearchItem>;
}

export const BookDefaultState: BookReducerState = {
  books: {},
  booksById: {},
  book: {},
  searchItems: {},
};

const BookReducer = (state = BookDefaultState, action: Action) => {
  switch (action.type) {
    case CREATE_BOOK.SUCCESS:
      return {
        ...state,
        book: {
          ...state.book,
          [action.key]: action.payload,
        },
      };

    case GET_BOOK.SUCCESS:
      return {
        ...state,
        book: {
          ...state.book,
          [action.key]: action.payload,
        },
      };
    case SEARCH_ITEMS.SUCCESS: {
      let assets = [];
      let accounts = [];
      if (action.virtualized) {
        assets = [
          ...(state.searchItems[action.key].assets ?? []),
          ...(action.payload.assets ?? []),
        ];
        accounts = [
          ...(state.searchItems[action.key].accounts ?? []),
          ...(action.payload.accounts ?? []),
        ];
      } else {
        assets = action.payload.assets;
        accounts = action.payload.accounts;
      }
      return {
        ...state,
        searchItems: {
          ...state.searchItems,
          [action.key]: {
            assets: assets,
            accounts: accounts,
          },
        },
      };
    }
    case CLEAR_SEARCH_ITEMS:
      return {
        ...state,
        searchItems: {
          ...state.searchItems,
          [action.key]: {},
        },
      };
    case GET_BOOKS.SUCCESS: {
      const byId = arrayToById(action?.payload ?? []);

      return {
        ...state,
        booksById: {
          ...state.booksById,
          [action.key]: byId,
        },
        books: {
          ...state.books,
          [action.key]: action.payload ?? [],
        },
      };
    }

    case UPDATE_BOOK.SUCCESS: {
      const books = state.books[action.key] ?? [];

      const index = books.findIndex((o) => o?._id === action.payload?._id);

      let currentBook = {};

      if (index !== -1) {
        currentBook = Object.assign({}, books[index], action.payload);
        books[index] = Object.assign({}, books[index], action.payload);
      } else {
        currentBook = Object.assign({}, action.payload);
        books.push(action.payload);
      }

      const byId = arrayToById(books ?? []);

      return {
        ...state,
        booksById: {
          ...state.booksById,
          [action.key]: byId,
        },
        books: {
          ...state.books,
          [action.key]: books ?? [],
        },
        book: {
          ...state.book,
          [action.key]: currentBook,
        },
      };
    }

    default:
      return state;
  }
};

export default BookReducer;
