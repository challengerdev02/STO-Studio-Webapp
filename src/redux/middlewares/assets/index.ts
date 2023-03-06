import { getAsset, getCreatedAssets } from './get';
import { getAllCreatedAssets } from './get-all';
import { updateAsset } from './update';

const middlewares = [
  getCreatedAssets,
  getAllCreatedAssets,
  getAsset,
  updateAsset,
];

export default middlewares;
