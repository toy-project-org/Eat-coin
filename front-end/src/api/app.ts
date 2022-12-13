import { HistoryDetailItem } from '@/types/project';
import * as req from './AxiosRequest';

export const getHistoryList = () => {
  return req.get('/eatcoin-api/histories');
};

export const getHistoryDetail = (id: string | string[]) => {
  return req.get(`/eatcoin-api/histories/${id}`);
};

export const getMonthHistory = (date: any /** xxxx-xx */) => {
  return req.get(`/eatcoin-api/month/histories/${date}`);
};

export const getDateHistory = (date: any /** xxxx-xx-xx */) => {
  return req.get(`/eatcoin-api/month/histories/${date}`);
};

export const addHistory = (data: HistoryDetailItem) => {
  return req.post('/eatcoin-api/histories', data);
};

export const deleteHistory = (id: string | string[]) => {
  return req._delete(`/eatcoin-api/histories/${id}`);
};
