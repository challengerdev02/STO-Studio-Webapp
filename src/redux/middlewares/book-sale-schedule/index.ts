import { createBookSaleSchedule } from './create';
import { updateBookSaleSchedule } from './update';
import { getBookSaleSchedule } from './get';
import { deleteBookSaleSchedule } from './delete';
import { fetchBooksSaleSchedule } from './get-all';

const exportVar = [
  createBookSaleSchedule,
  updateBookSaleSchedule,
  getBookSaleSchedule,
  deleteBookSaleSchedule,
  fetchBooksSaleSchedule,
];
export default exportVar;
