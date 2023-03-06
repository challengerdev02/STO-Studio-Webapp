import { GET_SERIES, getSeries } from './index';

describe('Get Series Actions', () => {
  it('should dispatch an action to get series', () => {
    const seriesPayload = {
      id: 'test-id',
      key: '@@get-series-key',
      onFinish: () => {},
    };

    const { key, id, onFinish } = seriesPayload;

    const expectedAction = {
      type: GET_SERIES.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(getSeries(id, { key, onFinish })).toEqual(expectedAction);

    expect(GET_SERIES.START).toEqual('@@series/get_series_START');
    expect(GET_SERIES.END).toEqual('@@series/get_series_END');
    expect(GET_SERIES.SUCCESS).toEqual('@@series/get_series_SUCCESS');
    expect(GET_SERIES.ERROR).toEqual('@@series/get_series_ERROR');
  });
});
