import { UI_PAGINATION, setUIPagination } from './index';

describe('UI Pagination Action', () => {
  it('should test UI Pagination returns the correct data with the actual payload', () => {
    const meta = { key: 'UI_PAGINATION', value: {} };
    const expectedAction = {
      type: UI_PAGINATION,
      meta,
    };
    expect(setUIPagination('UI_PAGINATION', {})).toEqual(expectedAction);
  });
});
