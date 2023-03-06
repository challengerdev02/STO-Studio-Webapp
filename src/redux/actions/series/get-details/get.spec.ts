import { GET_SERIES_DETAILS, getSeriesDetails } from './index';

describe('Get Series Actions', () => {
  it('should dispatch an action to get series', () => {
    const seriesPayload = {
      id: 'test-id',
      key: '@@get-series-key',
      onFinish: () => {},
    };

    const { key, id, onFinish } = seriesPayload;

    const expectedAction = {
      type: GET_SERIES_DETAILS.START,
      meta: {
        id,
        key,
        onFinish,
      },
    };
    expect(getSeriesDetails(id, { key, onFinish })).toEqual(expectedAction);

    expect(GET_SERIES_DETAILS.START).toEqual(
      '@@series/get_series_details_START'
    );
    expect(GET_SERIES_DETAILS.END).toEqual('@@series/get_series_details_END');
    expect(GET_SERIES_DETAILS.SUCCESS).toEqual(
      '@@series/get_series_details_SUCCESS'
    );
    expect(GET_SERIES_DETAILS.ERROR).toEqual(
      '@@series/get_series_details_ERROR'
    );
  });
});
