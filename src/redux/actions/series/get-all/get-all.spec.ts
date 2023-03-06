import { GET_ALL_SERIES, getAllSeries } from './index';

describe('Get all Series Actions', () => {
  it('should dispatch an action to get all series', () => {
    const seriesPayload = {
      id: 'test-id',
      key: '@@get-all-series-key',
      onFinish: () => {},
    };

    const { key, onFinish } = seriesPayload;

    const expectedAction = {
      type: GET_ALL_SERIES.START,
      meta: {
        key,
        onFinish,
      },
    };
    expect(getAllSeries({ key, onFinish })).toEqual(expectedAction);

    expect(GET_ALL_SERIES.START).toEqual('@@series/get_all_series_START');
    expect(GET_ALL_SERIES.END).toEqual('@@series/get_all_series_END');
    expect(GET_ALL_SERIES.SUCCESS).toEqual('@@series/get_all_series_SUCCESS');
    expect(GET_ALL_SERIES.ERROR).toEqual('@@series/get_all_series_ERROR');
  });
});
