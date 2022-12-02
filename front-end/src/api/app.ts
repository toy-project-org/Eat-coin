import * as req from './AxiosRequest';

export const getAppList = (params: any) => {
  return req.get('/eatcoin-api/histories', params);
};
