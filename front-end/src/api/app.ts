import { CategoryItemPost, HistoryDetailItem } from '@/types/project';
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

/** Category */
export const getCategoryList = () => {
  return req.get(`/eatcoin-api/categories`);
};

export const getCategoryItem = (id: string | string[]) => {
  return req.get(`/eatcoin-api/categories/${id}`);
};

export const addCategoryItem = (data: CategoryItemPost) => {
  return req.post(`/eatcoin-api/categories`, data);
};

export const editCategoryItem = (id: string | string[], data: CategoryItemPost) => {
  return req.put(`/eatcoin-api/categories/${id}`, data);
};

export const deleteCategoryItem = (id: string | string[]) => {
  return req._delete(`/eatcoin-api/categories/${id}`);
};

export const getCategoryMonthList = (date: string /** xxxx-xx */) => {
  return req.get(`/eatcoin-api/statistics/category/${date}`);
};

/** Assets */
export const getAssetsList = () => {
  return req.get(`/eatcoin-api/assets`);
};

export const getAssetsItem = (id: string | string[]) => {
  return req.get(`/eatcoin-api/assets/${id}`);
};

export const addAssetsItem = (data: CategoryItemPost) => {
  return req.post(`/eatcoin-api/assets`, data);
};

export const editAssetsItem = (id: string | string[], data: CategoryItemPost) => {
  return req.put(`/eatcoin-api/assets/${id}`, data);
};

export const deleteAssetsItem = (id: string | string[]) => {
  return req._delete(`/eatcoin-api/assets/${id}`);
};

export const getAssetsMonthList = (date: string /** xxxx-xx */) => {
  return req.get(`/eatcoin-api/statistics/asset/${date}`);
};
