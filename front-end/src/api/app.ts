import { HistoryDetailItem } from '@/types/project';
import * as req from './AxiosRequest';

/** History */
export const getHistoryList = () => {
  return req.get('/eatcoin-api/histories');
};

export const getHistoryDetail = (id: string | string[]) => {
  return req.get(`/eatcoin-api/histories/${id}`);
};

export const getMonthHistory = (date: string /** xxxx-xx */) => {
  return req.get(`/eatcoin-api/histories/month/${date}`);
};

export const getDateHistory = (date: string /** xxxx-xx-xx */) => {
  return req.get(`/eatcoin-api/histories/month/${date}`);
};

export const addHistory = (data: HistoryDetailItem) => {
  return req.post('/eatcoin-api/histories', data);
};

export const deleteHistory = (id: string | string[]) => {
  return req._delete(`/eatcoin-api/histories/${id}`);
};

export const editHistory = (id: string | string[], data: HistoryDetailItem) => {
  return req.put(`/eatcoin-api/histories/${id}`, data);
};

/** Amount */
export const getMonthAmount = (date: string /** xxxx-xx */) => {
  return req.get(`/eatcoin-api/statistics/amount/${date}`);
};

export const getYearAmount = (year: number /** xxxx */) => {
  return req.get(`/eatcoin-api/statistics/amount/${year}`);
};

export const getDayAmount = (date: string /** xxxx-xx */) => {
  return req.get(`/eatcoin-api/statistics/amount/detail/${date}`);
};
