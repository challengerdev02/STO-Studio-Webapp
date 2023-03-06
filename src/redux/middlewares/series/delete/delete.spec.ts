import {
  serverRequest,
  DELETE_SERIES,
  deleteSeries as defaultSeriesAction,
} from '../../../actions';
import { deleteSeries as deleteSeriesMiddleware } from './index';
import { APP_URL, DELETE } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Delete Series: Delete Series Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let deleteSeries = defaultSeriesAction;

  beforeEach(() => {
    deleteSeries = jest.fn(defaultSeriesAction).mockReturnValue({
      type: DELETE_SERIES.START,
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
    mockedRedux.deleteSeriesAction = deleteSeriesMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the deleteSeries action since it is not in the targeted list of actions', () => {
    mockedRedux.deleteSeriesAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.deleteSeriesAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(deleteSeries).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the deleteSeries actions, then apiRequest action with correct parameters', () => {
    const { id } = payload;
    mockedRedux.deleteSeriesAction(deleteSeries(id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: DELETE,
        url: `${APP_URL.series.delete}`,
        ...payload,
        onSuccess: '@@series/delete_series_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: DELETE_SERIES.START,
      meta: { ...payload },
    });
  });
});
