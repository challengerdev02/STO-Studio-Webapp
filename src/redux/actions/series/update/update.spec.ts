import { UPDATE_SERIES, updateSeries } from './index';

describe('Update Series Actions', () => {
  it('should dispatch an action to update series', () => {
    const seriesPayload = {
      id: 'test-id',
      link: 'test-link.com',
      artist: 'test-artist',
      key: '@@delete-series-key',
      onFinish: () => {},
    };

    const { id, key, onFinish, link, artist } = seriesPayload;
    const payload = {
      link,
      artist,
    };

    const expectedAction = {
      type: UPDATE_SERIES.START,
      meta: {
        payload: payload,
        id,
        key,
        onFinish,
      },
    };
    expect(updateSeries(payload, id, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(UPDATE_SERIES.START).toEqual('@@series/update_series_START');
    expect(UPDATE_SERIES.END).toEqual('@@series/update_series_END');
    expect(UPDATE_SERIES.SUCCESS).toEqual('@@series/update_series_SUCCESS');
    expect(UPDATE_SERIES.ERROR).toEqual('@@series/update_series_ERROR');
  });
});
