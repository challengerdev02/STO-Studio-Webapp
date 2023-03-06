import contract from './contract';
import wallet from './wallet';

const middlewares = [...contract, ...wallet];
export default middlewares;
