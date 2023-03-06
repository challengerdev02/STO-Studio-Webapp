import { callContractMethod } from './call';
import { sendContractMethod } from './send';

const middlewares = [callContractMethod, sendContractMethod];

export default middlewares;
