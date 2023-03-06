import SeriesReducer, { SeriesDefaultState as defaultState } from './index';
import { arrayToById } from '../../../_shared/utils';
import { CREATE_SERIES, GET_ALL_SERIES, GET_SERIES } from '@/actions';

describe('Reducer: Series', () => {
  it('Should return a series', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const mockAction = {
      type: GET_SERIES.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      series: {
        ...defaultState.series,
        [mockAction.key]: mockAction.payload,
      },
    };
    expect(SeriesReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should get list of series', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];
    const mockAction = {
      type: GET_ALL_SERIES.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };

    const byId = arrayToById(mockAction?.payload ?? []);

    const expectedResult = {
      ...defaultState,
      seriesById: {
        ...defaultState.seriesById,
        [mockAction.key]: byId,
      },
      allSeries: {
        ...defaultState.allSeries,
        [mockAction.key]: mockAction.payload ?? [],
      },
    };
    expect(SeriesReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('Should Create a series', () => {
    const mockPayload = [{ id: 'test-1' }, { id: 'test-2' }, { id: 'test-3' }];

    const mockAction = {
      type: CREATE_SERIES.SUCCESS,
      payload: mockPayload,
      key: 'test-key',
    };
    const expectedResult = {
      ...defaultState,
      series: {
        ...defaultState.series,
        [mockAction.key]: mockAction.payload,
      },
    };

    expect(SeriesReducer(defaultState, mockAction)).toEqual(expectedResult);
  });

  it('should return initial state when there is no action', () => {
    expect(SeriesReducer(defaultState, { type: '' })).toEqual(defaultState);
  });
});
