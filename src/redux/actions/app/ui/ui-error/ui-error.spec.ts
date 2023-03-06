import { UI_ERROR, setUIError } from './index';

describe('UI Error Action', () => {
  it('should test UI Error returns the correct data with the actual payload', () => {
    const meta = { key: UI_ERROR, value: 'test' };
    const expectedAction = {
      type: UI_ERROR,
      meta,
    };
    expect(setUIError(UI_ERROR, 'test')).toEqual(expectedAction);
  });
});
