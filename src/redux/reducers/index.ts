import { combineReducers } from 'redux';
import book from './book';
import ui from './ui';
import series from './series';
import upload from './upload';
import scene from './scene';
import artist from './artist';
import bookSaleSchedule from './book-sale-schedule';
import app from './app';
import characters from './characters';
import web3 from './web3';
import sale from './sale';
import externalResources from './external-resource';
import collections from './collections';
import assets from './assets';
import competition from './competition';
import apiRequest from './api-request';

const appReducers = combineReducers({
  ui,
  book,
  series,
  upload,
  scene,
  artist,
  bookSaleSchedule,
  app,
  characters,
  web3,
  sale,
  externalResources,
  collections,
  assets,
  competition,
  apiRequest,
});

export default appReducers;
