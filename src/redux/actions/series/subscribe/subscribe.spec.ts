import { SUBSCRIBE_TO_SERIES, updateSeries } from './index';

describe('Subscribe to Series Actions', () => {
  it('should dispatch an action to update series', () => {
    const seriesPayload = {
      id: 'test-id',
      link: 'test-link.com',
      artist: 'test-artist',
      key: '@@subsribe-to-series-key',
      onFinish: () => {},
    };

    const { id, key, onFinish, link, artist } = seriesPayload;
    const payload = {
      link,
      artist,
    };

    const expectedAction = {
      type: SUBSCRIBE_TO_SERIES.START,
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

    expect(SUBSCRIBE_TO_SERIES.START).toEqual(
      '@@series/subscribe_to_series_START'
    );
    expect(SUBSCRIBE_TO_SERIES.END).toEqual('@@series/subscribe_to_series_END');
    expect(SUBSCRIBE_TO_SERIES.SUCCESS).toEqual(
      '@@series/subscribe_to_series_SUCCESS'
    );
    expect(SUBSCRIBE_TO_SERIES.ERROR).toEqual(
      '@@series/subscribe_to_series_ERROR'
    );
  });
});
