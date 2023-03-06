import { createSeries } from './create';
import { updateSeries } from './update';
import { getSeries } from './get';
import { browseSeries } from './browse';
import { deleteSeries } from './delete';
import { subscribeToSeries } from './subscribe';
import { fetchAllSeries } from './get-all';
import { getSeriesDetails } from './get-details';

const exportVar = [
  createSeries,
  updateSeries,
  getSeries,
  deleteSeries,
  fetchAllSeries,
  getSeriesDetails,
  subscribeToSeries,
  browseSeries,
];
export default exportVar;
