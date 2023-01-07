import { HistoryDetailItem, CategoryItemPost } from '@/types/project';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const get = (url: string, params?: any) => {
  return axios({
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: url,
    params: params,
  });
};

export const post = (url: string, params: HistoryDetailItem | CategoryItemPost) => {
  return axios({
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: url,
    data: params,
  });
};

export const _delete = (url: string) => {
  return axios({
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: url,
  });
};

export const put = (url: string, params: any) => {
  return axios({
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    url: url,
    data: params,
  });
};
