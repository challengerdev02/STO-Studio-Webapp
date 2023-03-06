import { Action } from '../../types';
import {
  BROWSE_SERIES,
  CREATE_SERIES,
  GET_ALL_SERIES,
  GET_SERIES,
  GET_SERIES_DETAILS,
  UPDATE_SERIES,
} from '@/actions';
import { arrayToById } from '@/shared/utils';
import { SeriesNamespace } from '@/shared/namespaces/series';
import { get } from 'lodash';

export interface SeriesReducerState {
  allSeries: Record<string, SeriesNamespace.Series[]>;
  seriesById: Record<string, Record<string, SeriesNamespace.Series>>;
  series: Record<string, SeriesNamespace.Series>;
  seriesDetails: Record<string, SeriesNamespace.SeriesData>;
}

export const SeriesDefaultState: SeriesReducerState = {
  allSeries: {},
  seriesById: {},
  series: {},
  seriesDetails: {},
};

const SeriesReducer = (state = SeriesDefaultState, action: Action) => {
  switch (action.type) {
    case CREATE_SERIES.SUCCESS:
      return {
        ...state,
        series: {
          ...state.series,
          [action.key]: action.payload,
        },
      };

    case GET_SERIES.SUCCESS:
      return {
        ...state,
        series: {
          ...state.series,
          [action.key]: action.payload,
        },
      };

    case GET_SERIES_DETAILS.SUCCESS:
      //console.log('PAYLOAD', action);
      return {
        ...state,
        seriesDetails: {
          ...state.seriesDetails,
          [action.key]: action.payload,
        },
      };

    case BROWSE_SERIES.SUCCESS:
    case GET_ALL_SERIES.SUCCESS: {
      const payload = action.virtualized
        ? [...get(state, ['allSeries', action.key], []), ...action.payload]
        : action.payload;
      const byId = arrayToById(action?.payload ?? []);
      return {
        ...state,
        seriesById: {
          ...state.seriesById,
          [action.key]: {
            ...get(state, ['seriesById', action.key], {}),
            ...byId,
          },
        },
        allSeries: {
          ...state.allSeries,
          [action.key]: payload,
        },
      };
    }

    case UPDATE_SERIES.SUCCESS: {
      const allSeries = state.allSeries[action.key] ?? [];

      const index = allSeries.findIndex((o) => o?._id === action.payload?._id);

      let currentSeries = {};

      if (index !== -1) {
        currentSeries = Object.assign({}, allSeries[index], action.payload);
        allSeries[index] = Object.assign({}, allSeries[index], action.payload);
      } else {
        currentSeries = Object.assign({}, action.payload);
        allSeries.push(action.payload);
      }

      const byId = arrayToById(allSeries ?? []);

      return {
        ...state,
        seriesById: {
          ...state.seriesById,
          [action.key]: byId,
        },
        allSeries: {
          ...state.allSeries,
          [action.key]: allSeries ?? [],
        },
        series: {
          ...state.series,
          [action.key]: currentSeries,
        },
      };
    }

    default:
      return state;
  }
};

export default SeriesReducer;
