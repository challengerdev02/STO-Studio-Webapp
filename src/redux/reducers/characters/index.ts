import { Action } from '../../types';
import {
  CREATE_CHARACTER,
  GET_CHARACTERS,
  GET_CHARACTER,
  UPDATE_CHARACTER,
} from '@/actions';
import { arrayToById } from '@/shared/utils';
import { BookNamespace } from '@/shared/namespaces/book';

export interface CharacterReducerState {
  characters: Record<string, BookNamespace.Character[]>;
  charactersById: Record<string, Record<string, BookNamespace.Character>>;
  character: Record<string, BookNamespace.Character>;
}

export const CharacterDefaultState: CharacterReducerState = {
  characters: {},
  charactersById: {},
  character: {},
};

const CharacterReducer = (state = CharacterDefaultState, action: Action) => {
  switch (action.type) {
    case CREATE_CHARACTER.SUCCESS:
      return {
        ...state,
        character: {
          ...state.character,
          [action.key]: action.payload,
        },
      };

    case GET_CHARACTER.SUCCESS:
      return {
        ...state,
        character: {
          ...state.character,
          [action.key]: action.payload,
        },
      };

    case GET_CHARACTERS.SUCCESS: {
      const byId = arrayToById(action?.payload ?? []);

      return {
        ...state,
        charactersById: {
          ...state.charactersById,
          [action.key]: byId,
        },
        characters: {
          ...state.characters,
          [action.key]: action.payload ?? [],
        },
      };
    }

    case UPDATE_CHARACTER.SUCCESS: {
      const characters = state.characters[action.key] ?? [];

      const index = characters.findIndex((o) => o?._id === action.payload?._id);

      let currentCharacter = {};

      if (index !== -1) {
        currentCharacter = Object.assign({}, characters[index], action.payload);
        characters[index] = Object.assign(
          {},
          characters[index],
          action.payload
        );
      } else {
        currentCharacter = Object.assign({}, action.payload);
        characters.push(action.payload);
      }

      const byId = arrayToById(characters ?? []);

      return {
        ...state,
        charactersById: {
          ...state.charactersById,
          [action.key]: byId,
        },
        characters: {
          ...state.characters,
          [action.key]: characters ?? [],
        },
        character: {
          ...state.character,
          [action.key]: currentCharacter,
        },
      };
    }

    default:
      return state;
  }
};

export default CharacterReducer;
