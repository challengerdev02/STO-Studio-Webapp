import { createCharacter } from './create';
import { updateCharacter } from './update';
import { getCharacter } from './get';
import { deleteCharacter } from './delete';
import { fetchCharacters } from './get-all';

export default [
  createCharacter,
  updateCharacter,
  getCharacter,
  deleteCharacter,
  fetchCharacters,
];
