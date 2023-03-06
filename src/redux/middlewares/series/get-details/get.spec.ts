import {
  serverRequest,
  GET_SERIES,
  getSeries as defaultSeriesAction,
} from '../../../actions';
import { getSeries as getSeriesMiddleware } from './index';
import { APP_URL, GET } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Get Series: Get Series Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let getSeries = defaultSeriesAction;

  beforeEach(() => {
    getSeries = jest.fn(defaultSeriesAction).mockReturnValue({
      type: GET_SERIES.START,
      meta: payload,
    });
    mockedRedux.series = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      getState: jest.fn(),
    };
    mockedRedux.store.getState.mockReturnValue({
      series: {
        series: mockedRedux.series,
      },
    });
    mockedRedux.getSeriesAction = getSeriesMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the getSeries action since it is not in the targeted list of actions', () => {
    mockedRedux.getSeriesAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.getSeriesAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(getSeries).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the getSeries actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.getSeriesAction(getSeries(id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: GET,
        url: `${APP_URL.series.get}/${id}`,
        onSuccess: '@@series/get_series_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: GET_SERIES.START,
      meta: { ...payload },
    });
  });
});
