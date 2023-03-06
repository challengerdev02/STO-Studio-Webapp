import { serverRequest } from './api';
import accountRequest from './account';
import { makeServerRequest } from './api/make-server-request';

const exportVar = [serverRequest, ...accountRequest, makeServerRequest];
export default exportVar;
