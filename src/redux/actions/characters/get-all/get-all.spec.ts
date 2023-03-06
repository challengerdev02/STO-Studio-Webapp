import { GET_CHARACTERS, fetchCharacters } from './index';

describe('Get Characters Actions', () => {
  it('should dispatch an action to get character', () => {
    const characterPayload = {
      key: '@@delete-character-key',
      onFinish: () => {},
    };

    const { key, onFinish } = characterPayload;

    const expectedAction = {
      type: GET_CHARACTERS.START,
      meta: {
        key,
        onFinish,
      },
    };
    expect(fetchCharacters({ key, onFinish })).toEqual(expectedAction);

    expect(GET_CHARACTERS.START).toEqual('@@character/get_characters_START');
    expect(GET_CHARACTERS.END).toEqual('@@character/get_characters_END');
    expect(GET_CHARACTERS.SUCCESS).toEqual(
      '@@character/get_characters_SUCCESS'
    );
    expect(GET_CHARACTERS.ERROR).toEqual('@@character/get_characters_ERROR');
  });
});
