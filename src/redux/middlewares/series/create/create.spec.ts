import {
  serverRequest,
  CREATE_SERIES,
  createSeries as defaultSeriesAction,
} from '../../../actions';
import { createSeries as createSeriesMiddleware } from './index';
import { APP_URL, POST } from '../../../../_shared/constants';

jest.mock('../../../actions/app/api');

describe('Create Series: Create Series Test', function () {
  const mockedRedux: Record<string, any> = {};

  const payload = {
    payload: {},
    options: { params: {}, key: '@@test-id', uiKey: '@@key-test-id' },
  };

  let createSeries = defaultSeriesAction;

  beforeEach(() => {
    createSeries = jest.fn(defaultSeriesAction).mockReturnValue({
      type: CREATE_SERIES.START,
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
    mockedRedux.createSeriesAction = createSeriesMiddleware(mockedRedux.store)(
      mockedRedux.nextMock
    );
  });

  it('should not dispatch the createSeries action since it is not in the targeted list of actions', () => {
    mockedRedux.createSeriesAction({
      type: 'SOME_FAKE_ACTION',
    });
    mockedRedux.createSeriesAction({
      type: 'SOME_FAKE_ACTION_2',
    });
    expect(createSeries).not.toHaveBeenCalled();
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION',
    });
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: 'SOME_FAKE_ACTION_2',
    });
  });

  it('should dispatch the createSeries actions, then apiRequest action with correct parameters', () => {
    mockedRedux.createSeriesAction(createSeries(payload));
    // Calls api request action
    expect(serverRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: POST,
        url: `${APP_URL.series.create}`,
        ...payload,
        onSuccess: '@@series/create_series_SUCCESS',
      })
    );
    // Dispatch action
    expect(mockedRedux.store.dispatch).toHaveBeenCalled();

    // Next Function
    expect(mockedRedux.nextMock).toHaveBeenCalledWith({
      type: CREATE_SERIES.START,
      meta: { ...payload },
    });
  });
});
