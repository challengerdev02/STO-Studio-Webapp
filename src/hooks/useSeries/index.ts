import { ActionOption } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/state';
import { useEffect } from 'react';
import {
  browseSeries,
  createSeries,
  deleteSeries,
  getAllSeries,
  getSeries,
  getSeriesDetails,
  subscribeToSeries,
  updateSeries,
} from '@/actions';
import { SeriesNamespace } from '@/shared/namespaces/series';

interface UseSeries {
  series?: SeriesNamespace.Series;
  seriesDetails: SeriesNamespace.SeriesData;
  allSeries: SeriesNamespace.Series[];
  allSeriesByKey: Record<string, SeriesNamespace.Series[]>;
  handleCreate: (payload: Record<string, any>, options?: ActionOption) => void;
  handleUpdate: (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => void;
  handleSubscribe: (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => void;
  handleGetAll: (options?: ActionOption) => void;
  handleBrowseSeries: (options?: ActionOption) => void;
  handleDelete: (id: string, options?: ActionOption) => void;
  handleGet: (id: string, options?: ActionOption) => void;
  handleGetDetails: (id: string, options?: ActionOption) => void;
}

interface UseSeriesProps {
  key: string;
  autoFetch?: boolean;
  options?: ActionOption;
}

export const useSeries = (parameter: UseSeriesProps): UseSeries => {
  const { key, autoFetch = false, options: defaultOptions = {} } = parameter;

  const dispatch = useDispatch();

  const { series, allSeries, seriesDetails, allSeriesByKey } = useSelector(
    (state: RootState) => {
      return {
        series: state.series.series[key] ?? {},
        seriesDetails: state.series.seriesDetails[key] ?? {},
        allSeries: state.series.allSeries[key],
        allSeriesByKey: state.series.allSeries,
      };
    }
  );

  const handleCreate = (
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(
      createSeries(payload, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  const handleSubscribe = (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => {
    dispatch(
      subscribeToSeries(payload, id, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  const handleUpdate = (
    payload: Record<string, any>,
    id: string,
    options?: ActionOption
  ) => {
    dispatch(
      updateSeries(payload, id, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  const handleDelete = (id: string, options?: ActionOption) => {
    dispatch(
      deleteSeries(id, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  const handleGetAll = (options?: ActionOption) => {
    dispatch(
      getAllSeries({
        ...defaultOptions,
        key: key,
        ...options,
      })
    );
  };

  const handleBrowseSeries = (options?: ActionOption) => {
    dispatch(
      browseSeries({
        ...defaultOptions,
        key: key,
        ...options,
      })
    );
  };

  const handleGet = (id: string, options?: ActionOption) => {
    dispatch(
      getSeries(id, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  const handleGetDetails = (id: string, options?: ActionOption) => {
    //console.log('SERIESS', seriesDetails);
    dispatch(
      getSeriesDetails(id, {
        ...defaultOptions,
        ...options,
        key: key,
      })
    );
  };

  useEffect(() => {
    if (autoFetch) {
      handleGetAll({
        key: key,
      });
    }
  }, [autoFetch]);

  return {
    series,
    allSeries,
    seriesDetails,
    allSeriesByKey,
    handleCreate,
    handleDelete,
    handleUpdate,
    handleGetAll,
    handleGet,
    handleGetDetails,
    handleSubscribe,
    handleBrowseSeries,
  };
};
