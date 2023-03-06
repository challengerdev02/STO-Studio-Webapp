import BookReducer, { BookDefaultState as defaultState } from './index';
import { arrayToById } from '../../../_shared/utils';
import { CREATE_BOOK, GET_BOOK, GET_BOOKS } from '@/actions';

describe('Reducer: Books', () => {
  it('Should return list of books', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const byIdFind = arrayToById(mockPayload || []);

    const mockAction = {
      type: GET_BOOKS.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      booksById: {
        ...defaultState.booksById,
        [mockAction.key]: byIdFind,
      },
      books: {
        ...defaultState.books,
        [mockAction.key]: mockAction.payload,
      },
    };
    expect(BookReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should get a book', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];
    const mockAction = {
      type: GET_BOOK.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };

    const expectedResult = {
      ...defaultState,
      book: {
        ...defaultState.book,
        [mockAction.key]: mockAction.payload,
      },
    };
    expect(BookReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should Create a book', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const mockAction = {
      type: CREATE_BOOK.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      book: {
        ...defaultState.book,
        [mockAction.key]: mockAction.payload,
      },
    };

    expect(BookReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('should return initial state when there is no action', () => {
    expect(BookReducer(defaultState, { type: '' })).toEqual(defaultState);
  });
});
