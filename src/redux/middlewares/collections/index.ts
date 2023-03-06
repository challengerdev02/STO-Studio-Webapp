import { getCollections } from './get';
import { getAllCollections } from './get-all';

const middlewares = [getCollections, getAllCollections];

export default middlewares;
