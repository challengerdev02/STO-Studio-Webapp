import uiReducer, { UIDefaultState as initialState } from './index';
import { UI_ERROR, UI_LOADING, UI_PAGINATION } from '../../actions';

describe('Reducer: UI', () => {
  it('Should not update state if unknown action is passed to it', () => {
    const MOCK_ACTION = {
      type: 'MOCK_ACTION',
      payload: { mocker: 'test mocker' },
    };
    const state = {
      ...initialState,
      userAccount: {
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'Example',
      },
    };
    expect(uiReducer(state, MOCK_ACTION)).toEqual({
      ...state,
    });
  });

  it('Should not update loading state to true/active', () => {
    const MOCK_UI_LOADING_START_ACTION = {
      type: UI_LOADING.START,
      key: 'test',
    };

    expect(uiReducer(initialState, MOCK_UI_LOADING_START_ACTION)).toEqual({
      ...initialState,
      uiLoaders: { test: true },
    });
  });

  it('Should not paginate', () => {
    const MOCK_ACTION = {
      type: UI_PAGINATION,
      key: 'test',
      value: 'paginate',
    };

    expect(uiReducer(initialState, MOCK_ACTION)).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        [MOCK_ACTION.key]: MOCK_ACTION.value,
      },
    });
  });
  it('Should not update loading state to false/inactive', () => {
    const MOCK_UI_LOADING_END_ACTION = {
      type: UI_LOADING.END,
      key: 'test',
    };

    expect(uiReducer(initialState, MOCK_UI_LOADING_END_ACTION)).toEqual({
      ...initialState,
      uiLoaders: { test: false },
    });
  });

  it('Should not update error state', () => {
    const MOCK_UI_ERROR_ACTION = {
      type: UI_ERROR,
      key: 'test',
      value: 'test failed',
    };

    expect(uiReducer(initialState, MOCK_UI_ERROR_ACTION)).toEqual({
      ...initialState,
      uiErrors: { ...initialState.uiErrors, test: 'test failed' },
    });
  });

  it('should return initial state when there is no action', () => {
    expect(uiReducer(initialState, { type: '' })).toEqual(initialState);
  });
});
