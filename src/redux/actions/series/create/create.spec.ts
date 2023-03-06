import { CREATE_SERIES, createSeries } from './index';

describe('Create Series Actions', () => {
  it('should dispatch an action to create series', () => {
    const seriesPayload = {
      title: 'test-title',
      link: 'test-link.com',
      key: '@@create-series-key',
      onFinish: () => {},
    };

    const { title, link, key, onFinish } = seriesPayload;

    const expectedAction = {
      type: CREATE_SERIES.START,
      meta: {
        payload: { title, link },
        key,
        onFinish,
      },
    };
    expect(createSeries({ title, link }, { key, onFinish })).toEqual(
      expectedAction
    );

    expect(CREATE_SERIES.START).toEqual('@@series/create_series_START');
    expect(CREATE_SERIES.END).toEqual('@@series/create_series_END');
    expect(CREATE_SERIES.SUCCESS).toEqual('@@series/create_series_SUCCESS');
    expect(CREATE_SERIES.ERROR).toEqual('@@series/create_series_ERROR');
  });
});
