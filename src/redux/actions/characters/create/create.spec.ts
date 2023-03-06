import { CREATE_CHARACTER, createCharacter } from './index';

describe('Create Character Actions', () => {
  it('should dispatch an action to create character', () => {
    const characterPayload = {
      title: 'test-title',
      link: 'test-link.com',
      key: '@@create-character-key',
      onFinish: () => {},
    };

    const { title, link, key, onFinish } = characterPayload;

    const expectedAction = {
      type: CREATE_CHARACTER.START,
      meta: {
        payload: { title, link },
        key,
        onFinish,
      },
    };
    expect(createCharacter({ title, link }, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(CREATE_CHARACTER.START).toEqual(
      '@@character/create_character_START'
    );
    expect(CREATE_CHARACTER.END).toEqual('@@character/create_character_END');
    expect(CREATE_CHARACTER.SUCCESS).toEqual(
      '@@character/create_character_SUCCESS'
    );
    expect(CREATE_CHARACTER.ERROR).toEqual(
      '@@character/create_character_ERROR'
    );
  });
});
