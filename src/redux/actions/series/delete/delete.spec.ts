import { DELETE_SERIES, deleteSeries } from './index';

describe('Delete Series Actions', () => {
  it('should dispatch an action to delete series', () => {
    const seriesPayload = {
      id: 'test-id',
      key: '@@delete-series-key',
      onFinish: () => {},
    };

    const { key, id, onFinish } = seriesPayload;

    const expectedAction = {
      type: DELETE_SERIES.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(deleteSeries(id, { key, onFinish })).toEqual(expectedAction);

    expect(DELETE_SERIES.START).toEqual('@@series/delete_series_START');
    expect(DELETE_SERIES.END).toEqual('@@series/delete_series_END');
    expect(DELETE_SERIES.SUCCESS).toEqual('@@series/delete_series_SUCCESS');
    expect(DELETE_SERIES.ERROR).toEqual('@@series/delete_series_ERROR');
  });
});
