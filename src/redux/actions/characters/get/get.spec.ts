import { GET_CHARACTER, getCharacter } from './index';

describe('Get Character Actions', () => {
  it('should dispatch an action to get character', () => {
    const characterPayload = {
      id: 'test-id',
      key: '@@delete-character-key',
      onFinish: () => {},
    };

    const { id, key, onFinish } = characterPayload;

    const expectedAction = {
      type: GET_CHARACTER.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(getCharacter(id, { key, onFinish })).toEqual(expectedAction);

    expect(GET_CHARACTER.START).toEqual('@@character/get_character_START');
    expect(GET_CHARACTER.END).toEqual('@@character/get_character_END');
    expect(GET_CHARACTER.SUCCESS).toEqual('@@character/get_character_SUCCESS');
    expect(GET_CHARACTER.ERROR).toEqual('@@character/get_character_ERROR');
  });
});
