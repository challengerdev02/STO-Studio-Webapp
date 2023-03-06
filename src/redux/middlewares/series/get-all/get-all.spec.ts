import {
  serverRequest,
  GET_ALL_SERIES,
  getAllSeries as defaultSeriesAction,
} from '../../../actions';
import { fetchAllSeries as fetchAllSeriesMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Fetch all Series: Fetch all Series Test', function () {
  const mockedRedux: Record<string, any> = {};

  let fetchSeries = defaultSeriesAction;

  beforeEach(() => {
    fetchSeries = jest.fn(defaultSeriesAction).mockReturnValue({
      type: GET_ALL_SERIES.START,
      meta: {},
    });
    mockedRedux.series = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      fetchState: jest.fn(),
    };
    mockedRedux.store.fetchState.mockReturnValue({
      series: {
        series: mockedRedux.series,
      },
    });
    mockedRedux.fetchSeriesAction = fetchAllSeriesMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the fetchSeries action since it is not in the tarfetched list of actions', () => {
    mockedRedux.fetchSeriesAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.fetchSeriesAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(fetchSeries).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the fetchSeries actions, then apiRequest action with correct parameters', () => {
    mockedRedux.fetchSeriesAction(fetchSeries({}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.series.fetchAll}`,
        onSuccess: '@@series/get_all_series_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_ALL_SERIES.START,
      meta: {},
    });
  });
});
