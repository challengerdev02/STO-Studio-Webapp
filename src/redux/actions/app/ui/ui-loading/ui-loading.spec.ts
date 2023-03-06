import { UI_LOADING, stopUILoading, startUILoading } from './index';

describe('UI Error Action', () => {
  it('should test UI Error returns the correct data with the actual payload', () => {
    expect(stopUILoading('UI_LOADING')).toEqual({
      key: 'UI_LOADING',
      type: UI_LOADING.END,
    });
    expect(startUILoading('UI_LOADING')).toEqual({
      key: 'UI_LOADING',
      type: UI_LOADING.START,
    });
  });
});
