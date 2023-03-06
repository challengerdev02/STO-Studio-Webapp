import { createArtist } from './create';
import { updateArtist } from './update';
import { getArtist } from './get';
import { deleteArtist } from './delete';
import { fetchAllArtists } from './get-all';
const exportVar = [
  createArtist,
  updateArtist,
  getArtist,
  deleteArtist,
  fetchAllArtists,
];
export default exportVar;
