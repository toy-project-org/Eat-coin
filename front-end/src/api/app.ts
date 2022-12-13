import * as req from './AxiosRequest';

export const getAppList = () => {
  return req.get('/eatcoin-api/histories');
};

export const getHistoryDetail = (id: any) => {
  return req.get(`/eatcoin-api/histories/${id}`);
};

export const addHistory = (data: any) => {
  return req.post('/eatcoin-api/histories', data);
};

export const deleteHistory = (id: any) => {
  return req.delete1(`/eatcoin-api/histories/${id}`);
};
