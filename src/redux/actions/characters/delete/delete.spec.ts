import { DELETE_CHARACTER, deleteCharacter } from './index';

describe('Delete Character Actions', () => {
  it('should dispatch an action to delete character', () => {
    const characterPayload = {
      id: 'test-id',
      key: '@@delete-character-key',
      onFinish: () => {},
    };

    const { id, key, onFinish } = characterPayload;

    const expectedAction = {
      type: DELETE_CHARACTER.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(deleteCharacter(id, { key, onFinish })).toEqual(expectedAction);

    expect(DELETE_CHARACTER.START).toEqual(
      '@@character/delete_character_START'
    );
    expect(DELETE_CHARACTER.END).toEqual('@@character/delete_character_END');
    expect(DELETE_CHARACTER.SUCCESS).toEqual(
      '@@character/delete_character_SUCCESS'
    );
    expect(DELETE_CHARACTER.ERROR).toEqual(
      '@@character/delete_character_ERROR'
    );
  });
});
