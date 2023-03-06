import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { useEffect } from 'react';
import {
  createBookSaleSchedule,
  updateBookSaleSchedule,
  deleteBookSaleSchedule,
  fetchBookSaleSchedules,
  getBookSaleSchedule,
} from '@/actions';
import { BookSaleScheduleNamespace } from '@/shared/namespaces/book-sale-schedule';

interface UseBookSaleSchedule {
  bookSaleSchedule?: BookSaleScheduleNamespace.BookSaleSchedule;
  bookSaleSchedules?: BookSaleScheduleNamespace.BookSaleSchedule[];
  handleCreateBookSaleSchedule: (
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  handleUpdateBookSaleSchedule: (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => void;
  handleFetchBookSaleSchedules: (options?: ActionOption) => void;
  handleDeleteBookSaleSchedule: (id: string, options?: ActionOption) => void;
  handleGetBookSaleSchedule: (id: string, options?: ActionOption) => void;
}

interface UseBookSaleScheduleProps {
  key: string;
  autoFetch?: boolean;
  options?: ActionOption;
}

export const useBookSaleSchedule = (
  parameter: UseBookSaleScheduleProps
): UseBookSaleSchedule => {
  const { key, autoFetch = false, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { bookSaleSchedule, bookSaleSchedules } = useSelector(
    (state: RootState) => {
      return {
        bookSaleSchedule: state.bookSaleSchedule.bookSaleSchedule[key] ?? [],
        bookSaleSchedules: state.bookSaleSchedule.booksSaleSchedule[key] ?? [],
      };
    }
  );

  const handleCreateBookSaleSchedule = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      createBookSaleSchedule(payload, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleUpdateBookSaleSchedule = (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => {
    dispatch(
      updateBookSaleSchedule(payload, id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleDeleteBookSaleSchedule = (id: string, options?: ActionOption) => {
    dispatch(
      deleteBookSaleSchedule(id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleFetchBookSaleSchedules = (options?: ActionOption) => {
    dispatch(
      fetchBookSaleSchedules({
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  const handleGetBookSaleSchedule = (id: string, options?: ActionOption) => {
    dispatch(
      getBookSaleSchedule(id, {
        ...defaultOptions,
        ...options,
        key,
      })
    );
  };

  useEffect(() => {
    if (autoFetch) {
      handleFetchBookSaleSchedules({
        key,
      });
    }
  }, [autoFetch]);

  return {
    bookSaleSchedule,
    bookSaleSchedules,
    handleCreateBookSaleSchedule,
    handleDeleteBookSaleSchedule,
    handleUpdateBookSaleSchedule,
    handleFetchBookSaleSchedules,
    handleGetBookSaleSchedule,
  };
};
