import { DemoReducerState } from './reducers/demo';
import { UIState } from './reducers/ui';
import { BookReducerState } from './reducers/book';
import { SeriesReducerState } from './reducers/series';
import { UploadMediaReducerState } from './reducers/upload';
import { SceneReducerState } from './reducers/scene';
import { ArtistReducerState } from './reducers/artist';
import { BookSaleScheduleReducerState } from './reducers/book-sale-schedule';
import { AppReducerState } from './reducers/app';
import { CharacterReducerState } from './reducers/characters';
import { Web3ReducerState } from './reducers/web3';
import { SaleReducerState } from './reducers/sale';
import { ExternalResourceReducerState } from './reducers/external-resource';
import { CollectionsReducerState } from './reducers/collections';
import { AssetsReducerState } from './reducers/assets';
import { CompetitionReducerState } from './reducers/competition';
import { ApiRequestReducerState } from './reducers/api-request';

export interface RootState {
  demo: DemoReducerState;
  book: BookReducerState;
  ui: UIState;
  series: SeriesReducerState;
  upload: UploadMediaReducerState;
  scene: SceneReducerState;
  artist: ArtistReducerState;
  bookSaleSchedule: BookSaleScheduleReducerState;
  app: AppReducerState;
  characters: CharacterReducerState;
  web3: Web3ReducerState;
  sale: SaleReducerState;
  externalResources: ExternalResourceReducerState;
  collections: CollectionsReducerState;
  assets: AssetsReducerState;
  competition: CompetitionReducerState;
  apiResponse: ApiRequestReducerState;
}
