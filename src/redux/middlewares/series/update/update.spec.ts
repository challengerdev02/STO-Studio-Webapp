import {
  serverRequest,
  UPDATE_SERIES,
  updateSeries as defaultSeriesAction,
} from '../../../actions';
import { updateSeries as updateSeriesMiddleware } from './index';
import { APP_URL, PUT } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Update Series: Update Series Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    id: 'test-id',
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let updateSeries = defaultSeriesAction;

  beforeEach(() => {
    updateSeries = jest.fn(defaultSeriesAction).mockReturnValue({
      type: UPDATE_SERIES.START,
      meta: payload,
    });
    mockedRedux.series = {};
    mockedRedux.nextMock = jest.fn();
    mockedRedux.requestMock = jest.fn();
    mockedRedux.store = {
      dispatch: jest.fn((action) => action),
      updateState: jest.fn(),
    };
    mockedRedux.store.updateState.mockReturnValue({
      series: {
        series: mockedRedux.series,
      },
    });
    mockedRedux.updateSeriesAction = updateSeriesMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the updateSeries action since it is not in the tarupdateed list of actions', () => {
    mockedRedux.updateSeriesAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.updateSeriesAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(updateSeries).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the updateSeries actions, then apiRequest action with correct parameters', () => {
    const { id, ...rest } = payload;
    mockedRedux.updateSeriesAction(updateSeries(payload, id, {}));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: PUT,
        url: `${APP_URL.series.update}/${id}`,
        onSuccess: '@@series/update_series_SUCCESS',
        ...rest,
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: UPDATE_SERIES.START,
      meta: { ...payload },
    });
  });
});
