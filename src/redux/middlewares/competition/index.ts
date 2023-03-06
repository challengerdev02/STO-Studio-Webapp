import { getCompetitionEntries } from './entries';
import { getCompetition } from './get';
import { joinCompetition } from './join';

const middlewares = [getCompetitionEntries, getCompetition, joinCompetition];

export default middlewares;
