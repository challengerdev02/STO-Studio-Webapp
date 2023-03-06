import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { useEffect } from 'react';
import {
  createBook,
  updateBook,
  deleteBook,
  fetchBooks,
  getBook,
} from '@/actions';
import { BookNamespace } from '@/shared/namespaces/book';

interface UseBook {
  book?: BookNamespace.Book;
  books?: BookNamespace.Book[];
  handleCreateBook: (
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  handleUpdateBook: (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => void;
  handleFetchBooks: (options?: ActionOption) => void;
  handleDeleteBook: (id: string, options?: ActionOption) => void;
  handleGetBook: (id: string, options?: ActionOption) => void;
}

interface UseBookProps {
  key: string;
  autoFetch?: boolean;
  options?: ActionOption;
}

export const useBook = (parameter: UseBookProps): UseBook => {
  const { key, autoFetch = false, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { book } = useSelector((state: RootState) => {
    return {
      book: state.book.book[key] ?? [],
    };
  });

  const handleCreateBook = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      createBook(payload, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleUpdateBook = (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => {
    dispatch(
      updateBook(payload, id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleDeleteBook = (id: string, options?: ActionOption) => {
    dispatch(
      deleteBook(id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleFetchBooks = (options?: ActionOption) => {
    dispatch(
      fetchBooks({
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleGetBook = (id: string, options?: ActionOption) => {
    dispatch(
      getBook(id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  useEffect(() => {
    if (autoFetch) {
      handleFetchBooks({
        key,
      });
    }
  }, [autoFetch]);

  return {
    book,
    handleCreateBook,
    handleDeleteBook,
    handleUpdateBook,
    handleFetchBooks,
    handleGetBook,
  };
};
