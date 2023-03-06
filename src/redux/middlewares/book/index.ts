import { createBook } from './create';
import { updateBook } from './update';
import { getBook } from './get';
import { deleteBook } from './delete';
import { searchItems } from './search';
import { fetchBooks } from './get-all';

const exportVar = [
  createBook,
  updateBook,
  getBook,
  deleteBook,
  fetchBooks,
  searchItems,
];
export default exportVar;
