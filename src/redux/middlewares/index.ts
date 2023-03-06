import app from './app';
import book from './book';
import series from './series';
import upload from './upload';
import scene from './scene';
import characters from './characters';
import web3 from './web3';
import sale from './sale';
import externalResource from './external-resource';
import bookSaleSchedule from './book-sale-schedule';
import collections from './collections';
import assets from './assets';
import competition from './competition';

const middlewares = [
  ...app,
  ...book,
  ...series,
  ...upload,
  ...scene,
  ...bookSaleSchedule,
  ...characters,
  ...web3,
  ...sale,
  ...externalResource,
  ...collections,
  ...assets,
  ...competition,
];

export default middlewares;
