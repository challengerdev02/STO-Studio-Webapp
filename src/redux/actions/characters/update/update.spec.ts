import { UPDATE_CHARACTER, updateCharacter } from './index';

describe('Update Character Actions', () => {
  it('should dispatch an action to update character', () => {
    const characterPayload = {
      id: 'test-id',
      link: 'test-link.com',
      artist: 'test-artist',
      key: '@@delete-character-key',
      onFinish: () => {},
    };

    const { id, key, onFinish, link, artist } = characterPayload;
    const payload = {
      link,
      artist,
    };

    const expectedAction = {
      type: UPDATE_CHARACTER.START,
      meta: {
        payload: payload,
        id,
        key,
        onFinish,
      },
    };
    expect(updateCharacter(payload, id, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(UPDATE_CHARACTER.START).toEqual(
      '@@character/update_character_START'
    );
    expect(UPDATE_CHARACTER.END).toEqual('@@character/update_character_END');
    expect(UPDATE_CHARACTER.SUCCESS).toEqual(
      '@@character/update_character_SUCCESS'
    );
    expect(UPDATE_CHARACTER.ERROR).toEqual(
      '@@character/update_character_ERROR'
    );
  });
});
